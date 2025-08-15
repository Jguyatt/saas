const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const clientSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Client email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['unverified', 'verified', 'active', 'inactive'],
    default: 'unverified'
  },
  verificationToken: {
    type: String,
    default: () => uuidv4()
  },
  verificationExpires: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  },
  verifiedAt: Date,
  password: String, // Hashed password for client access
  lastLogin: Date,
  assignedInterfaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interface'
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Indexes for faster queries
clientSchema.index({ agencyId: 1, email: 1 });
clientSchema.index({ verificationToken: 1 });
clientSchema.index({ status: 1 });
clientSchema.index({ createdAt: -1 });

// Generate new verification token
clientSchema.methods.generateVerificationToken = function() {
  this.verificationToken = uuidv4();
  this.verificationExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return this.verificationToken;
};

// Check if verification token is valid
clientSchema.methods.isVerificationTokenValid = function() {
  return this.verificationExpires > Date.now();
};

// Mark client as verified
clientSchema.methods.markAsVerified = function() {
  this.status = 'verified';
  this.verifiedAt = new Date();
  this.verificationToken = undefined;
  this.verificationExpires = undefined;
};

// Get verification URL
clientSchema.methods.getVerificationUrl = function(baseUrl) {
  return `${baseUrl}/verify/${this.verificationToken}`;
};

// Virtual for verification status
clientSchema.virtual('isVerified').get(function() {
  return this.status === 'verified' || this.status === 'active';
});

// Ensure virtual fields are serialized
clientSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.verificationToken;
    return ret;
  }
});

module.exports = mongoose.model('Client', clientSchema); 
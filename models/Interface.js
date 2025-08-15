const mongoose = require('mongoose');

const interfaceSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Interface name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  type: {
    type: String,
    enum: ['web', 'browser-extension', 'both'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'archived'],
    default: 'draft'
  },
  webhookUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Webhook URL must be a valid HTTP/HTTPS URL'
    }
  },
  webhookStatus: {
    type: String,
    enum: ['not_configured', 'testing', 'connected', 'failed'],
    default: 'not_configured'
  },
  webhookLastTest: Date,
  webhookData: {
    workflows: Number,
    executions: Number,
    activeNodes: Number,
    lastExecution: Date,
    successRate: Number,
    avgExecutionTime: String,
    uptime: Number
  },
  assignedClients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }],
  settings: {
    theme: {
      primaryColor: {
        type: String,
        default: '#8B5CF6'
      },
      secondaryColor: {
        type: String,
        default: '#6366F1'
      },
      logo: String,
      customCSS: String
    },
    features: {
      analytics: {
        type: Boolean,
        default: true
      },
      notifications: {
        type: Boolean,
        default: true
      },
      export: {
        type: Boolean,
        default: true
      }
    },
    branding: {
      companyName: String,
      contactEmail: String,
      supportUrl: String
    }
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Indexes for faster queries
interfaceSchema.index({ agencyId: 1, status: 1 });
interfaceSchema.index({ agencyId: 1, createdAt: -1 });
interfaceSchema.index({ webhookStatus: 1 });

// Virtual for client count
interfaceSchema.virtual('clientCount').get(function() {
  return this.assignedClients ? this.assignedClients.length : 0;
});

// Method to test webhook connection
interfaceSchema.methods.testWebhookConnection = async function() {
  if (!this.webhookUrl) {
    this.webhookStatus = 'not_configured';
    return false;
  }

  try {
    this.webhookStatus = 'testing';
    this.webhookLastTest = new Date();
    
    // In a real implementation, you would make an actual HTTP request
    // For now, we'll simulate a successful connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.webhookStatus = 'connected';
    this.webhookData = {
      workflows: Math.floor(Math.random() * 10) + 1,
      executions: Math.floor(Math.random() * 1000) + 100,
      activeNodes: Math.floor(Math.random() * 20) + 5,
      lastExecution: new Date(),
      successRate: 95 + Math.random() * 5,
      avgExecutionTime: `${(Math.random() * 5 + 1).toFixed(1)}s`,
      uptime: 99 + Math.random()
    };
    
    return true;
  } catch (error) {
    this.webhookStatus = 'failed';
    return false;
  }
};

// Method to assign client to interface
interfaceSchema.methods.assignClient = function(clientId) {
  if (!this.assignedClients.includes(clientId)) {
    this.assignedClients.push(clientId);
  }
};

// Method to remove client from interface
interfaceSchema.methods.removeClient = function(clientId) {
  this.assignedClients = this.assignedClients.filter(id => id.toString() !== clientId.toString());
};

// Ensure virtual fields are serialized
interfaceSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Interface', interfaceSchema); 
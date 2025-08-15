# AgencyHost Backend Server

A robust Node.js/Express backend server for the AgencyHost white-label SaaS platform with MongoDB database support.

## Features

- ✅ **User Authentication** - Secure JWT-based authentication
- ✅ **Multi-Device Access** - Accounts accessible from any device
- ✅ **MongoDB Database** - Persistent data storage
- ✅ **Client Management** - Client verification and management
- ✅ **Interface Management** - White-label interface configuration
- ✅ **Security Features** - Rate limiting, input validation, password hashing
- ✅ **API Endpoints** - RESTful API for all platform features

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `config.env` and modify as needed
   - Update MongoDB connection string
   - Set JWT secret for production

4. **Start MongoDB:**
   - Local MongoDB: `mongod`
   - Or use MongoDB Atlas cloud service

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Configuration

Update `config.env` with your settings:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/agencyhost
# For production: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agencyhost

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3002

# Security
BCRYPT_ROUNDS=12
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new agency user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Health Check
- `GET /api/health` - Server health status

## Database Models

### User Model
- Agency and client user accounts
- Password hashing with bcrypt
- Account locking for security
- JWT token management

### Client Model
- Client relationship management
- Verification token system
- Password creation for client access
- Interface assignments

### Interface Model
- White-label interface configuration
- Webhook integration
- Client assignments
- Custom branding settings

## Security Features

- **Password Hashing** - bcrypt with 12 rounds
- **JWT Authentication** - Secure token-based auth
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Express-validator middleware
- **CORS Protection** - Configured for frontend
- **Helmet Security** - HTTP headers protection
- **Account Locking** - After failed login attempts

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for auto-restart on file changes.

### API Testing
Test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands

### Database Connection
The server automatically connects to MongoDB and creates collections as needed.

## Production Deployment

1. **Set environment variables:**
   - `NODE_ENV=production`
   - Use MongoDB Atlas or production MongoDB
   - Set strong JWT secret
   - Configure CORS for your domain

2. **Build and start:**
   ```bash
   npm start
   ```

3. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "agencyhost-api"
   ```

## Frontend Integration

The React frontend (running on port 3002) will connect to this API server (port 3001) for:
- User authentication
- Data persistence
- Multi-device access
- Real-time updates

## Support

For issues or questions:
1. Check the console logs for error messages
2. Verify MongoDB connection
3. Ensure environment variables are set correctly
4. Check CORS configuration matches your frontend URL

## License

MIT License - see LICENSE file for details. # saas

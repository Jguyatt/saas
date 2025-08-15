# Railway Deployment Guide for AgencyHost Backend

## 🚀 Deploy to Railway (Recommended)

Railway is perfect for your backend because it:
- ✅ **Free tier available** (500 hours/month)
- ✅ **Automatic MongoDB** database setup
- ✅ **Easy deployment** from GitHub
- ✅ **Custom domains** support
- ✅ **Environment variables** management
- ✅ **Auto-scaling** capabilities

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app)
3. **Git installed** - For pushing code

## 🚀 Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
# Navigate to your project
cd whitelabel-hosting

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with Railway deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/agencyhost-backend.git
git push -u origin main
```

### 2. Deploy on Railway

1. **Go to Railway**: [railway.app](https://railway.app)
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `agencyhost-backend`
6. **Select the `server` folder** as the source
7. **Click "Deploy"**

### 3. Add MongoDB Database

1. **In your Railway project**, click "New"
2. **Select "Database"** → "MongoDB"
3. **Railway will automatically**:
   - Create MongoDB instance
   - Set environment variables
   - Connect it to your app

### 4. Configure Environment Variables

In your Railway project dashboard:

1. **Go to "Variables" tab**
2. **Add these variables**:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
```

**Note**: Railway automatically sets `MONGODB_URI` when you add the MongoDB database.

### 5. Get Your API URL

1. **Go to "Settings" tab**
2. **Copy your domain** (e.g., `https://agencyhost-backend-production.up.railway.app`)
3. **This is your API base URL**

## 🔧 Update Frontend Configuration

Once deployed, update your frontend to use the Railway API:

```javascript
// In your frontend, replace localhost:3001 with your Railway URL
const API_BASE_URL = 'https://your-railway-app.up.railway.app/api';
```

## 📊 Railway Dashboard Features

### Monitoring
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage
- **Health Checks**: Automatic health monitoring

### Environment Management
- **Variables**: Secure environment variable storage
- **Secrets**: Encrypted sensitive data
- **Preview Deployments**: Test changes before production

### Database Management
- **MongoDB Atlas**: Automatic setup
- **Connection**: Secure database connections
- **Backups**: Automatic database backups

## 🔍 Testing Your Deployment

### Health Check
```bash
curl https://your-railway-app.up.railway.app/api/health
```

### Register User
```bash
curl -X POST https://your-railway-app.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Agency",
    "email": "test@agency.com",
    "password": "password123"
  }'
```

## 🚀 Custom Domain (Optional)

1. **In Railway dashboard**, go to "Settings"
2. **Click "Custom Domains"**
3. **Add your domain** (e.g., `api.youragency.com`)
4. **Update DNS** as instructed
5. **Update CORS_ORIGIN** in environment variables

## 📈 Scaling

### Free Tier Limits
- **500 hours/month** (enough for development)
- **512MB RAM**
- **Shared CPU**

### Paid Plans
- **$5/month**: 1000 hours, 1GB RAM
- **$20/month**: Unlimited hours, 2GB RAM
- **Custom**: Higher limits available

## 🔄 Continuous Deployment

Railway automatically deploys when you push to GitHub:

1. **Make changes** to your code
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update API endpoints"
   git push
   ```
3. **Railway automatically** builds and deploys

## 🆘 Troubleshooting

### Deployment Fails
- Check **Railway logs** for errors
- Verify **package.json** has correct start script
- Ensure **all dependencies** are in package.json

### Database Connection Issues
- Verify **MONGODB_URI** is set in Railway variables
- Check **MongoDB service** is running in Railway
- Review **connection logs** in Railway dashboard

### CORS Errors
- Update **CORS_ORIGIN** in Railway variables
- Add your **frontend domain** to allowed origins
- Check **browser console** for specific errors

## 🎯 Benefits of Railway

1. **Zero Configuration**: Automatic setup
2. **MongoDB Included**: No separate database setup
3. **Free Tier**: Perfect for development
4. **Auto-scaling**: Handles traffic spikes
5. **Custom Domains**: Professional URLs
6. **GitHub Integration**: Automatic deployments
7. **Monitoring**: Built-in analytics

## 📞 Next Steps

1. **Deploy backend** to Railway
2. **Update frontend** to use Railway API
3. **Test multi-device access**
4. **Set up custom domain** (optional)
5. **Monitor performance** in Railway dashboard

Your AgencyHost backend will be production-ready on Railway! 🚀 
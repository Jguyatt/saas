#!/bin/bash

# 🚀 AgencyHost Backend Deployment Script
# This script helps you deploy your Node.js backend to free hosting platforms

echo "🚀 AgencyHost Backend Deployment Script"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the server directory."
    exit 1
fi

# Check if .env file exists
if [ ! -f "config.env" ]; then
    echo "⚠️  Warning: config.env not found. Creating template..."
    cat > config.env << EOF
# AgencyHost Backend Configuration
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/agencyhost
JWT_SECRET=your-super-secret-jwt-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3002
BCRYPT_ROUNDS=12
EOF
    echo "✅ Created config.env template. Please update with your values."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate JWT secret if not set
if grep -q "your-super-secret-jwt-key-here" config.env; then
    echo "🔑 Generating JWT secret..."
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    sed -i.bak "s/your-super-secret-jwt-key-here/$JWT_SECRET/" config.env
    echo "✅ Generated and updated JWT secret"
fi

# Test the server
echo "🧪 Testing server..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test health endpoint
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Server is running and healthy!"
else
    echo "❌ Server health check failed"
fi

# Stop test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎯 Deployment Options:"
echo "======================"
echo "1. 🚀 Render (Recommended - Free, Easy)"
echo "2. 🌐 Vercel (Serverless - Free)"
echo "3. ⚡ Netlify (Functions - Free)"
echo "4. 🐳 Docker (Self-hosted)"
echo "5. 📱 Local Development"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo "🚀 Deploying to Render..."
        echo "1. Go to https://render.com"
        echo "2. Sign up for free account"
        echo "3. Connect your GitHub repository"
        echo "4. Create new Web Service"
        echo "5. Choose Node.js environment"
        echo "6. Set build command: npm install"
        echo "7. Set start command: npm start"
        echo "8. Add environment variables from config.env"
        echo "9. Deploy!"
        echo ""
        echo "📖 See FREE_DEPLOYMENT.md for detailed instructions"
        ;;
    2)
        echo "🌐 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel
        fi
        ;;
    3)
        echo "⚡ Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
        else
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
            netlify deploy --prod
        fi
        ;;
    4)
        echo "🐳 Docker deployment..."
        if command -v docker &> /dev/null; then
            echo "Building Docker image..."
            docker build -t agency-host-backend .
            echo "Running container..."
            docker run -p 3001:3001 --env-file config.env agency-host-backend
        else
            echo "❌ Docker not installed. Please install Docker first."
        fi
        ;;
    5)
        echo "📱 Starting local development server..."
        npm run dev
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment setup complete!"
echo "📖 Check FREE_DEPLOYMENT.md for detailed instructions"
echo "🔗 Your API will be available at the URL provided by your hosting platform" 
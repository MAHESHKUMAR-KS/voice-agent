#!/bin/bash

# Build script for production deployment

set -e

echo "🏗️  Building Voice RAG Funnel for Production..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build Backend
echo -e "${BLUE}Step 1: Building Backend...${NC}"
cd backend
npm run build
echo -e "${GREEN}✓ Backend built successfully${NC}"
cd ..

# Step 2: Build Frontend
echo -e "${BLUE}Step 2: Building Frontend...${NC}"
cd frontend
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"
cd ..

# Step 3: Create necessary directories
echo -e "${BLUE}Step 3: Setting up directories...${NC}"
mkdir -p data logs
echo -e "${GREEN}✓ Directories created${NC}"

# Step 4: Check if .env files exist
echo -e "${BLUE}Step 4: Checking environment files...${NC}"
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}⚠️  Warning: backend/.env not found${NC}"
    echo "Copy .env.example to .env and fill in your values:"
    echo "  cp backend/.env.example backend/.env"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${RED}⚠️  Warning: frontend/.env not found${NC}"
    echo "Copy .env.example to .env and fill in your values:"
    echo "  cp frontend/.env.example frontend/.env"
fi

# Step 5: Build Docker image (optional)
echo -e "${BLUE}Step 5: Docker setup${NC}"
if command -v docker &> /dev/null; then
    read -p "Build Docker image? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Building Docker image..."
        docker build -t voice-rag-funnel:latest .
        echo -e "${GREEN}✓ Docker image built successfully${NC}"
    fi
else
    echo -e "${BLUE}ℹ️  Docker not found, skipping Docker build${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Build complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure environment variables:"
echo "   - backend/.env"
echo "   - frontend/.env"
echo ""
echo "2. Test locally:"
echo "   npm start  (from backend directory)"
echo ""
echo "3. Deploy:"
echo "   - Docker: docker-compose up"
echo "   - Railway: git push"
echo "   - Vercel: git push"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"

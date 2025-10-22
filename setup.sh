#!/bin/bash

echo "🚀 Setting up AI Compiler..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backEnd" || exit 1

echo "📦 Building Docker images..."
echo ""

# Build C++ runner
echo "Building C++ runner..."
docker build -t cpp-runner -f Dockerfile.cpp . || {
    echo "❌ Failed to build cpp-runner"
    exit 1
}
echo "✅ cpp-runner built successfully"
echo ""

# Build Python runner
echo "Building Python runner..."
docker build -t py-runner -f Dockerfile.python . || {
    echo "❌ Failed to build py-runner"
    exit 1
}
echo "✅ py-runner built successfully"
echo ""

# Build Java runner
echo "Building Java runner..."
docker build -t java-runner -f Dockerfile.java . || {
    echo "❌ Failed to build java-runner"
    exit 1
}
echo "✅ java-runner built successfully"
echo ""

echo "🎉 All Docker images built successfully!"
echo ""
echo "📋 Installed images:"
docker images | grep -E "runner|REPOSITORY"
echo ""

echo "✨ Next steps:"
echo "1. Start backend:  cd backEnd && npm install && npm start"
echo "2. Start frontend: cd frontEnd && npm install && npm run dev"
echo "3. Open browser:   http://localhost:3000"
echo ""
echo "📖 See SETUP.md for detailed instructions"

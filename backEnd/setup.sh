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

# Build JavaScript (Node) runner
echo "Building JavaScript (Node) runner..."
docker build -t js-runner -f Dockerfile.javascript . || {
    echo "❌ Failed to build js-runner"
    exit 1
}
echo "✅ js-runner built successfully"
echo ""

# Build TypeScript runner
echo "Building TypeScript runner..."
docker build -t ts-runner -f Dockerfile.typescript . || {
    echo "❌ Failed to build ts-runner"
    exit 1
}
echo "✅ ts-runner built successfully"
echo ""

# Build Go runner
echo "Building Go runner..."
docker build -t go-runner -f Dockerfile.go . || {
    echo "❌ Failed to build go-runner"
    exit 1
}
echo "✅ go-runner built successfully"
echo ""

# Build Ruby runner
echo "Building Ruby runner..."
docker build -t ruby-runner -f Dockerfile.ruby . || {
    echo "❌ Failed to build ruby-runner"
    exit 1
}
echo "✅ ruby-runner built successfully"
echo ""

# Build PHP runner
echo "Building PHP runner..."
docker build -t php-runner -f Dockerfile.php . || {
    echo "❌ Failed to build php-runner"
    exit 1
}
echo "✅ php-runner built successfully"
echo ""

# Build Rust runner
echo "Building Rust runner..."
docker build -t rust-runner -f Dockerfile.rust . || {
    echo "❌ Failed to build rust-runner"
    exit 1
}
echo "✅ rust-runner built successfully"
echo ""

# Build Swift runner
echo "Building Swift runner..."
docker build -t swift-runner -f Dockerfile.swift . || {
    echo "❌ Failed to build swift-runner"
    exit 1
}
echo "✅ swift-runner built successfully"
echo ""

# Build C# (dotnet) runner
echo "Building C# (dotnet) runner..."
docker build -t csharp-runner -f Dockerfile.csharp . || {
    echo "❌ Failed to build csharp-runner"
    exit 1
}
echo "✅ csharp-runner built successfully"
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
echo "📖 See README.md for detailed instructions"

#!/bin/bash

# Development mode - runs backend and frontend using Docker Compose
# This is the most reliable way to handle dependencies.

echo "🚀 Starting Palmyre GAN in DEVELOPMENT mode (Docker)..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker."
  exit 1
fi

echo "🐳 Building and starting services..."
echo "   - Backend: http://localhost:5000"
echo "   - Frontend: http://localhost:3001"
echo ""

# Use "docker compose" (V2) if available, otherwise "docker-compose"
if docker compose version > /dev/null 2>&1; then
    docker compose up --build
else
    docker-compose up --build
fi

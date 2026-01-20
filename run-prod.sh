#!/bin/bash

# Production mode - builds frontend for production server
# Frontend connects to https://ml-research.pef.czu.cz/api

echo "🏗️  Building Palmyre GAN for PRODUCTION..."
echo ""

cd frontend

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building production bundle..."
npm run build

echo ""
echo "✅ Production build complete!"
echo ""
echo "📁 Build output: frontend/build/"
echo ""
echo "To serve the build locally for testing:"
echo "  npx serve -s frontend/build"
echo ""
echo "To deploy, copy the 'frontend/build' folder to your web server."

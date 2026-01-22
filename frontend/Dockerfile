# Frontend Production Dockerfile
# Multi-stage build: build React app, then serve with 'serve'

# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code and env files
COPY . .

# Build for production (uses .env.production automatically)
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/build ./build

# Expose port 4000 (matching current setup)
EXPOSE 4000

# Serve the build folder on port 4000
CMD ["serve", "-s", "build", "-l", "4000"]

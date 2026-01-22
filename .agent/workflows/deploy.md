---
description: Deploy Palmyre GAN to production server via Docker Compose
---

# Production Deployment Workflow

Server: `francd@10.126.0.148` (ml-research.pef.czu.cz)
Password: [stored securely - ask user]

## Prerequisites
- SSH access to the server
- Docker and Docker Compose installed (already present)

## Deployment Steps

// turbo-all

### 1. Connect to Server
```bash
ssh francd@10.126.0.148
```

### 2. Stop Existing Screen Sessions (if running)
```bash
# List screen sessions
screen -ls

# Kill all screen sessions (adjust names as needed)
screen -X -S pts-1.ml-research quit 2>/dev/null || true
pkill -u francd -f "python.*app.py" || true
pkill -u francd -f "node.*serve" || true
```

### 3. Navigate to Project Directory
```bash
cd /home/francd/gan-palmyre-web-app
```

### 4. Pull Latest Code
```bash
git pull origin main
```

### 5. Build Docker Images
```bash
docker compose -f docker-compose.prod.yml build
```

### 6. Stop Old Containers (if any)
```bash
docker compose -f docker-compose.prod.yml down
```

### 7. Start New Containers
```bash
docker compose -f docker-compose.prod.yml up -d
```

### 8. Verify Deployment
```bash
# Check containers are running
docker compose -f docker-compose.prod.yml ps

# Check logs
docker compose -f docker-compose.prod.yml logs --tail=50

# Verify ports
ss -tlnp | grep -E '4000|5000'

# Test endpoints
curl -s http://localhost:5000/ | head -5
curl -s http://localhost:4000/ | head -5
```

## Rollback (if needed)

```bash
# Stop Docker containers
docker compose -f docker-compose.prod.yml down

# Restart old screen sessions manually
cd /home/francd/gan-palmyre
screen -dmS backend python3.10 app.py

cd /home/francd/gan-palmyre-web-app
screen -dmS frontend node /usr/local/bin/serve -s build -l 4000
```

## Architecture

```
Apache (port 80)
├── /api/* → http://127.0.0.1:5000 (backend container)
└── /*     → http://127.0.0.1:4000 (frontend container)
```

#!/bin/bash
set -e

echo "🔧 Installing build dependencies (requires sudo)..."
# Remove broken PPA if it exists to fix apt update
sudo add-apt-repository --remove ppa:deadsnakes/ppa -y || true
# Update but verify success is not strictly required for partial updates
sudo apt-get update || echo "⚠️  apt update had warnings, continuing..."

# Try to fix broken packages first
sudo apt-get --fix-broken install -y || echo "⚠️  Could not fix broken packages, trying to proceed..."

# Install dependencies - ignore errors as some unrelated system packages might fail
sudo apt-get install -y make build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev git || echo "⚠️  apt install validation failed, but attempting to proceed with python build..."

echo "📥 Installing pyenv..."
if [ ! -d "$HOME/.pyenv" ]; then
    curl https://pyenv.run | bash
else
    echo "pyenv already installed."
fi

export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"

echo "🐍 Installing Python 3.11.9 (this takes ~5 minutes to compile)..."
if ! pyenv versions | grep -q "3.11.9"; then
    pyenv install 3.11.9
else
    echo "Python 3.11.9 already installed."
fi

echo "✅ Setup complete! Python 3.11 is ready."

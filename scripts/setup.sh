#!/bin/bash

# AdServer Setup Script

echo "Setting up AdServer..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create logs directory
mkdir -p logs

# Copy environment file
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "Please edit .env file with your configuration"
fi

# Run tests
echo "Running tests..."
npm test

echo "Setup complete! You can now run the server with 'npm start'"
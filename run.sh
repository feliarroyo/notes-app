#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "===================================================="
echo "Starting Notes Application Setup..."
echo "===================================================="

# 1. Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker daemon is not running."
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "Building containers and initializing system components..."
echo "This will compile the Java backend, bundle the React frontend, and verify schemas."
echo "----------------------------------------------------"

# 2. Run the Docker Compose stack
# --build ensures any last-minute code modifications are freshly compiled
docker compose up --build

echo "===================================================="
echo "System running cleanly!"
echo "===================================================="
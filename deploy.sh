#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print the start time of the deployment
echo "Starting deployment at $(date)"

# Navigate to the server directory
cd server

# Install any new dependencies
npm install --production

# Build the client app
cd ../client
npm install --production
npm run build

# Navigate back to the server directory
cd ../server

# Restart all applications managed by PM2
pm2 restart all

echo "Deployment completed successfully at $(date)"

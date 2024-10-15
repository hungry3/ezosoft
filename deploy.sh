#!/bin/bash

# Restart the backend
echo "Deploying Backend..."
cd /root/ezosoft/server
npm ci  # Install dependencies
pm2 restart backend

# Restart the client
echo "Deploying Client..."
cd /root/ezosoft/client
npm ci  # Install dependencies
npm run build --if-present
pm2 restart client

# Restart the admin
echo "Deploying Admin..."
cd /root/ezosoft/admin
npm ci  # Install dependencies
npm run build --if-present
pm2 restart admin

echo "Deployment completed!"

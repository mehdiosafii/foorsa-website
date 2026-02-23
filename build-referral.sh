#!/bin/bash
set -e

echo "Building Foorsa Referral Engine..."

# Build referral app
cd referral
echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Build complete!"
ls -lh dist/

# Copy built files to public/referral for Vercel static serving
cd ..
echo "Copying built files to public/referral..."
mkdir -p public/referral
cp -r referral/dist/* public/referral/
echo "Files copied successfully!"
ls -lh public/referral/

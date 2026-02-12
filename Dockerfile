# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

# Install serve globally as root
RUN npm install -g serve

# Switch to non-root user 'node' (UID 1000) - Required by Hugging Face Spaces
USER node

WORKDIR /app

# Copy built files from builder
COPY --from=builder --chown=node /app/dist ./dist

# Expose port (HF uses 7860)
EXPOSE 7860

# Start server
CMD ["serve", "-s", "dist", "-l", "7860"]

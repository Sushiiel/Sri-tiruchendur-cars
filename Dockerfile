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

# Create user with UID 1000 (required by Hugging Face Spaces)
RUN adduser -D -u 1000 user
USER user

WORKDIR /app

# Install serve globally for the user
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder --chown=user /app/dist ./dist

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "7860"]

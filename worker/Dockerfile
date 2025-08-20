# Production Node.js worker (lean, non-root)
FROM node:20-alpine

WORKDIR /app

# Install only production deps (npm v9+ prefers --omit=dev)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source (make sure .dockerignore excludes dev files)
COPY . .

# Optional: set timezone; needs tzdata on Alpine
# If you prefer UTC, remove the next two lines
RUN apk add --no-cache tzdata
ENV TZ=Asia/Tehran

# Env for runtime
ENV NODE_ENV=production

# Create non-root user and set ownership
RUN addgroup -g 1001 -S nodegrp \
    && adduser -S -D -H -u 1001 nodeusr -G nodegrp \
    && chown -R nodeusr:nodegrp /app
USER nodeusr

# Start the worker (matches your src/ layout)
CMD ["node", "src/main.js"]
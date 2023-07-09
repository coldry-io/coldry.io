# Setup Node.js environment
FROM node:18-alpine AS base

# 1. Install dependencies if needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and yarn.lock first to avoid reinstalling dependencies
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env .env
RUN yarn prisma generate
RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup -g 1001 -S coldry && \
    adduser -S stage -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=stage:coldry /app/.next/standalone ./
COPY --from=builder --chown=stage:coldry /app/.next/static ./.next/static

USER stage

# Expose port 3000 and generate prisma client
EXPOSE 3000

# Enable restart policy
CMD ["node", "server.js"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || \
    curl -X POST --data-urlencode \
    "payload={\"channel\": \"#deployment\", \"username\": \"Coldry Health Check\", \"text\": \"Health check failed for container: coldry.live\", \"icon_emoji\": \":X:\"}" \
    $SLACK_HOOK_URL

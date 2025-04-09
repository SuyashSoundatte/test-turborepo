# Stage 1: Prune with Turbo

FROM node:lts AS turbo-prune

WORKDIR /app

COPY . .

RUN npx turbo prune --filter=http-server --docker

# Stage 2: installer and building 
FROM node:lts AS installer

WORKDIR /app

# Enable Corepack and install Yarn (modern way)
RUN corepack enable
# Copy pruned package manager file
COPY --from=turbo-prune /app/out/json/ 
COPY --from=turbo-prune /app/out/yarn.lock ./yarn.lock

# Install only production dependencies
RUN yarn install --frozen-lockfile

# Copy the source code after install for better caching
COPY --from=turbo-prune /app/out/full/ .
COPY turbo.json turbo.json

# Build only the target app and its deps
RUN yarn turbo run build --filter=apps/http-server...

# Stage 3: Runtime
FROM node:lts AS runner

WORKDIR /app

COPY --from=installer /app .

WORKDIR /app/apps/http-server

EXPOSE 3000
CMD ["node", "dist/index.js"]    
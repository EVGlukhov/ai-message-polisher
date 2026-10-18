FROM node:24-bookworm-slim

WORKDIR /app

COPY . .
ENV NODE_EXTRA_CA_CERTS=/app/apps/api/certificates/Russian_Trusted_CA.pem

RUN npm ci && npm run build:contracts

# -------------------------
# 1. Install dependencies
# -------------------------
FROM node:20-alpine AS deps
# แนะนำให้เพิ่ม libc6-compat สำหรับพวกไลบรารีบางตัวที่ต้องใช้บน Alpine (เช่น sharp)
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# -------------------------
# 2. Build stage
# -------------------------
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 👇 เพิ่ม 2 บรรทัดนี้
ARG NEXT_PUBLIC_API_SETTING_URL
ENV NEXT_PUBLIC_API_SETTING_URL=$NEXT_PUBLIC_API_SETTING_URL

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# -------------------------
# 3. Production runner
# -------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# [Security] สร้าง Non-root user เพื่อไม่ให้รันด้วยสิทธิ์ root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy เฉพาะไฟล์ที่จำเป็นจากโฟลเดอร์ standalone
COPY --from=builder /app/public ./public

# ย้ายไฟล์ไปที่ standalone และกำหนดสิทธิ์ให้ user nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# สลับไปใช้ user ที่ปลอดภัย
USER nextjs

EXPOSE 5000
ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

# เมื่อใช้ standalone เราจะรันผ่าน node server.js โดยตรง ไม่ต้องผ่าน npm start
CMD ["node", "server.js"]
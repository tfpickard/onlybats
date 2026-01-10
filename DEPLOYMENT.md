# Deployment Guide

## Vercel (Recommended)

OnlyBats.org is optimized for Vercel deployment with Next.js App Router.

### 1. Connect Repository
- Import the GitHub repository into Vercel
- Choose the Next.js framework preset

### 2. Configure Environment Variables
Set the following in Vercel:

- `DATABASE_URL` (Postgres connection string)
- `NEXTAUTH_URL` (production URL)
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- `NEXT_PUBLIC_REALTIME_URL` (optional)

### 3. Build Settings

```text
Build Command: npm run build
Install Command: npm install
Output Directory: .next
```

### 4. Prisma Migrations
Run migrations in production after deploy:

```bash
npx prisma migrate deploy
```

## Post-Deployment Checklist

- Verify home page loads
- Confirm auth flow works
- Validate database writes
- Check simulation performance
- Confirm realtime polling works

## Rollback Strategy

- Revert to a previous Vercel deployment
- If database changes were deployed, follow Prisma migration rollback procedures

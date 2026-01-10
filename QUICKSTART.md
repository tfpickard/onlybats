# Quick Start Guide

## Overview
This guide walks you through setting up OnlyBats.org locally. Expected completion time: 10-20 minutes.

## Prerequisites

- **Node.js 18+**
- **npm** (bundled with Node.js)
- **Git** (2.40+ recommended)
- **SQLite** (bundled via Prisma for dev) or **PostgreSQL** (for production parity)

## Step 1: Clone the Repository

```bash
git clone <your-repo-url> onlybats
cd onlybats
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your values:

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret" # generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_REALTIME_URL="" # optional
```

## Step 4: Initialize the Database

```bash
npx prisma generate
npx prisma db push
```

## Step 5: Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Step 6: Verify the Setup

```bash
npm run build
npx tsc --noEmit
```

## Commands Reference

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
```

## Next Steps

- Review [CLAUDE.md](./CLAUDE.md) for AI workflow guidance.
- Review [AGENTS.md](./AGENTS.md) for the multi-agent blueprint.
- Review [DEVELOPMENT.md](./DEVELOPMENT.md) for development standards.
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment steps.

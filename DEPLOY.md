# GoFix Deployment Guide

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel         │     │   Railway        │     │   Neon/Supabase │
│   (Next.js)      │────▶│   (Go Backend)   │────▶│   (PostgreSQL)  │
│   Port 3000      │     │   Port 8080      │     │   Port 5432     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Step 1: Set Up PostgreSQL (Neon)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string (it looks like `postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require`)
4. Save this for later

## Step 2: Deploy Go Backend (Railway)

1. Go to [railway.app](https://railway.app) and create an account
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository
4. Select the root directory (where `Dockerfile` is)
5. Add a PostgreSQL service:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will provide a `DATABASE_URL`
6. Set environment variables:
   ```
   DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
   ```
7. Deploy Railway will build and deploy automatically
8. Note the public URL (e.g., `https://your-app.up.railway.app`)

## Step 3: Deploy Next.js Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and create an account
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add environment variables:
   ```
   DATABASE_URL=your-neon-connection-string
   ANALYTICS_API_KEY=generate-a-random-key
   NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
6. Click "Deploy"

## Step 4: Initialize Database

After deployment, run the migration:

```bash
# Using the API endpoint (dev only)
curl -X POST https://your-app.vercel.app/api/setup

# Or connect to Neon directly and run the SQL
psql "your-neon-connection-string" -f src/lib/migrations/001_create_visitor_tables.sql
```

## Step 5: Verify

1. Visit your Vercel URL
2. Navigate around to generate visitor data
3. Login as admin (admin@gofix.dev / admin123)
4. Visit `/admin` to see real analytics

---

## Quick Deploy (All-in-One with Railway)

If you want everything on Railway:

1. Create a new Railway project
2. Add services:
   - PostgreSQL
   - Go Backend (from Dockerfile)
   - Next.js Frontend (from `frontend/` directory)
3. Set environment variables:
   ```
   # Frontend
   DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
   NEXT_PUBLIC_API_URL=${{Go Backend.URL}}
   
   # Backend
   DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
   ```
4. Deploy all services

---

## Environment Variables Reference

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `ANALYTICS_API_KEY` | API key for analytics endpoint | `openssl rand -hex 32` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `https://your-app.vercel.app` |
| `NEXT_PUBLIC_API_URL` | Backend URL | `https://your-app.up.railway.app` |

---

## Troubleshooting

### "Database connection refused"
- Check `DATABASE_URL` is correct
- Ensure SSL mode is enabled for remote databases
- Verify the database server is running

### "Migration failed"
- Run `POST /api/setup` to create tables
- Or manually run the SQL from `src/lib/migrations/001_create_visitor_tables.sql`

### "Unauthorized" on analytics
- Set `ANALYTICS_API_KEY` in Vercel environment variables
- Or remove the auth check for development

### Build fails on Vercel
- Check Node.js version (should be 18+)
- Ensure `package.json` has correct scripts
- Check build logs for specific errors

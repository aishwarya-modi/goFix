# Railway Deployment Guide

This guide walks you through deploying the GoFix application to Railway.

## Prerequisites

1. A Railway account (https://railway.app)
2. Railway CLI installed (optional, for command-line deployment)
3. Git repository pushed to GitHub/GitLab

## Architecture

The application consists of two services:
- **Frontend**: Next.js application (port 3000)
- **Backend**: Go API server (port 8080)
- **Database**: PostgreSQL 16

## Step 1: Create Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub Repo"
4. Select your repository

## Step 2: Add PostgreSQL Database

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will create a PostgreSQL instance
4. Note the connection details (they'll be auto-generated)

## Step 3: Configure Backend Service

1. Railway should auto-detect the Go backend
2. If not, add a new service and select "Dockerfile"
3. Set the following environment variables:

```
DB_HOST=${{PostgreSQL.HOST}}
DB_PORT=${{PostgreSQL.PORT}}
DB_USER=${{PostgreSQL.USER}}
DB_PASSWORD=${{PostgreSQL.PASSWORD}}
DB_NAME=${{PostgreSQL.DATABASE}}
PORT=8080
```

4. Railway will use the root `Dockerfile` by default
5. Set the root directory to `/` if prompted

## Step 4: Configure Frontend Service

1. Add a new service for the frontend
2. Select "Dockerfile" as the builder
3. Set the root directory to `/frontend`
4. Set the following environment variables:

```
DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
NEXT_PUBLIC_APP_URL=${{Frontend.RAILWAY_PUBLIC_DOMAIN}}
NODE_ENV=production
```

## Step 5: Configure Service Domains

1. For the Frontend service, go to "Settings"
2. Under "Networking", click "Generate Domain"
3. This will give you a public URL like `frontend.up.railway.app`

## Step 6: Run Database Migrations

The backend automatically runs migrations on startup. However, if you need to run them manually:

1. SSH into the backend service (Railway Console)
2. Run the migration endpoint:
   ```bash
   curl -X POST http://localhost:8080/migrate
   ```

Or use the Railway CLI:
```bash
railway run curl -X POST http://localhost:8080/migrate
```

## Step 7: Verify Deployment

1. Check the backend health:
   ```bash
   curl https://your-backend.up.railway.app/health
   ```

2. Check the frontend:
   - Visit your frontend URL
   - Navigate to the Learn section
   - Verify content loads

## Environment Variables Reference

### Backend
| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_USER` | PostgreSQL user | admin |
| `DB_PASSWORD` | PostgreSQL password | admin |
| `DB_NAME` | PostgreSQL database name | test_repo |
| `PORT` | Server port | 8080 |

### Frontend
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `NEXT_PUBLIC_APP_URL` | Public app URL | http://localhost:3000 |
| `NODE_ENV` | Environment | development |

## Troubleshooting

### Backend won't start
- Check logs in Railway dashboard
- Verify database connection variables are set
- Ensure migrations ran successfully

### Frontend can't connect to database
- Verify `DATABASE_URL` is set correctly
- Check if PostgreSQL service is running
- Ensure SSL mode is appropriate for production

### CORS issues
- The backend should allow requests from the frontend domain
- Update CORS configuration if needed

## Cost Optimization

Railway offers a free tier with limited usage:
- $5 free credit per month
- 512 MB RAM, 1 GB disk
- Perfect for development/testing

For production, consider:
- Upgrading to a paid plan
- Using Railway's PostgreSQL addon
- Setting up proper monitoring

## Scaling

Railway supports horizontal scaling:
1. Go to Service Settings
2. Adjust the number of replicas
3. Railway handles load balancing automatically

For the database:
- Upgrade PostgreSQL plan for more storage/CPU
- Consider read replicas for heavy read workloads

## Next Steps

After deployment:
1. Set up a custom domain (optional)
2. Configure monitoring and alerts
3. Set up CI/CD for automatic deployments
4. Review security best practices

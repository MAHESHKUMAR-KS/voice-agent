# Deployment Guide - Voice RAG Funnel

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Frontend build successful (`npm run build`)
- [ ] Backend build successful (`npm run build`)
- [ ] Database initialized
- [ ] CORS settings configured
- [ ] API endpoints tested
- [ ] Form submission tested end-to-end

---

## Local Testing

### Option 1: Development Mode

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Option 2: Production Build

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
npm run preview

# Start backend
cd backend
npm start
```

---

## Docker Deployment

### Build Docker Image

```bash
docker build -t voice-rag-funnel:latest .
```

### Run with Docker

```bash
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e CORS_ORIGIN=https://yourdomain.com \
  -v $(pwd)/data:/app/data \
  voice-rag-funnel:latest
```

### Docker Compose

```bash
docker-compose up -d
```

Access the app at `http://localhost:5000`

---

## Cloud Deployment Options

### Option 1: Vercel (Frontend) + Railway/Heroku (Backend)

#### Frontend on Vercel

1. Connect GitHub repo to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL=https://your-backend.railway.app`

#### Backend on Railway

1. Create new project on Railway
2. Connect GitHub repo
3. Set start command: `npm run build && npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CORS_ORIGIN=https://your-vercel-domain.vercel.app`

### Option 2: AWS (Full Stack)

#### Using AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p node.js-18 voice-rag-funnel --region us-east-1

# Create environment
eb create production

# Deploy
eb deploy
```

#### Using AWS ECS + ECR

```bash
# Push Docker image
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag voice-rag-funnel:latest <account>.dkr.ecr.us-east-1.amazonaws.com/voice-rag-funnel:latest

docker push <account>.dkr.ecr.us-east-1.amazonaws.com/voice-rag-funnel:latest
```

### Option 3: Railway (Recommended - Simplest)

1. Sign up at railway.app
2. Create new project
3. Connect GitHub repo
4. Select `Dockerfile` as template
5. Add environment variables
6. Deploy automatically

**Railway URL** will be generated automatically (e.g., `https://voice-rag-funnel-prod.up.railway.app`)

### Option 4: Render

1. Sign up at render.com
2. Create new Web Service
3. Connect GitHub repo
4. Build command: `npm run build && npm run start` (from backend)
5. Start command: `npm start`
6. Add environment variables
7. Deploy

---

## Environment Variables by Platform

### Vercel (Frontend)
```
VITE_API_URL=https://api.yourdomain.com
```

### Railway/Heroku/AWS (Backend)
```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

---

## Database in Production

### Current Setup (File-based)
- Database: `voice_leads.db` (JSON file)
- Stored in: `/app/data` (Docker volume)

### Recommended for Production
If you need better reliability, migrate to PostgreSQL:

1. **Create .env file:**
   ```
   DATABASE_URL=postgresql://user:password@db.example.com/voice_rag
   ```

2. **Update backend** to use PostgreSQL driver (instead of file-based)

3. **Backup Strategy:**
   - Daily automated backups
   - Cloud storage (S3, GCS)
   - Point-in-time recovery

---

## SSL/HTTPS Setup

### With Railway/Vercel
- **Automatic** - SSL certificate provided

### With custom domain
```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --standalone -d yourdomain.com

# Renew automatically
sudo systemctl enable certbot.timer
```

---

## Performance Optimization

### Frontend
- ✅ Already minified (Vite production build)
- ✅ CSS optimized (10.7KB gzipped)
- ✅ JS optimized (270KB gzipped)

### Backend
- Add caching headers:
  ```typescript
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    next();
  });
  ```

- Enable compression:
  ```typescript
  import compression from 'compression';
  app.use(compression());
  ```

---

## Monitoring & Logging

### Health Check
```
GET /health
Response: { status: 'OK', timestamp: '2024-09-16T...' }
```

### Error Logging
Add to backend before deployment:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());
```

### Enable CloudWatch/Logs
- Railway: Built-in logs viewer
- Vercel: Built-in analytics
- AWS: CloudWatch logs

---

## Testing Before Deployment

### 1. Form Submission Flow
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "work_email": "john@company.com",
    "job_title": "VP Support",
    "company_name": "Acme Corp",
    "use_case": "Field Support",
    "other_use_case": "",
    "phone": "+919876543210"
  }'
```

### 2. Email Validation
- ✅ Work emails accepted: john@company.com
- ✅ Personal emails rejected: john@gmail.com

### 3. Other Use Case Flow
- Select "Other" in use case dropdown
- Custom text field should appear
- Submit with custom value
- Check database for `other_use_case` field

### 4. Cross-Browser Testing
- Chrome/Chromium
- Firefox
- Safari
- Edge

### 5. Mobile Testing
- iPhone Safari
- Android Chrome
- Tablet views (iPad, Android tablets)

---

## Post-Deployment Checklist

- [ ] Site loads on all devices
- [ ] Form submits successfully
- [ ] Demo video plays after submission
- [ ] Database stores leads correctly
- [ ] Email validation works
- [ ] Phone selector works
- [ ] "Other" use case field appears when selected
- [ ] All CTAs scroll to form
- [ ] Sticky button appears on scroll
- [ ] FAQ accordion expands/collapses
- [ ] Analytics tracking enabled (if applicable)
- [ ] Error monitoring active (Sentry/similar)
- [ ] Daily backups configured
- [ ] SSL/HTTPS working
- [ ] CORS correctly configured

---

## Troubleshooting

### Issue: Form not submitting
- Check CORS_ORIGIN matches frontend URL
- Verify backend is running
- Check network tab for errors
- Ensure email domain is not in blocklist

### Issue: Demo video not loading
- Check video file path: `/asset/Voice Agent_New - Trim.mp4`
- Verify file exists in production build
- Check video MIME type

### Issue: Phone input not working
- Verify country selector dropdown z-index
- Check phone field styling on mobile
- Test with different browsers

### Issue: Database not persisting
- Check file permissions on `/app/data`
- Verify volume is mounted (Docker)
- Check disk space available

---

## Rollback Plan

If deployment goes wrong:

```bash
# Vercel - Automatic rollback
# Go to Deployments → Select previous version → Rollback

# Railway - Rollback
git revert <commit-hash>
git push

# Docker - Use previous image tag
docker run -p 5000:5000 voice-rag-funnel:previous
```

---

## Additional Resources

- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html)
- [Express.js Production Checklist](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Railway Deployment Guide](https://docs.railway.app)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## Support

For issues:
1. Check logs: `docker logs <container-id>` or platform logs
2. Verify environment variables
3. Test locally first
4. Check GitHub issues
5. Contact support team

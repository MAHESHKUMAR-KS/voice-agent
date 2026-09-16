# Quick Deployment Guide (5 Minutes)

## Ports
- Frontend: **9040**
- Backend: **9045**
- Local URL: `http://localhost:9045`

## Choose Your Platform

### 🚀 **RECOMMENDED: Railway (Easiest)**

**Cost:** $5/month | **Setup Time:** 5 minutes

#### Steps:

1. **Sign up at Railway.app** (GitHub login)

2. **Create new project:**
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Select the root directory

3. **Add environment variables:**
   - Click "Add Variable"
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = (Railway will provide a domain, e.g., `https://voice-rag-xyz.up.railway.app`)
   - `PORT` = `5000`

4. **Deploy:**
   - Railway auto-detects Dockerfile
   - Click "Deploy"
   - Done! Your site is live

5. **Get your URL:**
   - Dashboard → Domains
   - Copy public URL
   - Share with team

---

### 🐳 **Docker (Self-Hosted)**

**Cost:** Hosting cost only | **Setup Time:** 10 minutes

#### Local Testing:

```bash
# Navigate to project root
cd D:\Funnel sites\Voice-Agent-funnel

# Create .env file
cp backend/.env.example backend/.env

# Edit if needed (optional for local testing)
# nano backend/.env

# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Access at http://localhost:5000
```

#### Deploy to Cloud:

```bash
# Build image
docker build -t voice-rag-funnel:latest .

# Push to Docker Hub
docker login
docker tag voice-rag-funnel:latest yourusername/voice-rag-funnel:latest
docker push yourusername/voice-rag-funnel:latest

# Deploy to any server with Docker:
# ssh user@server.com
# docker run -p 5000:5000 \
#   -e CORS_ORIGIN=https://yourdomain.com \
#   yourusername/voice-rag-funnel:latest
```

---

### ⚡ **Vercel + Railway (Advanced)**

Frontend on Vercel, Backend on Railway

#### Frontend (Vercel):

1. Sign up at vercel.com (GitHub)
2. Import project
3. Root directory: `frontend`
4. Add env: `VITE_API_URL=https://your-backend.railway.app`
5. Deploy

#### Backend (Railway):

1. Follow Railway steps above
2. Add env: `CORS_ORIGIN=https://your-vercel-domain.vercel.app`

---

## Testing After Deployment

### 1. Check Health
```bash
curl https://yourdomain.com/health
# Should return: {"status":"OK","timestamp":"..."}
```

### 2. Test Form Submission
```bash
curl -X POST https://yourdomain.com/api/leads \
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
# Should return: {"success":true,"message":"Lead successfully captured","leadId":1}
```

### 3. Visit Website
- Open https://yourdomain.com in browser
- Fill form
- Submit
- Should see "Sandbox Access Unlocked" message
- Video should auto-play

### 4. Verify Database
```bash
# Via Railway dashboard or SSH
cat voice_leads.db
# Should contain your test lead
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Form submitting but page doesn't change | Check CORS_ORIGIN matches your domain |
| Demo video not playing | Video file was included in build (should work) |
| Page shows "Frontend not found" | Rebuild frontend: `cd frontend && npm run build` |
| Database not saving | Check `/app/data` directory exists and has permissions |

---

## Environment Variables Needed

### Railway Auto-Detects:
- PORT → 5000
- NODE_ENV → production

### You Must Set:
- **CORS_ORIGIN** → Your frontend domain
  ```
  https://voice-rag-prod.up.railway.app
  ```

- **Optional - Frontend:**
  - VITE_API_URL → Your backend URL

---

## Next: Custom Domain

### Railway:
1. Dashboard → Domains
2. Add custom domain (your-company.com)
3. Update DNS records (CNAME)
4. Auto SSL certificate ✓

### Vercel:
1. Settings → Domains
2. Add your domain
3. Update DNS
4. Auto SSL certificate ✓

---

## Monitoring

### Check Logs:
```bash
# Railway: Dashboard → Logs
# Docker: docker-compose logs -f

# Expected on startup:
# 🚀 Backend server running on http://localhost:5000
# 🌍 Environment: production
# 🔒 CORS Origin: https://yourdomain.com
```

### Daily Checklist:
- [ ] Website loads
- [ ] Form accepts submissions
- [ ] Video plays after submit
- [ ] No errors in logs

---

## Database Backup

### Automatic (Recommended):

Set up cron job on your server:
```bash
0 2 * * * tar -czf /backups/leads-$(date +\%Y\%m\%d).tar.gz /app/data/voice_leads.db
```

### Manual:
```bash
# Download via Railway dashboard
# Or SSH: scp user@server:/app/data/voice_leads.db ./backup-$(date +%Y%m%d).tar.gz
```

---

## Cost Calculator

| Service | Tier | Cost |
|---------|------|------|
| Railway | Basic | $5/month |
| Domain | .com | $12/year |
| CDN | Optional | $0-20/month |
| **Total** | **Minimal** | **$5-25/month** |

---

## Success Checklist

- [ ] Site deployed and live
- [ ] Domain configured
- [ ] CORS working
- [ ] Form submissions saving
- [ ] Demo video playing
- [ ] Database backed up
- [ ] Monitoring enabled
- [ ] Team invited to dashboard

---

## Support

**Stuck?** Check:
1. Logs: `docker-compose logs -f`
2. DEPLOYMENT.md: Detailed guide
3. README-PRODUCTION.md: Features & API docs
4. Health endpoint: `/health`

**Need help?** Get deployment logs:
```bash
# Railway: Copy from dashboard
# Docker: docker-compose logs > deploy-log.txt
# Share logs for debugging
```

---

**Deployed! 🎉**

Your funnel is now live and collecting leads.

Next step: Share with marketing team!

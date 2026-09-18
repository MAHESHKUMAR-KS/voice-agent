# Voice RAG Funnel - Production Deployment Guide

## Quick Start

### Option A: Docker (Recommended)
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit .env with your settings
nano backend/.env

# Run with Docker Compose
docker-compose up -d

# Access at http://localhost:5000
```

### Option B: Railway (Easiest)
1. Push to GitHub
2. Connect repo to Railway.app
3. Set environment variables
4. Deploy automatically

### Option C: Traditional Server
```bash
cd backend && npm install && npm run build && npm start
cd ../frontend && npm install && npm run build
# Serve frontend/dist with nginx or apache
```

---

## Environment Setup

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Project Structure

```
voice-rag-funnel/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── App.tsx          # Main app
│   │   └── index.css        # Global styles
│   ├── dist/                # Production build
│   └── package.json
├── backend/                 # Express.js
│   ├── server.ts            # Main server
│   ├── voice_leads.db       # Database (auto-created)
│   └── package.json
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose
└── DEPLOYMENT.md            # Deployment guide
```

---

## Features

✅ **10-Section Conversion Funnel**
- Hero with outcome badge
- Client logos (social proof)
- Problem section
- Use case tabs
- How it works
- Testimonials
- Comparison table
- Form section (2-column layout)
- FAQ accordion
- Sticky CTA button

✅ **Smart Form**
- 6 input fields
- Work email validation (blocks personal emails)
- Country-based phone input
- "Other" option with custom text input
- Real-time validation

✅ **File-based Database**
- Auto-initialization
- JSON storage
- No external dependencies

✅ **Gated Demo Video**
- Shows only after form submission
- Embedded video player

✅ **Responsive Design**
- Mobile optimized
- Tablet friendly
- Desktop enhanced

---

## Key API Endpoints

### Submit Lead
```http
POST /api/leads
Content-Type: application/json

{
  "full_name": "John Doe",
  "work_email": "john@company.com",
  "job_title": "VP Support",
  "company_name": "Acme Corp",
  "use_case": "Field Support",
  "other_use_case": "",
  "phone": "+919876543210"
}

Response 201:
{
  "success": true,
  "message": "Lead successfully captured",
  "leadId": 1
}
```

### Get All Leads (Debug)
```http
GET /api/leads

Response:
{
  "success": true,
  "count": 5,
  "leads": [...]
}
```

### Health Check
```http
GET /health

Response:
{
  "status": "OK",
  "timestamp": "2024-09-16T..."
}
```

---

## Database

### Automatic Initialization
- File: `voice_leads.db` (in root or data directory)
- Format: JSON
- Auto-created on first API call

### Data Structure
```json
{
  "leads": [
    {
      "id": 1,
      "full_name": "John Doe",
      "work_email": "john@company.com",
      "job_title": "VP Support",
      "company_name": "Acme Corp",
      "use_case": "Field Support",
      "other_use_case": "",
      "phone": "+919876543210",
      "created_at": "2024-09-16T..."
    }
  ],
  "lastId": 1
}
```

### Backup Strategy
```bash
# Daily backup
0 2 * * * tar -czf backup-$(date +\%Y\%m\%d).tar.gz voice_leads.db
```

---

## Validation Rules

### Email Validation
**Blocked Domains:**
- gmail.com, yahoo.com, outlook.com
- hotmail.com, aol.com, protonmail.com
- mail.com, yandex.com, inbox.com
- icloud.com, fastmail.com, tutanota.com
- 163.com, qq.com, sina.com

**Accepted:** Any other domain (john@company.com ✓)

### Phone Format
- International format with dial code
- Numbers only after dial code
- Examples:
  - +91 9876543210 (India)
  - +1 2025551234 (USA)
  - +44 2071838750 (UK)

### Use Case
- **Options:** Field Support, Healthcare, Customer Care, Internal SOP, Other
- **If "Other":** Custom use case text is required

---

## Performance Metrics

### Frontend
- **Bundle Size:** 270KB (gzipped: 81KB)
- **CSS Size:** 10.7KB (gzipped: 3.3KB)
- **Load Time:** <1s (typical)

### Backend
- **Response Time:** <100ms (typical)
- **Database Queries:** Instant (in-memory)

### Lighthouse Score (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## Deployment Platforms

| Platform | Setup Time | Cost | Recommended |
|----------|-----------|------|-------------|
| Railway | 5 min | $5-20/mo | ⭐⭐⭐⭐⭐ |
| Vercel + Heroku | 10 min | Free - $20/mo | ⭐⭐⭐⭐ |
| Docker | 15 min | Varies | ⭐⭐⭐⭐ |
| AWS | 30 min | $10-50/mo | ⭐⭐⭐ |
| Netlify + Render | 10 min | $5-20/mo | ⭐⭐⭐⭐ |

---

## Monitoring

### Health Check
```bash
curl https://yourdomain.com/health
```

### Error Monitoring (Optional)
Add Sentry for error tracking:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### Logs
- Railway: Built-in viewer
- Docker: `docker logs <container>`
- Traditional: Check `/var/log/` or application logs

---

## Security Checklist

- [ ] CORS configured for your domain
- [ ] Environment variables not in git (use .env)
- [ ] SSL/HTTPS enabled
- [ ] Database backups configured
- [ ] Email validation working
- [ ] Rate limiting enabled (optional)
- [ ] Input sanitization applied
- [ ] Security headers set (optional)

---

## Troubleshooting

### Frontend not loading
- Check CORS_ORIGIN in backend .env
- Verify VITE_API_URL in frontend .env
- Check browser console for errors

### Form submission failing
- Verify backend is running
- Check network tab (should show POST to /api/leads)
- Verify email is work email (not gmail, yahoo, etc.)

### Demo video not playing
- Check video file exists: `/asset/Voice Agent_New - Trim.mp4`
- Verify MIME type: video/mp4
- Check browser console

### Database not persisting (Docker)
- Verify volume is mounted: `-v $(pwd)/data:/app/data`
- Check file permissions: `chmod 755 data/`
- Restart container

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Railway | - | $5/mo (includes 5GB disk) |
| Vercel | ✓ Frontend | - |
| Heroku | - | $7/mo |
| AWS | ✓ (1 year free) | $10-50/mo |
| Docker | ✓ (self-hosted) | Hosting cost |

**Total Monthly Cost: $5-20** (depending on platform)

---

## Next Steps

1. **Set Environment Variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit with your values
   ```

2. **Test Locally**
   ```bash
   docker-compose up
   # Visit http://localhost:5000
   ```

3. **Deploy**
   - See DEPLOYMENT.md for step-by-step guide

4. **Monitor**
   - Check health endpoint daily
   - Review leads in database
   - Monitor error logs

5. **Maintain**
   - Backup database weekly
   - Update dependencies monthly
   - Review logs for issues

---

## Support & Resources

- **Issue Tracker:** Check GitHub Issues
- **Documentation:** See DEPLOYMENT.md
- **Example .env:** See .env.example files
- **API Docs:** POST /api/leads endpoint above

---

## License

[Your License Here]

---

**Last Updated:** September 16, 2024
**Status:** Production Ready ✓

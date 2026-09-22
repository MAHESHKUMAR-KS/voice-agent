0# Quick Start Guide

Get the Adople AI Voice Assistant funnel running in 5 minutes.

## Prerequisites

- Node.js v18+ installed
- npm v9+ installed

## Step-by-Step Setup

### 1. Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

This installs:
- express
- cors
- better-sqlite3
- tsx (for TypeScript execution)

### 2. Install Frontend Dependencies

Open a **second terminal** and run:

```bash
cd frontend
npm install
```

This installs:
- react & react-dom
- lucide-react (icons)
- tailwindcss, autoprefixer, postcss
- vite (build tool)

### 3. Start the Backend Server

In the first terminal (backend):

```bash
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:5000
📊 Database: voice_leads.db
✅ Database initialized: voice_leads.db
```

### 4. Start the Frontend Development Server

In the second terminal (frontend):

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Open Your Browser

Navigate to: **http://localhost:5173**

## Testing the Funnel

1. Fill out the lead capture form with test data:
   - Full Name: `Test User`
   - Work Email: `test@example.com`
   - Job Title: `Developer`
   - Company Name: `Test Corp`
   - Target Use Case: Select any option
   - Phone: `+1 555 123 4567`

2. Click "Request Access"

3. You should see a success message: ✅ Request received!

4. Check the backend terminal - you'll see:
   ```
   ✅ New lead captured: Test User (test@example.com) - Test Corp
   ```

## Viewing Leads in Database

To view captured leads, use any SQLite browser or run:

```bash
cd backend
sqlite3 voice_leads.db "SELECT * FROM leads;"
```

## Stopping the Servers

Press `Ctrl + C` in both terminal windows.

## Troubleshooting

**Problem:** Port 5000 already in use  
**Solution:** Change the port in `backend/server.ts` (line 9) and update the fetch URL in `frontend/src/App.tsx` (line 47)

**Problem:** Form shows network error  
**Solution:** Make sure the backend is running on port 5000

**Problem:** Tailwind styles not loading  
**Solution:** Delete `frontend/node_modules` and run `npm install` again

## Next Steps

- Customize the color scheme in `frontend/src/App.tsx`
- Add email notifications in `backend/server.ts`
- Deploy to production (Vercel for frontend, Railway/Render for backend)
- Add form validation and email verification
- Integrate with CRM systems (HubSpot, Salesforce)

## File Structure Reference

```
backend/
├── server.ts          # Main API server
├── voice_leads.db     # SQLite database (auto-created)
└── package.json

frontend/
├── src/
│   ├── App.tsx        # Main component
│   ├── main.tsx       # Entry point
│   └── index.css      # Tailwind CSS
├── index.html
└── package.json
```

Happy lead generation! 🚀

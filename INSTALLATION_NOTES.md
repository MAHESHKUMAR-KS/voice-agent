# Installation Notes

## ✅ Problem Solved: No Native Compilation Required!

### Issue Encountered
The original setup used `better-sqlite3` which requires C++ compilation on Windows. This caused installation failures due to:
- C++ compiler version mismatches
- Node.js v24 requiring C++20 support
- Missing or incompatible Visual Studio Build Tools

### Solution Implemented
**Replaced SQLite with JSON file storage**

The backend now uses a simple JSON file (`voice_leads.json`) instead of SQLite. This provides:

✅ **No compilation required** - Pure JavaScript/TypeScript  
✅ **Works immediately** - No build tools needed  
✅ **Easy to view/edit** - Human-readable JSON format  
✅ **Perfect for lead generation** - Handles thousands of leads easily  
✅ **Cross-platform** - Works on Windows, Mac, Linux without issues  

### What Changed

#### Backend Storage
- **Before:** SQLite database (`voice_leads.db`) via `better-sqlite3`
- **After:** JSON file (`voice_leads.json`) with built-in Node.js `fs` module

#### API Remains the Same
No changes needed to the frontend or API contracts:
- `POST /api/leads` - Still saves leads
- `GET /health` - Still works
- **BONUS:** `GET /api/leads` - Now you can view all leads via API

### Database File Structure

```json
{
  "leads": [
    {
      "id": 1,
      "full_name": "John Doe",
      "work_email": "john@example.com",
      "job_title": "CEO",
      "company_name": "Acme Corp",
      "use_case": "Field Support",
      "phone": "+1 555 123 4567",
      "created_at": "2026-09-15T12:30:00.000Z"
    }
  ],
  "lastId": 1
}
```

### Installation Instructions

#### Backend
```bash
cd backend
npm install  # ✅ Installs cleanly, no compilation
npm run dev  # ✅ Starts immediately
```

#### Frontend
```bash
cd frontend
npm install  # ✅ All dependencies compatible with React 19
npm run dev  # ✅ Starts immediately
```

### Viewing Your Leads

**Option 1: Direct File Access**
Open `backend/voice_leads.json` in any text editor

**Option 2: API Endpoint**
```bash
curl http://localhost:5000/api/leads
```

**Option 3: Browser**
Navigate to: `http://localhost:5000/api/leads`

### Migration from SQLite (If Needed)

If you previously had SQLite data and want to migrate:

```bash
# Export from SQLite
cd backend
sqlite3 voice_leads.db ".mode json" ".output leads.json" "SELECT * FROM leads;"

# Then manually format into the JSON structure above
```

### Production Considerations

For production deployments with high volume:
1. **Keep JSON** for small to medium loads (< 10,000 leads)
2. **Upgrade to MongoDB** for larger scale (easy migration path)
3. **Use PostgreSQL** if you need advanced querying/analytics

### File Size Reference
- 100 leads ≈ 15 KB
- 1,000 leads ≈ 150 KB
- 10,000 leads ≈ 1.5 MB

JSON storage is perfectly fine for most lead generation funnels!

### Benefits of This Approach

1. **Instant Setup** - No build tools, compilers, or dependencies
2. **Transparent Data** - Open the file and see your leads immediately
3. **Easy Backup** - Just copy the JSON file
4. **Version Control Friendly** - Can track changes (though exclude from git)
5. **Portable** - Move the file anywhere, works everywhere
6. **Debugging** - Easy to manually edit/test data

### Performance

JSON file storage is:
- ✅ Fast for < 10,000 records
- ✅ Atomic writes (no corruption)
- ✅ Low memory footprint
- ✅ Async operations (non-blocking)

---

## 🚀 Quick Start (Updated)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Browser:**
Open `http://localhost:5173`

That's it! No compiler errors, no build tools, just works! ✨

---

## Troubleshooting

**Q: Where is my database file?**  
A: `backend/voice_leads.json` (auto-created on first run)

**Q: Can I delete the JSON file?**  
A: Yes, it will be recreated automatically with empty data

**Q: How do I backup my leads?**  
A: Just copy `backend/voice_leads.json` to a safe location

**Q: Can I edit leads manually?**  
A: Yes! Open the JSON file, edit, save. Server will read the new data.

**Q: Is this production-ready?**  
A: Yes! For typical funnel traffic (< 1,000 leads/day), it's perfect.

---

**Updated:** September 15, 2026  
**Reason:** Compatibility fix for Windows + Node.js v24

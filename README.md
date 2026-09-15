# Adople AI Voice Assistant - Lead Generation Funnel

A professional full-stack lead-generation funnel site for the Adople AI Voice Assistant RAG Agent.

## Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **TypeScript** - Type-safe development
- **better-sqlite3** - Local SQLite database for lead storage
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe React components
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **lucide-react** - Beautiful icon library

## Project Structure

```
Voice-Agent-funnel/
├── backend/
│   ├── server.ts              # Express API server
│   ├── package.json
│   ├── tsconfig.json
│   └── voice_leads.db         # SQLite database (auto-created)
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main funnel page component
│   │   ├── main.tsx
│   │   └── index.css          # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.ts
└── README.md
```

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend server will run on **http://localhost:5000**

**Backend Features:**
- SQLite database initialization (`voice_leads.db`)
- `POST /api/leads` - Saves lead form data
- `GET /health` - Health check endpoint

### 2. Frontend Setup

```bash
# Navigate to frontend directory (open a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on **http://localhost:5173** (Vite default)

## Database Schema

The `leads` table is automatically created with the following structure:

```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  use_case TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### POST /api/leads

**Request Body:**
```json
{
  "full_name": "John Doe",
  "work_email": "john@company.com",
  "job_title": "VP of Engineering",
  "company_name": "Acme Corporation",
  "use_case": "Field Support",
  "phone": "+1 (555) 123-4567"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead successfully captured",
  "leadId": 1
}
```

**Response (400 - Validation Error):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

## Running the Full Stack

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs on `http://localhost:5173`

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Features

### User Experience
✅ Sticky announcement bar with call-to-action  
✅ Professional two-column responsive layout  
✅ Animated microphone icon for "Live Audio Sandbox"  
✅ Feature checklist with icons  
✅ Pain points section highlighting solutions  
✅ Fully validated lead capture form  
✅ Real-time form submission with loading states  
✅ Success message after form submission  
✅ Error handling for network issues  

### Design
- **Color Scheme:** Enterprise Dark Blue (slate-900) with Amber/Orange CTAs
- **Color Scheme:** Enterprise Dark Blue (slate-900) with Amber/Orange CTAs
- **Typography:** System fonts with excellent readability
- **Animations:** Pulse effects on key elements
- **Responsive:** Mobile-first design, works on all screen sizes

## Development Commands

### Backend
```bash
npm run dev      # Development with hot reload (tsx watch)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment

- **Node.js:** v18+ recommended
- **npm:** v9+ recommended

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# The dist/ folder contains production-ready files
```

## Troubleshooting

**Issue:** Form submission fails  
**Solution:** Ensure the backend server is running on port 5000

**Issue:** CORS errors  
**Solution:** The backend has CORS enabled. Check your backend console logs

**Issue:** Database not created  
**Solution:** The database is auto-created on first run. Check the backend directory for `voice_leads.db`

## License

MIT

## Author

Built with Claude Code
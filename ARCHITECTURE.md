# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Request (Form Data)
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
├─────────────────────────────────────────────────────────────┤
│  - App.tsx (Main Component)                                  │
│  - Form Validation                                           │
│  - State Management (useState)                               │
│  - API Integration (fetch)                                   │
│  - UI Components (Tailwind CSS + lucide-react)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ POST /api/leads
                           │ Content-Type: application/json
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Express + TypeScript)                │
│                    http://localhost:9045                     │
├─────────────────────────────────────────────────────────────┤
│  Routes:                                                     │
│  - POST /api/leads  → Save lead data                        │
│  - GET  /health     → Health check                          │
│                                                              │
│  Middleware:                                                 │
│  - CORS (Cross-Origin Resource Sharing)                     │
│  - express.json() (JSON body parser)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ SQL INSERT
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE (SQLite)                           │
│                    voice_leads.db                            │
├─────────────────────────────────────────────────────────────┤
│  Table: leads                                                │
│  ┌────────────────┬──────────┬──────────────┐              │
│  │ Column         │ Type     │ Constraints  │              │
│  ├────────────────┼──────────┼──────────────┤              │
│  │ id             │ INTEGER  │ PRIMARY KEY  │              │
│  │ full_name      │ TEXT     │ NOT NULL     │              │
│  │ work_email     │ TEXT     │ NOT NULL     │              │
│  │ job_title      │ TEXT     │ NOT NULL     │              │
│  │ company_name   │ TEXT     │ NOT NULL     │              │
│  │ use_case       │ TEXT     │ NOT NULL     │              │
│  │ phone          │ TEXT     │ NOT NULL     │              │
│  │ created_at     │ DATETIME │ DEFAULT NOW  │              │
│  └────────────────┴──────────┴──────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Interaction Flow

```
User fills form → Form validation → Submit button clicked
         ↓
   handleSubmit() triggered
         ↓
   setIsSubmitting(true)
         ↓
   fetch('http://localhost:9045/api/leads', {...})
         ↓
   Backend receives request
         ↓
   Validate required fields
         ↓
   Insert into SQLite database
         ↓
   Return response (201 Created)
         ↓
   Frontend receives response
         ↓
   setIsSuccess(true)
         ↓
   Display success message
```

## Tech Stack Details

### Frontend Technologies

| Technology     | Version | Purpose                          |
|----------------|---------|----------------------------------|
| React          | 19.2.8  | UI Library                       |
| TypeScript     | 6.0.2   | Type Safety                      |
| Vite           | 8.3.0   | Build Tool & Dev Server         |
| Tailwind CSS   | 3.4.1   | Utility-First CSS Framework     |
| lucide-react   | 0.344.0 | Icon Library                    |

### Backend Technologies

| Technology       | Version | Purpose                        |
|------------------|---------|--------------------------------|
| Node.js          | 18+     | Runtime Environment           |
| Express          | 4.18.2  | Web Framework                 |
| TypeScript       | 5.3.3   | Type Safety                   |
| better-sqlite3   | 9.2.2   | SQLite Database Driver        |
| CORS             | 2.8.5   | Cross-Origin Resource Sharing |
| tsx              | 4.7.0   | TypeScript Execution          |

## Component Architecture

### Frontend Component Tree

```
<App>
  ├── Announcement Bar (Sticky)
  │   └── Zap Icon + Text
  │
  ├── Main Content (Grid Layout)
  │   │
  │   ├── LEFT COLUMN (Hero & Pitch)
  │   │   ├── Badge (VOICE-FIRST ENTERPRISE AI)
  │   │   ├── Headline
  │   │   ├── Subheadline
  │   │   ├── Feature Checklist (4 items)
  │   │   │   └── CheckCircle2 Icons
  │   │   └── Pain Points Box
  │   │       ├── Clock Icon
  │   │       ├── Users Icon
  │   │       └── Shield Icon
  │   │
  │   └── RIGHT COLUMN (Demo & Form)
  │       ├── Live Audio Sandbox (Mic Icon)
  │       └── Lead Capture Form
  │           ├── Form Fields (6 inputs)
  │           ├── Submit Button (with loading state)
  │           └── Success Message (conditional)
  │
  └── Footer
```

## API Contract

### POST /api/leads

**Request:**
```typescript
interface LeadRequest {
  full_name: string;      // Required
  work_email: string;     // Required, email format
  job_title: string;      // Required
  company_name: string;   // Required
  use_case: string;       // Required, one of: Field Support, Healthcare, Customer Care, Internal SOP
  phone: string;          // Required
}
```

**Response (Success):**
```typescript
interface LeadResponse {
  success: true;
  message: "Lead successfully captured";
  leadId: number;
}
```

**Response (Error):**
```typescript
interface ErrorResponse {
  success: false;
  message: string;
}
```

## State Management

### Frontend State

```typescript
// Form Data State
const [formData, setFormData] = useState<FormData>({
  full_name: '',
  work_email: '',
  job_title: '',
  company_name: '',
  use_case: '',
  phone: ''
});

// UI State
const [isSubmitting, setIsSubmitting] = useState(false);  // Loading state
const [isSuccess, setIsSuccess] = useState(false);        // Success state
const [error, setError] = useState('');                   // Error state
```

## Security Features

✅ **Input Validation** - All fields required on both frontend and backend  
✅ **Type Safety** - TypeScript interfaces for all data structures  
✅ **CORS Protection** - Configured for secure cross-origin requests  
✅ **SQL Injection Prevention** - Parameterized queries with better-sqlite3  
✅ **Error Handling** - Graceful error messages without exposing internals  

## Performance Considerations

- **Fast Build Times** - Vite's lightning-fast HMR
- **Optimized Bundle** - Tree-shaking with Vite
- **Local Database** - SQLite for minimal latency
- **Connection Pooling** - better-sqlite3 handles connections efficiently

## Deployment Architecture (Future)

```
Frontend (Vercel/Netlify)
    ↓
CDN Edge Caching
    ↓
API Gateway
    ↓
Backend (Railway/Render/Fly.io)
    ↓
Managed SQLite or PostgreSQL
```

## Scaling Considerations

When scaling beyond local development:

1. **Database:** Migrate from SQLite to PostgreSQL/MySQL
2. **Backend:** Add Redis for session management
3. **Frontend:** Deploy to CDN (Vercel, Netlify)
4. **Monitoring:** Add application performance monitoring (APM)
5. **Analytics:** Integrate Google Analytics or Mixpanel
6. **Email:** Add SendGrid/Mailgun for email notifications

## Directory Structure

```
Voice-Agent-funnel/
│
├── backend/                    # Backend API
│   ├── server.ts              # Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── voice_leads.db         # SQLite database (auto-created)
│
├── frontend/                   # Frontend React App
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Tailwind CSS
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── README.md                   # Main documentation
├── QUICKSTART.md              # Quick start guide
├── ARCHITECTURE.md            # This file
└── .gitignore
```

## Key Design Decisions

1. **SQLite over PostgreSQL** - Simpler setup for development, easy to migrate later
2. **Tailwind CSS over styled-components** - Faster development, smaller bundle size
3. **Vite over Create React App** - Significantly faster build times
4. **TypeScript** - Type safety reduces runtime errors
5. **Single Page Application** - Better user experience, no page reloads
6. **Separate Frontend/Backend** - Clean separation of concerns, easier to scale

## Environment Variables (Future Enhancement)

For production deployment, consider:

```bash
# Backend (.env)
PORT=9045
DATABASE_URL=file:./voice_leads.db
CORS_ORIGIN=https://your-frontend.com
SENDGRID_API_KEY=xxx

# Frontend (.env)
VITE_API_URL=https://your-backend.com
VITE_GA_TRACKING_ID=xxx
```

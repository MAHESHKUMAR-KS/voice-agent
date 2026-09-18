import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '9045', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:9040';
const NODE_ENV = process.env.NODE_ENV || 'development';

app.get('/', (req: Request, res: Response) => {
  res.json({ service: 'Voice Agent Funnel Backend', status: 'online', port: PORT });
});

const allowedOrigins = [
  'http://13.201.92.234:9040',
  'http://13.201.92.234:9045',
  'http://localhost:9040',
  'http://localhost:9045',
  'http://127.0.0.1:9040',
  'http://127.0.0.1:9045'
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('13.201.92.234') || origin === CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Serve static files from frontend dist in production
if (NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
}

// Database file path - use /app/data if in Docker, otherwise current directory
const dataDir = process.env.DATA_DIR || __dirname;
const DB_FILE = path.join(dataDir, 'voice_leads.db');

// Lead interface
interface Lead {
  id: number;
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  other_use_case: string;
  phone: string;
  created_at: string;
}

interface Database {
  leads: Lead[];
  lastId: number;
}

// Personal email domains to reject
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
  'protonmail.com', 'mail.com', 'yandex.com', 'inbox.com', 'icloud.com',
  'fastmail.com', 'tutanota.com', '163.com', 'qq.com', 'sina.com'
];

// Check if email is a work email
function isWorkEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_EMAIL_DOMAINS.includes(domain);
}

// Initialize database file
async function initDatabase(): Promise<Database> {
  if (!existsSync(DB_FILE)) {
    const initialData: Database = { leads: [], lastId: 0 };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Database initialized: voice_leads.db');
    return initialData;
  }

  const data = await fs.readFile(DB_FILE, 'utf-8');
  console.log('✅ Database loaded: voice_leads.db');
  return JSON.parse(data);
}

// Read database
async function readDatabase(): Promise<Database> {
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write database
async function writeDatabase(db: Database): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

// API Routes
interface LeadData {
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  other_use_case: string;
  phone: string;
}

app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { full_name, work_email, job_title, company_name, use_case, other_use_case, phone }: LeadData = req.body;

    // Validate required fields
    if (!full_name || !work_email || !job_title || !company_name || !use_case || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // If use_case is "Other", validate other_use_case is provided
    if (use_case === 'Other' && !other_use_case) {
      return res.status(400).json({
        success: false,
        message: 'Please specify your use case'
      });
    }

    const trimmedEmail = work_email.trim().toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate work email (reject personal emails)
    if (!isWorkEmail(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please use a work email address, not a personal email (gmail, yahoo, outlook, etc.)'
      });
    }

    // Read current database
    const db = await readDatabase();

    // Create new lead
    const newLead: Lead = {
      id: db.lastId + 1,
      full_name,
      work_email: trimmedEmail,
      job_title,
      company_name,
      use_case,
      other_use_case: use_case === 'Other' ? other_use_case : '',
      phone,
      created_at: new Date().toISOString()
    };

    // Add to database
    db.leads.push(newLead);
    db.lastId = newLead.id;

    // Save database
    await writeDatabase(db);

    console.log(`✅ New lead captured: ${full_name} (${trimmedEmail}) - ${company_name} - ${phone}`);

    res.status(201).json({
      success: true,
      message: 'Lead successfully captured',
      leadId: newLead.id
    });
  } catch (error) {
    console.error('❌ Error saving lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save lead data'
    });
  }
});

// Get all leads (optional - for debugging)
app.get('/api/leads', async (req: Request, res: Response) => {
  try {
    const db = await readDatabase();
    res.json({
      success: true,
      count: db.leads.length,
      leads: db.leads
    });
  } catch (error) {
    console.error('❌ Error reading leads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read leads'
    });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// SPA catch-all route (serve index.html for all non-API routes in production)
if (NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    if (existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'Frontend not found. Build frontend with: npm run build' });
    }
  });
}

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${DB_FILE}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔒 CORS Origin: ${CORS_ORIGIN}`);
  });
}).catch((error) => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});

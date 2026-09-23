import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '9045', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:9040';
const NODE_ENV = process.env.NODE_ENV || 'development';

// PostgreSQL Pool Configuration - Neon Database
const pool = new Pool({
  host: process.env.CENTRAL_DB_HOST,
  port: parseInt(process.env.CENTRAL_DB_PORT || '5432', 10),
  database: process.env.CENTRAL_DB_NAME,
  user: process.env.CENTRAL_DB_USER,
  password: process.env.CENTRAL_DB_PASSWORD,
  ssl: process.env.CENTRAL_DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL (Neon) database');
});

pool.on('error', (err) => {
  console.error('⚠️ Unexpected error on idle client:', err.message);
});

app.get('/', (req: Request, res: Response) => {
  res.json({ service: 'Voice Agent Funnel Backend', status: 'online', port: PORT });
});

const envOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const envSubdomain = process.env.SUBDOMAIN;
const envPublicUrl = process.env.PUBLIC_URL;

const allowedOrigins = [
  ...envOrigins,
  ...(envPublicUrl ? [envPublicUrl] : []),
  ...(envSubdomain ? [`https://${envSubdomain}`, `http://${envSubdomain}`] : []),
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
    if (!origin || allowedOrigins.includes(origin) || origin.includes('13.201.92.234') || (envSubdomain && origin.includes(envSubdomain)) || origin.includes('adople.in') || origin === CORS_ORIGIN) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
}));
app.use(express.json());

// API Key Validation Middleware for POST /api/leads
app.use('/api/leads', (req: Request, res: Response, next) => {
  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.VITE_FUNNEL_API_KEY || process.env.FUNNEL_API_KEY || 'sk_live_voiceagen_5c0e8f57954825660d9480fecd85bb4ac045d14a659e064c';

    if (!validApiKey) {
      console.error('❌ VITE_FUNNEL_API_KEY not configured in .env');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!apiKey) {
      console.warn('❌ Request rejected: Missing X-API-Key header');
      return res.status(401).json({ error: 'Unauthorized: Missing X-API-Key header' });
    }

    if (apiKey !== validApiKey) {
      console.warn(`❌ Request rejected: Invalid API key received`);
      return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }

    console.log('✅ API Key validated successfully');
  }
  next();
});

// Serve static files from frontend dist in production
if (NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
}

// Lead interface
interface Lead {
  id: number;
  funnel_id: string;
  funnel_source: string;
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  other_use_case: string;
  phone: string;
  created_at: string;
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

// Initialize database schema (Centralized leads table)
async function initDatabaseSchema(): Promise<void> {
  try {
    // Create centralized leads table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        funnel_id VARCHAR(100) NOT NULL,
        funnel_source VARCHAR(100) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        job_title VARCHAR(255),
        use_case TEXT,
        message TEXT,
        campaign VARCHAR(255),
        status VARCHAR(50) DEFAULT 'New',
        source_url TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        raw_payload JSONB DEFAULT '{}'::jsonb
      )
    `;
    await pool.query(createTableSQL);
    console.log('✅ Centralized leads table created or verified.');

    // Create indexes separately
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_funnel_id ON leads(funnel_id)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company)`);

    console.log('✅ Database schema verified and initialized.');
  } catch (err) {
    console.error('❌ Error executing database schema:', err);
  }
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

    // Insert into centralized PostgreSQL leads table
    const sql = `
      INSERT INTO leads (
        funnel_id, funnel_source, full_name, email, phone, company,
        job_title, use_case, message, status, ip_address, raw_payload
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const result = await pool.query(sql, [
      'voice-agent',
      'Voice Agent',
      full_name.trim(),
      trimmedEmail,
      phone.trim(),
      company_name.trim(),
      job_title.trim(),
      use_case,
      use_case === 'Other' ? other_use_case : '',
      'New',
      clientIp,
      JSON.stringify(req.body)
    ]);

    const leadId = result.rows[0].id;

    console.log(`✅ New lead captured: ${full_name} (${trimmedEmail}) - ${company_name} - ${phone}`);

    res.status(201).json({
      success: true,
      message: 'Lead successfully captured',
      leadId: leadId
    });
  } catch (error) {
    console.error('❌ Error saving lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save lead data'
    });
  }
});

// Get all leads for this funnel (optional - for debugging)
app.get('/api/leads', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM leads WHERE funnel_id = $1 ORDER BY created_at DESC',
      ['voice_agent']
    );

    res.json({
      success: true,
      count: result.rows.length,
      leads: result.rows
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
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'Frontend not found. Build frontend with: npm run build' });
    }
  });
}

// Start server
initDatabaseSchema().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Database: PostgreSQL (Neon) - ${process.env.CENTRAL_DB_NAME}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔒 CORS Origin: ${CORS_ORIGIN}`);
  });
}).catch((error) => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});

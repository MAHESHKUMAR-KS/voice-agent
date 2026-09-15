import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JSON Database file path
const DB_FILE = path.join(__dirname, 'voice_leads.json');

// Lead interface
interface Lead {
  id: number;
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  phone: string;
  created_at: string;
}

interface Database {
  leads: Lead[];
  lastId: number;
}

// Initialize JSON database
async function initDatabase(): Promise<Database> {
  if (!existsSync(DB_FILE)) {
    const initialData: Database = { leads: [], lastId: 0 };
    await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2));
    console.log('✅ Database initialized: voice_leads.json');
    return initialData;
  }

  const data = await fs.readFile(DB_FILE, 'utf-8');
  console.log('✅ Database loaded: voice_leads.json');
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
  phone: string;
}

app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const { full_name, work_email, job_title, company_name, use_case, phone }: LeadData = req.body;

    // Validate required fields
    if (!full_name || !work_email || !job_title || !company_name || !use_case || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Read current database
    const db = await readDatabase();

    // Create new lead
    const newLead: Lead = {
      id: db.lastId + 1,
      full_name,
      work_email,
      job_title,
      company_name,
      use_case,
      phone,
      created_at: new Date().toISOString()
    };

    // Add to database
    db.leads.push(newLead);
    db.lastId = newLead.id;

    // Save database
    await writeDatabase(db);

    console.log(`✅ New lead captured: ${full_name} (${work_email}) - ${company_name}`);

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

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Database: voice_leads.json`);
  });
}).catch((error) => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});

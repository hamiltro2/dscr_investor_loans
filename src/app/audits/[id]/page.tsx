import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import AuditClientPage from './AuditClientPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AuditPage({ params }: PageProps) {
  const { id } = await params;
  
  // Resolve path to config/leads.json
  const leadsPath = path.join(process.cwd(), 'config', 'leads.json');
  
  if (!fs.existsSync(leadsPath)) {
    return notFound();
  }
  
  // Read leads file
  let leads = [];
  try {
    leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  } catch (err) {
    console.error('Error parsing leads.json:', err);
    return notFound();
  }
  
  // Find matching lead
  const lead = leads.find((l: any) => l.id === id);
  
  if (!lead) {
    return notFound();
  }
  
  return <AuditClientPage lead={lead} />;
}

import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import RescueClientPage from './RescueClientPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RescuePage({ params }: PageProps) {
  const { id } = await params;

  const rescuePath = path.join(process.cwd(), 'config', 'rescue-leads.json');
  if (!fs.existsSync(rescuePath)) {
    return notFound();
  }

  let leads = [];
  try {
    leads = JSON.parse(fs.readFileSync(rescuePath, 'utf8'));
  } catch (err) {
    console.error('Error parsing rescue-leads.json:', err);
    return notFound();
  }

  const lead = leads.find((l: any) => l.id === id);
  if (!lead) {
    return notFound();
  }

  return <RescueClientPage lead={lead} allLeads={leads} />;
}

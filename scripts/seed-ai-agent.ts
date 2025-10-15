/**
 * Seed script for AI Loan Agent
 * Creates test leads for development/testing
 */

import { PrismaClient, ProductType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.event.deleteMany();
  await prisma.interaction.deleteMany();
  await prisma.lead.deleteMany();

  // Create test leads
  const testLeads = [
    {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-0101',
      channel: 'web_chat',
      productType: 'fix_flip' as ProductType,
      address: '456 Ocean Ave',
      city: 'San Diego',
      state: 'CA',
      zip: '92101',
      propertyType: 'SFR',
      loanAmountRequested: 350000,
      rehabBudget: 80000,
      arv: 600000,
      timeline: '30-days',
      exitStrategy: 'sell',
      consentGiven: true,
      consentAt: new Date(),
      score: 78,
      status: 'qualified' as const,
      offer: {
        productType: 'fix_flip',
        amountRange: [315000, 350000],
        rateRange: [10.5, 12.5],
        termMonths: 6,
        balloon: true,
        ltvApprox: 58.3,
      },
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '555-0102',
      channel: 'web_chat',
      productType: 'dscr' as ProductType,
      address: '789 Main St',
      city: 'Sacramento',
      state: 'CA',
      zip: '95814',
      propertyType: 'Multi-Family',
      loanAmountRequested: 500000,
      rentalIncome: 6500,
      dscrInputs: {
        monthlyTaxes: 500,
        monthlyInsurance: 300,
        monthlyHOA: 0,
        proposedRate: 0.08,
      },
      timeline: '60-days',
      exitStrategy: 'hold',
      consentGiven: true,
      consentAt: new Date(),
      score: 72,
      status: 'qualified' as const,
      offer: {
        productType: 'dscr',
        amountRange: [475000, 500000],
        rateRange: [5.99, 7.25],
        termMonths: 360,
        balloon: false,
        ltvApprox: 70,
        dscrApprox: 1.32,
      },
    },
    {
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '555-0103',
      channel: 'web_chat',
      productType: 'hard_money' as ProductType,
      address: '123 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      propertyType: 'SFR',
      loanAmountRequested: 400000,
      timeline: 'urgent',
      exitStrategy: 'refinance',
      consentGiven: true,
      consentAt: new Date(),
      score: 65,
      status: 'follow_up' as const,
      notes: 'Needs quick funding for auction purchase',
    },
  ];

  for (const leadData of testLeads) {
    const lead = await prisma.lead.create({
      data: leadData,
    });

    // Create sample interaction
    await prisma.interaction.create({
      data: {
        leadId: lead.id,
        role: 'assistant',
        content: {
          message: 'Welcome to AI loan pre-qualification!',
        },
      },
    });

    console.log(`✅ Created lead: ${lead.name}`);
  }

  console.log('✅ Seeding complete!');
  console.log(`   Created ${testLeads.length} test leads`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

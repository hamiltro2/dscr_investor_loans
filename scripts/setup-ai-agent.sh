#!/bin/bash

# AI Loan Agent Setup Script
# Run this after setting up .env.local

echo "🚀 Setting up AI Loan Agent..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "🗄️ Running database migrations..."
npx prisma migrate dev --name init

# Seed database (optional)
echo "🌱 Seeding database with test data..."
npx ts-node scripts/seed-ai-agent.ts

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start dev server: npm run dev"
echo "2. Open http://localhost:3000"
echo "3. Click the chat bubble (bottom-right)"
echo "4. Test the AI agent!"
echo ""
echo "📚 See AI_LOAN_AGENT_README.md for full documentation"

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('hard_money', 'dscr', 'fix_flip', 'balloon_refi', 'note_finance');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'qualified', 'follow_up', 'disqualified', 'closed_won', 'closed_lost');

-- CreateEnum
CREATE TYPE "InteractionRole" AS ENUM ('user', 'assistant', 'tool', 'system');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('alert_sales', 'doc_request', 'schedule', 'crm_webhook', 'enrichment_complete', 'score_update');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "channel" TEXT,
    "productType" "ProductType" NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "propertyType" TEXT,
    "loanAmountRequested" DECIMAL(65,30),
    "timeline" TEXT,
    "exitStrategy" TEXT,
    "rehabBudget" DECIMAL(65,30),
    "arv" DECIMAL(65,30),
    "currentMortgageInfo" JSONB,
    "rentalIncome" DECIMAL(65,30),
    "dscrInputs" JSONB,
    "enrichment" JSONB,
    "sourceCitations" JSONB,
    "notes" TEXT,
    "score" DOUBLE PRECISION,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "offer" JSONB,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentAt" TIMESTAMP(3),

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT NOT NULL,
    "role" "InteractionRole" NOT NULL,
    "content" JSONB NOT NULL,
    "tokens" INTEGER,
    "toolName" TEXT,
    "toolInput" JSONB,
    "toolOutput" JSONB,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_productType_idx" ON "Lead"("productType");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_phone_idx" ON "Lead"("phone");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Interaction_leadId_createdAt_idx" ON "Interaction"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_leadId_createdAt_idx" ON "Event"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_type_createdAt_idx" ON "Event"("type", "createdAt");

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

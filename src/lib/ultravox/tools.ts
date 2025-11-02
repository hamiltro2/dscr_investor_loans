/**
 * Ultravox Tool Definitions
 * Defines the functions Cap can call during voice conversations
 */

export interface UltravoxTool {
  temporaryTool?: {
    modelToolName: string;
    description: string;
    dynamicParameters: Array<{
      name: string;
      location: string;
      schema: any;
      required: boolean;
    }>;
    http?: {
      baseUrlPattern: string;
      httpMethod: string;
    };
  };
}

export function getCapTools(baseUrl: string): UltravoxTool[] {
  return [
    // Tool 1: Search Knowledge Base
    {
      temporaryTool: {
        modelToolName: 'searchKnowledgeBase',
        description: 'Search Capital Bridge Solutions knowledge base for detailed information about DSCR loans, requirements, rates, property types, and lending criteria. Use this FIRST when investors ask questions about loans, rates, or requirements.',
        dynamicParameters: [
          {
            name: 'query',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Search query (e.g., "620 credit score requirements", "Airbnb DSCR loans", "portfolio loan rates")'
            },
            required: true
          },
          {
            name: 'topK',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Number of results to return (default: 3)'
            },
            required: false
          }
        ],
        http: {
          baseUrlPattern: `${baseUrl}/api/knowledge-search`,
          httpMethod: 'POST'
        }
      }
    },

    // Tool 2: Perplexity Search (Property Research)
    {
      temporaryTool: {
        modelToolName: 'perplexitySearch',
        description: 'REQUIRED when user mentions ANY property address! Immediately call this to get property details: listing price, bedrooms, bathrooms, square feet, rental comps, and market value. Also use for market research questions. Do not ask follow-up questions - call this function to find the information.',
        dynamicParameters: [
          {
            name: 'query',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'For property addresses: "Property details for [FULL ADDRESS] listing price bedrooms bathrooms square feet rental comps market value". For market questions: "rental rates in [city] for [property type]"'
            },
            required: true
          }
        ],
        http: {
          baseUrlPattern: `${baseUrl}/api/perplexity-search`,
          httpMethod: 'POST'
        }
      }
    },

    // Tool 3: Analyze Deal
    {
      temporaryTool: {
        modelToolName: 'analyzeDeal',
        description: 'Analyze investment property deal with comprehensive DSCR calculation, cash flow analysis, and ROI projections. Use when you have property numbers: purchase price, monthly rent, and down payment.',
        dynamicParameters: [
          {
            name: 'purchasePrice',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Property purchase price in dollars'
            },
            required: true
          },
          {
            name: 'monthlyRent',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Expected monthly rental income in dollars'
            },
            required: true
          },
          {
            name: 'downPaymentPercent',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Down payment percentage (e.g., 25 for 25%)'
            },
            required: true
          },
          {
            name: 'interestRate',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Annual interest rate (default: 7.0)'
            },
            required: false
          },
          {
            name: 'loanTermYears',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Loan term in years (default: 30)'
            },
            required: false
          }
        ],
        http: {
          baseUrlPattern: `${baseUrl}/api/analyze-deal`,
          httpMethod: 'POST'
        }
      }
    },

    // Tool 4: Capture Lead Information
    {
      temporaryTool: {
        modelToolName: 'capture_lead_information',
        description: 'Capture lead information when user shows ANY loan/financing intent. Collect 5 required fields ONE AT A TIME: name, email, phone, property type, loan amount. TRIGGER PHRASES: "need a loan", "want a loan", "apply", "get approved", "pre-approval", "qualify", "finance", "financing", "get a rate", "what rate", "quote", "need money", "borrow", "want to work with you", "help me get", "let\'s start", "move forward", "next step", "get started", "refinance", "refi", "cash out", "fix and flip", "hard money", "bridge loan", "portfolio loan", "how do i get", "what do i need", "ready to", "interested in", "sign me up"',
        dynamicParameters: [
          {
            name: 'name',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Full name of the applicant'
            },
            required: true
          },
          {
            name: 'email',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Email address'
            },
            required: true
          },
          {
            name: 'phone',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Phone number (any format accepted)'
            },
            required: true
          },
          {
            name: 'propertyType',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Property type: single_family, condo, townhouse, multi_family, commercial, etc.'
            },
            required: true
          },
          {
            name: 'loanAmount',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Loan amount requested in dollars. IMPORTANT: Convert string amounts to numbers - remove commas, dollar signs, and convert k/M notation (e.g., "400,000" = 400000, "$300k" = 300000, "1.5M" = 1500000). Always pass as a plain number without formatting.'
            },
            required: true
          },
          {
            name: 'creditScore',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Approximate credit score (optional, handle variations like "mid 700s" = 750, "high 600s" = 680)'
            },
            required: false
          },
          {
            name: 'propertyAddress',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Property address if known (optional)'
            },
            required: false
          },
          {
            name: 'propertyValue',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'number',
              description: 'Property value or purchase price if known (optional)'
            },
            required: false
          },
          {
            name: 'notes',
            location: 'PARAMETER_LOCATION_BODY',
            schema: {
              type: 'string',
              description: 'Additional notes or context from the conversation (optional)'
            },
            required: false
          }
        ],
        http: {
          baseUrlPattern: `${baseUrl}/api/voice/tools/capture-lead`,
          httpMethod: 'POST'
        }
      }
    }
  ];
}

// Type definitions for tool responses
export interface KnowledgeSearchResponse {
  results: Array<{
    chunk: {
      title: string;
      content: string;
    };
    similarity: number;
  }>;
  count: number;
}

export interface PerplexitySearchResponse {
  answer: string;
  sources?: string[];
}

export interface AnalyzeDealResponse {
  dscr: number;
  monthlyPayment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  roi: number;
  capRate: number;
  qualified: boolean;
  analysis: string;
}

export interface CaptureLeadResponse {
  leadId: string;
  status: 'created' | 'updated';
  message: string;
}

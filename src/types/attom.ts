// ATTOM API Response Types
export type RentalStrategy = 'LONG_TERM' | 'SHORT_TERM' | 'PADSPLIT';

export interface AttomPropertyResponse {
  status: {
    version: string;
    code: number;
    msg: string;
  };
  property: PropertyDetail[];
}

export interface PropertyDetail {
  identifier?: {
    Id?: string;
    fips?: string;
    apn?: string;
    attomId?: string;
  };
  lot?: {
    depth?: number;
    frontage?: number;
    lotsize?: number;
    pooltype?: string;
    poolsize?: number;
  };
  area?: PropertyArea;
  building?: {
    size?: {
      bldgsize?: number;
      grosssize?: number;
      livingsize?: number;
      universalsize?: number;
    };
    construction?: {
      walls?: string;
      wallstype?: string;
      stories?: number;
    };
    rooms?: {
      bathstotal?: number;
      beds?: number;
      roomsTotal?: number;
      bathsfull?: number;
      bathspartial?: number;
      bathsfixtures?: number;
    };
    interior?: {
      bsmttype?: string;
      bsmtfinish?: string;
      flooring?: string;
      fplctype?: string;
      fplccount?: number;
    };
    parking?: {
      prkgSize?: number;
      prkgType?: string;
      prkgSpaces?: number;
      garagetype?: string;
      carporttype?: string;
    };
    yearBuilt?: number;
    effectiveYearBuilt?: number;
    condition?: string;
  };
  address?: {
    country?: string;
    countrySubd?: string;
    line1?: string;
    line2?: string;
    locality?: string;
    matchCode?: string;
    oneLine?: string;
    postal1?: string;
    postal2?: string;
    postal3?: string;
    state?: string;
  };
  location?: {
    accuracy?: string;
    elevation?: number;
    latitude?: string;
    longitude?: string;
    distance?: number;
    geoid?: string;
  };
  summary?: PropertySummary;
  utilities?: {
    walltype?: string;
    heatingtype?: string;
    heatingfuel?: string;
    airconditioning?: boolean;
    coolingtype?: string;
    coolingsystem?: string;
    sewertype?: string;
    watertype?: string;
    energytype?: string;
  };
  vintage?: {
    lastModified?: string;
    pubDate?: string;
  };
  assessment?: {
    total?: number;
    assessed?: {
      assdTtlValue?: number;
      assdLandValue?: number;
      assdImpsValue?: number;
    };
    market?: {
      mktTtlValue?: number;
      mktLandValue?: number;
      mktImpsValue?: number;
    };
    tax?: {
      taxAmt?: number;
      taxYear?: number;
      taxRate?: number;
    };
  };
  sale?: {
    amount?: number;
    saleDate?: string;
    deed?: {
      type?: string;
      book?: string;
      page?: string;
    };
    buyer?: string[];
    seller?: string[];
  };
  valuation?: {
    value?: number;
    low?: number;
    high?: number;
    valueRange?: number;
    lastSalePrice?: number;
    lastSaleDate?: string;
  };
  avm?: {
    amount?: number;
    value?: number;
    rentalValue?: number;
    highValue?: number;
    lowValue?: number;
    valueRange?: number;
    confidenceScore?: number;
    lastUpdate?: string;
  };
  rentalAnalysis?: ResidentialRentalAnalysis;
  salesHistory?: Array<{
    amount: number;
    date: string;
    deed?: {
      type?: string;
      book?: string;
      page?: string;
    };
    buyer?: string[];
    seller?: string[];
  }>;
}

export interface PropertySummary {
  absenteeInd?: string;
  propclass?: string;
  propsubtype?: string;
  proptype?: string;
  yearbuilt?: number;
  propLandUse?: string;
  propIndicator?: string;
  quality?: string;
  view?: boolean;
}

export interface PropertyArea {
  blocksizeid?: string;
  blocksize?: number;
  buildingsize?: number;
  groundfloorsize?: number;
  livingsize?: number;
  mainfloorsize?: number;
  universalsize?: number;
  countrysecsubd?: string;
  subdname?: string;
  zoning?: string;
  floodzone?: string;
  marketArea?: string;
}

export interface ResidentialRentalAnalysis {
  monthlyRent: number;
  annualRent: number;
  operatingExpenses: number;
  noi: number;
  capRate: number;
  dscr: number;
  cashOnCash: number;
  returnOnEquity: number;
  expenses: {
    mortgage: number;
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    vacancy: number;
    propertyManagement: number;
    total: number;
  };
  strategies: { [key in RentalStrategy]: RentalAnalysis };
}

export interface RentalAnalysis {
  monthlyRent: number;
  annualRent: number;
  operatingExpenses: number;
  noi: number;
  capRate: number;
  dscr: number;
  cashOnCash: number;
  returnOnEquity: number;
  expenses: {
    mortgage: number;
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    vacancy: number;
    propertyManagement: number;
    total: number;
  };
}

// Property Search Request Types
export interface PropertySearchRequest {
  address: string;
  city: string;
  state: string;
  zip?: string;
  radius?: number;
  pageSize?: number;
  page?: number;
  rentalStrategy?: RentalStrategy;
  purchasePrice?: number;
  downPayment?: number;
  interestRate?: number;
}

// Property Search Response Types
export interface PropertySearchResponse {
  status: {
    version: string;
    code: number;
    msg: string;
  };
  property: Array<{
    identifier?: {
      apn?: string;
      fips?: string;
      [key: string]: any;
    };
    lot?: {
      depth?: number;
      frontage?: number;
      lotsize?: number;
      pooltype?: string;
      poolsize?: number;
    };
    area?: PropertyArea;
    building?: {
      size?: {
        bldgsize?: number;
        grosssize?: number;
        livingsize?: number;
        universalsize?: number;
      };
      rooms?: {
        beds?: number;
        bathstotal?: number;
        roomsTotal?: number;
      };
      interior?: {
        bsmtsize?: number;
        bsmttype?: string;
        [key: string]: any;
      };
      construction?: {
        walls?: string;
        wallstype?: string;
        stories?: number;
      };
      parking?: {
        prkgSpaces?: number;
        prkgType?: string;
      };
      [key: string]: any;
    };
    vintage?: {
      lastModified?: string;
      [key: string]: any;
    };
    summary?: PropertySummary;
    [key: string]: any;
  }>;
}

export enum PropertyClass {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface CommercialPropertyType {
  OFFICE: 'office';
  RETAIL: 'retail';
  MEDICAL_OFFICE: 'medical_office';
  INDUSTRIAL: 'industrial';
  MIXED_USE: 'mixed_use';
  SHOPPING_CENTER: 'shopping_center';
  WAREHOUSE: 'warehouse';
}

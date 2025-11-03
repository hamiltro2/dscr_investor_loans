// AppLovin Axon Pixel TypeScript declarations

interface AxonEventData {
  currency?: string;
  value?: number;
  items?: Array<{
    id?: string;
    name?: string;
    price?: number;
    quantity?: number;
  }>;
  transaction_id?: string;
  [key: string]: any;
}

interface AxonFunction {
  (action: 'init'): void;
  (action: 'track', eventName: string, eventData?: AxonEventData): void;
  performOperation?: (...args: any[]) => void;
  operationQueue?: any[];
  ts?: number;
  eventKey?: string;
}

interface Window {
  axon: AxonFunction;
  AXON_EVENT_KEY: string;
}

declare global {
  function axon(action: 'init'): void;
  function axon(action: 'track', eventName: string, eventData?: AxonEventData): void;
}

export {};

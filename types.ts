
export interface StorageProvider {
  id: string;
  name: string;
  category: 'Public Cloud' | 'Decentralized' | 'Open Source' | 'Enterprise';
  freeTier: string;
  pros: string[];
  cons: string[];
  description: string;
  securityRating: number;
}

export interface ComparisonData {
  name: string;
  storageGB: number;
  cost: number;
}

export interface AIInsights {
  summary: string;
  recommendations: string[];
  securityNote: string;
}

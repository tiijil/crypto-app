export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
    }
  }
}

export interface CryptoOption {
  symbol: string;
  name: string;
  icon: string;
}

export interface CryptoListing {
  id: number;
  name: string;
  symbol: string;
} 
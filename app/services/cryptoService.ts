// Centralize API logic
import { Crypto, CryptoOption } from '@/types/crypto';

export class CryptoService {
  static async getListings(): Promise<Crypto[]> {
    try {
      const response = await api.get('?endpoint=listings');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching crypto listings:', error);
      throw error;
    }
  }

  static async convert(amount: number, from: string, to: string) {
    try {
      const response = await api.get('', {
        params: {
          endpoint: 'convert',
          amount,
          from,
          to
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error converting crypto:', error);
      throw error;
    }
  }

  static formatOptionsFromListings(listings: Crypto[]): CryptoOption[] {
    return listings.map(crypto => ({
      symbol: crypto.symbol,
      name: crypto.name,
      icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
    }));
  }
} 
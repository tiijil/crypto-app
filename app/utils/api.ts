import axios from 'axios';

const api = axios.create({
  baseURL: '/api/crypto'
});

export const getCryptoListings = async () => {
  try {
    const response = await api.get('?endpoint=listings');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching crypto listings:', error);
    throw error;
  }
};

export const getCryptoConverter = async (amount: number, from: string, to: string) => {
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
}; 
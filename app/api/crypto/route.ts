import { NextResponse } from 'next/server';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
  }
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (endpoint === 'listings') {
      const response = await api.get('/cryptocurrency/listings/latest');
      return NextResponse.json(response.data);
    } 
    
    if (endpoint === 'convert') {
      const amount = searchParams.get('amount');
      const from = searchParams.get('from');
      const to = searchParams.get('to');
      
      const response = await api.get(`/tools/price-conversion`, {
        params: { amount, symbol: from, convert: to }
      });
      return NextResponse.json(response.data);
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
} 
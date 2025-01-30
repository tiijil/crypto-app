'use client';

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/home/HeroSection';
import { MarketsSection } from './components/home/MarketsSection';
import { getCryptoListings } from './utils/api';
import type { Crypto } from '@/types/crypto';

export default function Home() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getCryptoListings();
        setCryptos(data);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection cryptoCount={cryptos.length} />
        <MarketsSection 
          cryptos={cryptos}
          loading={loading}
          error={error}
        />
      </main>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/home/HeroSection';
import { MarketsSection } from './components/home/MarketsSection';
import { getCryptoListings } from './utils/api';
import type { Crypto } from '@/types/crypto';

/**
 * Home Page Component
 * 
 * Main landing page of the application featuring:
 * - Real-time cryptocurrency listings
 * - Market overview
 * - Hero section with stats
 * - Dynamic data fetching
 */
export default function Home() {
  // State for cryptocurrency data and loading states
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch cryptocurrency data on component mount
   * Handles loading states and error scenarios
   */
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

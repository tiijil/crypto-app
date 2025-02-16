'use client';

import { CryptoCard } from './CryptoCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { Crypto } from '@/types/crypto';

interface MarketsSectionProps {
  cryptos: Crypto[];
  loading: boolean;
  error: string | null;
}

/**
 * MarketsSection Component
 * 
 * Displays a grid of cryptocurrency cards showing market data.
 * Handles loading and error states gracefully.
 * 
 * Features:
 * - Responsive grid layout
 * - Loading state with spinner
 * - Error handling with user feedback
 * - Real-time update timestamp
 * 
 * @param {MarketsSectionProps} props - Component props
 */
export function MarketsSection({ cryptos, loading, error }: MarketsSectionProps) {
  return (
    <section id="markets" className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Update Time */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold dark:text-white">
            Market Overview
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Updated {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Crypto Cards Grid with State Handling */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            cryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          )}
        </div>
      </div>
    </section>
  );
} 
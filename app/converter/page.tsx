'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCryptoConverter, getCryptoListings } from '../utils/api';
import { Header } from '../components/Header';
import { Dropdown } from '../components/Dropdown';
import { ArrowLeftRight } from 'lucide-react';
import type { CryptoOption, CryptoListing } from '@/types/crypto';

/**
 * CryptoConverter Page Component
 * 
 * Provides cryptocurrency conversion functionality with:
 * - Real-time conversion rates
 * - Dynamic cryptocurrency selection
 * - Input validation
 * - Error handling
 * - Loading states
 */
export default function CryptoConverter() {
  // Form state
  const [amount, setAmount] = useState('1');
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('ETH');
  const [result, setResult] = useState<number | null>(null);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<CryptoOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  /**
   * Fetch available cryptocurrencies on component mount
   */
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getCryptoListings();
        const cryptoOptions = data.map((crypto: CryptoListing) => ({
          symbol: crypto.symbol,
          name: crypto.name,
          icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`
        }));
        setOptions(cryptoOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  /**
   * Handle conversion request
   * Validates input and performs conversion
   */
  const handleConvert = async () => {
    if (!amount || !fromCrypto || !toCrypto) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCryptoConverter(Number(amount), fromCrypto, toCrypto);
      setResult(data.quote[toCrypto].price);
    } catch (error) {
      console.error('Conversion error:', error);
      setError('Failed to convert. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
              Convert
            </h1>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || Number(value) >= 0) {
                        setAmount(value);
                      }
                    }}
                    className="input pr-20"
                    placeholder="Enter amount"
                    min="0"
                    step="any"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {fromCrypto}
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  {loadingOptions ? (
                    <div className="input flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : (
                    <Dropdown
                      value={fromCrypto}
                      onChange={setFromCrypto}
                      options={options}
                      placeholder="Select crypto"
                    />
                  )}
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={() => {
                      setFromCrypto(toCrypto);
                      setToCrypto(fromCrypto);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  {loadingOptions ? (
                    <div className="input flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : (
                    <Dropdown
                      value={toCrypto}
                      onChange={setToCrypto}
                      options={options}
                      placeholder="Select crypto"
                    />
                  )}
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={loading}
                className={`
                  w-full mt-6 px-6 py-3 
                  bg-gradient-to-r from-blue-500 to-blue-600 
                  hover:from-blue-600 hover:to-blue-700
                  dark:from-blue-400 dark:to-blue-500
                  dark:hover:from-blue-500 dark:hover:to-blue-600
                  text-white font-semibold rounded-lg
                  transition-all duration-200
                  border border-blue-600/20 dark:border-blue-400/20
                  shadow-[0_2px_8px_-2px_rgba(59,130,246,0.3)]
                  hover:shadow-[0_4px_12px_-4px_rgba(59,130,246,0.4)]
                  dark:shadow-[0_2px_8px_-2px_rgba(59,130,246,0.25)]
                  dark:hover:shadow-[0_4px_12px_-4px_rgba(59,130,246,0.35)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:shadow-[0_2px_8px_-2px_rgba(59,130,246,0.3)]
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  dark:focus:ring-offset-neutral-900
                  active:scale-[0.98]
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Converting...</span>
                  </div>
                ) : (
                  'Convert'
                )}
              </button>

              {result !== null && !error && (
                <div className="mt-6 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Result</p>
                  <p className="text-xl font-semibold mt-1">
                    {result.toFixed(8)} {toCrypto}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
} 
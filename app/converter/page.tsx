'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCryptoConverter, getCryptoListings } from '../utils/api';
import { Header } from '../components/Header';
import { Dropdown } from '../components/Dropdown';
import { ArrowLeftRight } from 'lucide-react';

interface CryptoOption {
  symbol: string;
  name: string;
  icon: string;
}

export default function CryptoConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('ETH');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<CryptoOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getCryptoListings();
        const cryptoOptions = data.map((crypto: any) => ({
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
                disabled={loading || loadingOptions}
                className="button w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Converting...
                  </span>
                ) : (
                  'Convert'
                )}
              </button>

              {error && (
                <motion.div 
                  className="p-4 bg-red-500/10 text-red-500 rounded-lg text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {result && !error && (
                <motion.div
                  className="p-6 bg-muted rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-sm text-muted-foreground mb-1">Result</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span>{amount} {fromCrypto}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{result.toFixed(8)} {toCrypto}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    1 {fromCrypto} = {(result / Number(amount)).toFixed(8)} {toCrypto}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
} 
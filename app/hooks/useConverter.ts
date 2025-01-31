import React, { useState } from 'react';

export function useConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('ETH');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return {
    amount,
    setAmount,
    fromCrypto,
    setFromCrypto,
    toCrypto,
    setToCrypto,
    result,
    loading,
    error,
    handleConvert
  };
} 
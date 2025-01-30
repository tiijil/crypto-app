'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { Crypto } from '@/types/crypto';

interface CryptoCardProps {
  crypto: Crypto;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <motion.div
      className="card p-4 sm:p-6 hover:shadow-xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
          alt={crypto.name}
          width={32}
          height={32}
          className="rounded-full sm:w-10 sm:h-10"
          onError={(e) => {
            e.currentTarget.src = "/fallback-crypto-icon.png"
          }}
        />
        <div className="min-w-0">
          <h2 className="font-semibold truncate">{crypto.name}</h2>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <PriceRow label="Price" value={`$${crypto.quote.USD.price.toFixed(2)}`} />
        <ChangeRow 
          label="24h Change" 
          value={crypto.quote.USD.percent_change_24h} 
        />
        <ChangeRow 
          label="7d Change" 
          value={crypto.quote.USD.percent_change_7d} 
        />
      </div>
    </motion.div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
      <span className="text-lg sm:text-xl font-bold truncate ml-2">{value}</span>
    </div>
  );
}

function ChangeRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
      <span className={`text-xs sm:text-sm font-medium ${
        value > 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {value > 0 ? '↑' : '↓'} 
        {Math.abs(value).toFixed(2)}%
      </span>
    </div>
  );
} 
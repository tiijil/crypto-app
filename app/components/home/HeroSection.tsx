'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { StatsDisplay } from './StatsDisplay';
import { LiveIndicator } from '../ui/LiveIndicator';

interface HeroSectionProps {
  cryptoCount: number;
}

export function HeroSection({ cryptoCount }: HeroSectionProps) {
  return (
    <div className="relative py-12 sm:py-20 lg:py-32 overflow-hidden border-b border-border">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100/50 to-transparent dark:from-neutral-800/20 dark:to-background/0" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-light.svg')] dark:bg-[url('/grid-dark.svg')] bg-center opacity-100 dark:opacity-[0.15] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          <div className="space-y-4 sm:space-y-6 max-w-3xl">
            <div className="space-y-4">
              <LiveIndicator />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent leading-tight">
                Track Crypto Markets in Real-Time
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-4 sm:px-0">
              Stay ahead with live cryptocurrency prices, market trends, and comprehensive analytics all in one place
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link 
              href="/converter" 
              className="button text-sm flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-primary dark:hover:bg-primary/90 dark:text-neutral-900 shadow-lg hover:shadow-xl w-full sm:w-auto transition-all duration-200"
            >
              <span>Try Converter</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
            <a 
              href="#markets" 
              className="px-6 py-3 text-sm border border-neutral-200 dark:border-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/40 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm w-full sm:w-auto"
            >
              <span>View Markets</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.span>
            </a>
          </div>

          <StatsDisplay cryptoCount={cryptoCount} />
        </motion.div>
      </div>
    </div>
  );
} 
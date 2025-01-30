'use client';

import { motion } from 'motion/react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div 
      className="col-span-full bg-red-500/10 text-red-500 p-4 rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {message}
    </motion.div>
  );
} 
interface StatsDisplayProps {
  cryptoCount: number;
}

export function StatsDisplay({ cryptoCount }: StatsDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-4 pt-8 sm:pt-12 text-center">
      <StatItem value={`${cryptoCount}+`} label="Cryptocurrencies" />
      <Divider className="hidden sm:block" />
      <StatItem value="Real-Time" label="Always Current" className="text-base sm:text-lg" />
      <Divider className="hidden sm:block" />
      <StatItem value="24/7" label="Market Monitoring" />
    </div>
  );
}

function StatItem({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  return (
    <div className="flex-1">
      <h3 className={`font-bold text-neutral-900 dark:text-white ${className}`}>
        {value}
      </h3>
      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">{label}</p>
    </div>
  );
}

function Divider({ className = '' }: { className?: string }) {
  return <div className={`border-l border-neutral-200 dark:border-neutral-700/50 ${className}`} />;
} 
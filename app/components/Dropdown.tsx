'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    symbol: string;
    name: string;
    icon?: string;
  }>;
  placeholder?: string;
}

export function Dropdown({ value, onChange, options, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option => 
    option.symbol.toLowerCase().includes(search.toLowerCase()) ||
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find(opt => opt.symbol === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="input flex items-center justify-between cursor-pointer group hover:border-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {value ? (
            <>
              {selectedOption?.icon && (
                <Image 
                  src={selectedOption.icon}
                  alt={value}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <div className="truncate">
                <span className="font-medium">{value}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {selectedOption?.name}
                </span>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder || 'Select option'}</span>
          )}
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-card-background border border-border rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="input pl-9 py-2"
                  placeholder="Search cryptocurrency..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="max-h-[280px] overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No cryptocurrencies found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.symbol}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => {
                      onChange(option.symbol);
                      setIsOpen(false);
                      setSearch('');
                    }}
                  >
                    {option.icon && (
                      <Image 
                        src={option.icon}
                        alt={option.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{option.symbol}</div>
                      <div className="text-sm text-muted-foreground truncate">{option.name}</div>
                    </div>
                    {value === option.symbol && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
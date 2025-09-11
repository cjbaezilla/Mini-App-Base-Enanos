'use client';

import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { SocialIcons } from './SocialIcons';
import Link from 'next/link';

interface NFTHeaderProps {
  title: string;
  subtitle: string;
}

export function NFTHeader({ title, subtitle }: NFTHeaderProps) {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    // Mostrar el botón si no está agregado o si se agregó recientemente
    if (!context?.client?.added || frameAdded) {
      if (frameAdded) {
        return (
          <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
            <Icon name="check" size="sm" className="text-[#0052FF]" />
            <span>Saved</span>
          </div>
        );
      }
      
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <header className="px-4 py-4 border-b border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display">
          {title}
        </h1>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
          {subtitle}
        </p>
      </div>
      
      {/* Social Icons */}
      <div className="flex justify-center mt-3">
        <SocialIcons />
      </div>
      
      {/* Save Frame Button */}
      <div className="flex justify-center mt-4">
        {saveFrameButton}
      </div>
      
      {/* Guild and Voting Buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <Link 
          href="/democracy"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-100 dark:bg-amber-800/30 text-amber-800 dark:text-amber-200 rounded-lg border border-amber-200 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
          <span className="text-sm font-semibold">Nuestra Guild</span>
        </Link>
        
        <Link 
          href="/voting"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-sm font-semibold">Votar Propuestas</span>
        </Link>
      </div>
    </header>
  );
}
'use client';

import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

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
      
      {/* Save Frame Button */}
      <div className="flex justify-center mt-4">
        {saveFrameButton}
      </div>
    </header>
  );
}
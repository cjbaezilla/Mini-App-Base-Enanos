'use client';

import { useState, useEffect } from 'react';

// Hook para manejar el estado de hidratación y evitar problemas de SSR
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

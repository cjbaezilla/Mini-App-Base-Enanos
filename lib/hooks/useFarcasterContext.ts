'use client';

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from 'react';
import { useHydration } from './useHydration';

export function useFarcasterContext() {
  const { context } = useMiniKit();
  const [isInFarcaster, setIsInFarcaster] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const isHydrated = useHydration();

  useEffect(() => {
    // Solo ejecutar en el cliente después de la hidratación
    if (!isHydrated) return;

    // Verificar si estamos en un contexto de Farcaster
    const checkFarcasterContext = () => {
      // Verificar si estamos en un iframe (común en mini apps)
      const isInIframe = window.parent !== window;
      
      // Verificar si tenemos context de MiniKit con propiedades específicas de Farcaster
      const hasMiniKitContext = !!(
        context?.client || 
        context?.user
      );
      
      // Verificar si tenemos acceso a APIs específicas de Farcaster
      const hasFarcasterAPIs = (
        'farcaster' in window ||
        'fc' in window ||
        // Verificar si estamos en un user agent de Farcaster
        navigator.userAgent.includes('Farcaster') ||
        navigator.userAgent.includes('Base')
      );
      
      // Solo considerar que estamos en Farcaster si tenemos contexto de MiniKit Y estamos en iframe
      // O si tenemos APIs específicas de Farcaster
      const isFarcasterContext = (hasMiniKitContext && isInIframe) || hasFarcasterAPIs;
      
      // Debug logs
      console.log('Farcaster Context Debug:', {
        isInIframe,
        hasMiniKitContext,
        hasFarcasterAPIs,
        context,
        isFarcasterContext,
        userAgent: navigator.userAgent
      });
      
      setIsInFarcaster(isFarcasterContext);
      setIsLoading(false);
    };

    // Ejecutar la verificación inmediatamente
    checkFarcasterContext();
    
    // También ejecutar después de un pequeño delay para asegurar que el contexto esté cargado
    const timeoutId = setTimeout(checkFarcasterContext, 100);
    
    // Timeout de seguridad para evitar loading infinito
    const safetyTimeout = setTimeout(() => {
      console.log('Farcaster context timeout - defaulting to browser context');
      setIsInFarcaster(false);
      setIsLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(safetyTimeout);
    };
  }, [context, isHydrated]);

  return {
    isInFarcaster: isHydrated ? isInFarcaster : false,
    isLoading: !isHydrated || isLoading,
    context
  };
}

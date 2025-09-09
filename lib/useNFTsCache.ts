import { useState, useEffect, useCallback } from 'react';
import { NFTMetadata } from '../types/nft';

const CACHE_KEY = 'nfts_cache';
const CACHE_VERSION = '1.0';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

interface CacheData {
  version: string;
  timestamp: number;
  data: NFTMetadata[];
}

export function useNFTsCache() {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  // Función para verificar si el cache es válido
  const isCacheValid = useCallback((cacheData: CacheData): boolean => {
    const now = Date.now();
    return (
      cacheData.version === CACHE_VERSION &&
      (now - cacheData.timestamp) < CACHE_EXPIRY
    );
  }, []);

  // Función para cargar datos del cache
  const loadFromCache = useCallback((): NFTMetadata[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const cacheData: CacheData = JSON.parse(cached);
      
      if (isCacheValid(cacheData)) {
        setIsFromCache(true);
        return cacheData.data;
      } else {
        localStorage.removeItem(CACHE_KEY);
        setIsFromCache(false);
        return null;
      }
    } catch {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }, [isCacheValid]);

  // Función para guardar datos en cache
  const saveToCache = useCallback((data: NFTMetadata[]) => {
    try {
      const cacheData: CacheData = {
        version: CACHE_VERSION,
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch {
      // Error al guardar cache
    }
  }, []);

  // Función para cargar NFTs desde la API
  const loadNFTsFromAPI = useCallback(async (): Promise<NFTMetadata[]> => {
    const nftData: NFTMetadata[] = [];
    
    // Cargar todos los archivos JSON de metadatos (1-188)
    for (let i = 1; i <= 188; i++) {
      try {
        const response = await fetch(`/metadata/json/${i}.json`);
        if (response.ok) {
          const metadata = await response.json();
          nftData.push({
            ...metadata,
            id: i,
            image: `/metadata/imgs/${i}.png`
          });
        }
      } catch {
        // Error al cargar NFT individual
      }
    }
    
    return nftData;
  }, []);

  // Función principal para cargar NFTs
  const loadNFTs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Intentar cargar desde cache primero
      const cachedData = loadFromCache();
      if (cachedData && cachedData.length > 0) {
        setNfts(cachedData);
        setLoading(false);
        return;
      }

      // Si no hay cache válido, cargar desde API
      setIsFromCache(false);
      const nftData = await loadNFTsFromAPI();
      
      if (nftData.length > 0) {
        setNfts(nftData);
        saveToCache(nftData);
      } else {
        setError('No se pudieron cargar los NFTs');
      }
    } catch {
      setError('Error al cargar los NFTs');
    } finally {
      setLoading(false);
    }
  }, [loadFromCache, loadNFTsFromAPI, saveToCache]);

  // Función para limpiar cache
  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    setIsFromCache(false);
  }, []);

  // Función para forzar recarga desde API
  const refreshNFTs = useCallback(async () => {
    clearCache();
    await loadNFTs();
  }, [clearCache, loadNFTs]);

  // Función para obtener información del cache
  const getCacheInfo = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const cacheData: CacheData = JSON.parse(cached);
      const now = Date.now();
      const age = now - cacheData.timestamp;
      const isExpired = age >= CACHE_EXPIRY;

      return {
        version: cacheData.version,
        timestamp: cacheData.timestamp,
        age: age,
        isExpired: isExpired,
        dataCount: cacheData.data.length
      };
    } catch {
      return null;
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadNFTs();
  }, [loadNFTs]);

  return {
    nfts,
    loading,
    error,
    isFromCache,
    refreshNFTs,
    clearCache,
    getCacheInfo
  };
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers, providers } from 'ethers';
import { useAccount } from 'wagmi';

// ABI del contrato NFT
const NFT_ABI = [
  "function getAvailableTokensCount() external view returns (uint256)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function MAX_SUPPLY() external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

// Función para procesar tokens en lotes
const processBatch = async (
  contract: ethers.Contract, 
  tokenIds: number[], 
  userAddress: string
): Promise<number[]> => {
  const ownedTokens: number[] = [];
  
  // Procesar en lotes de 10 para evitar sobrecargar el RPC
  const batchSize = 10;
  for (let i = 0; i < tokenIds.length; i += batchSize) {
    const batch = tokenIds.slice(i, i + batchSize);
    
    // Crear promesas para el lote actual
    const promises = batch.map(async (tokenId) => {
      try {
        const owner = await contract.ownerOf(tokenId);
        return owner.toLowerCase() === userAddress.toLowerCase() ? tokenId : null;
      } catch {
        return null;
      }
    });
    
    // Esperar a que se resuelvan todas las promesas del lote
    const results = await Promise.all(promises);
    
    // Agregar los tokens que pertenecen al usuario
    results.forEach(result => {
      if (result !== null) {
        ownedTokens.push(result);
      }
    });
  }
  
  return ownedTokens;
};

export const useUserNFTs = () => {
  const { address } = useAccount();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [, setProvider] = useState<providers.JsonRpcProvider | null>(null);
  const [userNFTs, setUserNFTs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Memoizar la dirección del usuario para evitar re-renders innecesarios
  const userAddress = useMemo(() => address?.toLowerCase(), [address]);

  // Inicializar provider y contrato inmediatamente
  useEffect(() => {
    const initContract = async () => {
      if (isInitialized) return;
      
      try {
        const provider = new providers.JsonRpcProvider(RPC_URL);
        setProvider(provider);
        
        const contract = new ethers.Contract(CONTRACT_ADDRESS, NFT_ABI, provider);
        setContract(contract);
        setIsInitialized(true);
      } catch {
        setError('Error al inicializar el contrato');
      }
    };

    initContract();
  }, [isInitialized]);

  // Función optimizada para obtener los NFTs del usuario
  const getUserNFTs = useCallback(async () => {
    if (!contract || !userAddress) {
      setUserNFTs([]);
      setUserBalance(0);
      setHasLoadedOnce(false);
      return;
    }

    try {
      // Solo mostrar loading si no se ha cargado antes
      if (!hasLoadedOnce) {
        setIsLoading(true);
      }
      setError(null);

      // Obtener el balance del usuario primero para una verificación rápida
      const balance = await contract.balanceOf(userAddress);
      const userNFTBalance = Number(balance);
      setUserBalance(userNFTBalance);

      // Si el usuario no tiene NFTs, no necesitamos hacer más llamadas
      if (userNFTBalance === 0) {
        setUserNFTs([]);
        return;
      }

      // Obtener el número total de tokens vendidos
      const [availableTokens, maxSupply] = await Promise.all([
        contract.getAvailableTokensCount(),
        contract.MAX_SUPPLY()
      ]);
      
      const soldTokens = Number(maxSupply) - Number(availableTokens);

      // Si no hay tokens vendidos, no hay nada que buscar
      if (soldTokens === 0) {
        setUserNFTs([]);
        return;
      }

      // Crear array de todos los token IDs vendidos
      const allTokenIds = Array.from({ length: soldTokens }, (_, i) => i + 1);

      // Procesar en lotes para mejor rendimiento
      const ownedTokens = await processBatch(contract, allTokenIds, userAddress);

      setUserNFTs(ownedTokens);
      setHasLoadedOnce(true);
    } catch {
      setError('Error al obtener los NFTs del usuario');
      setUserNFTs([]);
      setUserBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [contract, userAddress, hasLoadedOnce]);

  // Cargar NFTs del usuario tan pronto como el contrato esté listo y haya una dirección
  useEffect(() => {
    if (contract && userAddress && isInitialized) {
      getUserNFTs();
    } else if (contract && !userAddress && isInitialized) {
      // Si no hay dirección de usuario, limpiar los datos
      setUserNFTs([]);
      setUserBalance(0);
      setIsLoading(false);
      setHasLoadedOnce(false);
    }
  }, [contract, userAddress, isInitialized, getUserNFTs]);

  return {
    userNFTs,
    userBalance,
    isLoading,
    error,
    refreshUserNFTs: getUserNFTs
  };
};

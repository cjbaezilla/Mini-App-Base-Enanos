'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface USDCBalance {
  usdcBalance: number;
  isLoading: boolean;
  error: string | null;
}

// ABI del contrato USDC
const USDC_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

export const useUSDCBalance = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState<USDCBalance>({
    usdcBalance: 0,
    isLoading: false,
    error: null
  });

  const fetchUSDCBalance = useCallback(async () => {
    if (!address) {
      setBalance({ usdcBalance: 0, isLoading: false, error: null });
      return;
    }

    try {
      setBalance(prev => ({ ...prev, isLoading: true, error: null }));

      const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
      
      if (!usdcAddress || !rpcUrl) {
        throw new Error('Configuración de red no encontrada');
      }

      // Crear provider y contrato USDC
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const usdcContract = new ethers.Contract(usdcAddress, USDC_ABI, provider);

      // Obtener balance y decimales
      const [balanceWei, decimals] = await Promise.all([
        usdcContract.balanceOf(address),
        usdcContract.decimals()
      ]);

      // Convertir de wei a USDC
      const usdcBalance = Number(ethers.utils.formatUnits(balanceWei, decimals));
      
      setBalance({
        usdcBalance,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setBalance({
        usdcBalance: 0,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }, [address]);

  // Cargar balance cuando cambie la dirección
  useEffect(() => {
    fetchUSDCBalance();
  }, [fetchUSDCBalance]);

  return {
    ...balance,
    refetch: fetchUSDCBalance
  };
};

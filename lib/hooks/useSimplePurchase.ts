'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { ethers } from 'ethers';

// ABI del contrato EnanosDeLeyenda
const CONTRACT_ABI = [
  "function buyNFT(uint256 tokenAmount) external",
  "function getAvailableTokensCount() external view returns (uint256)",
  "function isAvailableForSale(uint256 tokenId) external view returns (bool)",
  "function getRemainingTokensForWallet(address wallet) external view returns (uint256)",
  "function getUSDCBalance() external view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function MAX_SUPPLY() external view returns (uint256)",
  "function PRICE() external view returns (uint256)",
  "function MAX_TOKENS_PER_WALLET() external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "event NFTSold(uint256 indexed tokenId, address indexed buyer, uint256 price)"
];

// ABI del contrato USDC
const USDC_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function transfer(address to, uint256 amount) external returns (bool)"
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS!;

export interface PurchaseStatus {
  status: 'idle' | 'approving' | 'purchasing' | 'success' | 'error';
  message: string;
  transactionHash?: string;
}

export const useSimplePurchase = () => {
  const { address } = useAccount();
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>({
    status: 'idle',
    message: ''
  });
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);

  // Hooks de wagmi para transacciones
  const { sendTransaction, data: hash, error, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Manejar estados de transacción
  const handleTransactionState = useCallback(() => {
    if (isPending) {
      if (purchaseStatus.status === 'idle') {
        setPurchaseStatus({ 
          status: 'purchasing', 
          message: 'Procesando...' 
        });
      }
    } else if (isConfirming) {
      setPurchaseStatus({ 
        status: purchaseStatus.status === 'approving' ? 'approving' : 'purchasing', 
        message: 'Confirmando...' 
      });
    } else if (isSuccess && hash) {
      if (purchaseStatus.status === 'approving' && pendingAmount) {
        // Aprobación exitosa, proceder con la compra
        setPurchaseStatus({ status: 'purchasing', message: 'Comprando NFTs...' });
        
        // Crear interfaz para el contrato NFT
        const nftInterface = new ethers.utils.Interface(CONTRACT_ABI);
        const buyData = nftInterface.encodeFunctionData('buyNFT', [pendingAmount]);
        
        sendTransaction({
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: buyData as `0x${string}`,
        });
        
        setPendingAmount(null);
      } else {
        // Compra exitosa
        setPurchaseStatus({ 
          status: 'success', 
          message: '¡NFT adquirido con éxito! 🎉 Tu enano ya está en tu colección.',
          transactionHash: hash
        });
      }
    } else if (error) {
      setPurchaseStatus({ 
        status: 'error', 
        message: purchaseStatus.status === 'approving' ? 'Error en la aprobación' : 'Error en la compra'
      });
      setPendingAmount(null);
    }
  }, [isPending, isConfirming, isSuccess, error, hash, purchaseStatus.status, pendingAmount, sendTransaction]);

  // Ejecutar el manejo de estados cuando cambien las dependencias
  useEffect(() => {
    handleTransactionState();
  }, [handleTransactionState]);

  // Función principal de compra
  const purchaseNFTs = useCallback(async (tokenAmount: number, price: number) => {
    if (!address) {
      throw new Error('Usuario no autenticado');
    }

    if (purchaseStatus.status === 'approving' || purchaseStatus.status === 'purchasing') {
      return;
    }

    try {
      const totalPrice = price * tokenAmount;
      const totalPriceWei = ethers.utils.parseUnits(totalPrice.toString(), 6);

      // Verificar allowance actual
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
      const allowance = await usdcContract.allowance(address, CONTRACT_ADDRESS);
      
      if (allowance.lt(totalPriceWei)) {
        // Necesitamos aprobar USDC primero
        setPurchaseStatus({ status: 'approving', message: 'Aprobando USDC...' });
        setPendingAmount(tokenAmount);

        const usdcInterface = new ethers.utils.Interface(USDC_ABI);
        const approveData = usdcInterface.encodeFunctionData('approve', [CONTRACT_ADDRESS, totalPriceWei]);
        
        sendTransaction({
          to: USDC_ADDRESS as `0x${string}`,
          data: approveData as `0x${string}`,
        });
      } else {
        // Ya tenemos suficiente allowance, proceder directamente a comprar
        setPurchaseStatus({ status: 'purchasing', message: 'Comprando NFTs...' });
        
        const nftInterface = new ethers.utils.Interface(CONTRACT_ABI);
        const buyData = nftInterface.encodeFunctionData('buyNFT', [tokenAmount]);
        
        sendTransaction({
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: buyData as `0x${string}`,
        });
      }
    } catch (error: unknown) {
      setPurchaseStatus({ 
        status: 'error', 
        message: 'Error en la compra' 
      });
      setPendingAmount(null);
      throw error;
    }
  }, [address, purchaseStatus.status, sendTransaction]);

  // Función para resetear el estado
  const resetPurchaseStatus = useCallback(() => {
    setPurchaseStatus({ status: 'idle', message: '' });
    setPendingAmount(null);
  }, []);

  // Función para cancelar una compra en progreso
  const cancelPurchase = useCallback(() => {
    if (purchaseStatus.status === 'approving' || purchaseStatus.status === 'purchasing') {
      setPurchaseStatus({ 
        status: 'error', 
        message: 'Cancelado' 
      });
      setPendingAmount(null);
      
      setTimeout(() => {
        setPurchaseStatus({ status: 'idle', message: '' });
      }, 3000);
    }
  }, [purchaseStatus.status]);

  return {
    purchaseStatus,
    isProcessing: isPending || isConfirming,
    isConnected: !!address,
    purchaseNFTs,
    resetPurchaseStatus,
    cancelPurchase
  };
};

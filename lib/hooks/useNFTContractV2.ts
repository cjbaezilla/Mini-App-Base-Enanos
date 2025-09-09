'use client';

import { useState, useEffect, useCallback } from 'react';
import { ethers, providers } from 'ethers';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { utils } from 'ethers';
import { NFTContractData, MintStatus } from '../../types/contract';

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
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

export const useNFTContractV2 = () => {
  const { address } = useAccount();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [usdcContract, setUsdcContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<providers.Web3Provider | providers.JsonRpcProvider | null>(null);
  const [contractData, setContractData] = useState<NFTContractData | null>(null);
  const [mintStatus, setMintStatus] = useState<MintStatus>({
    status: 'idle',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMintCount, setPendingMintCount] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<'idle' | 'approving' | 'purchasing'>('idle');

  // Hooks de wagmi para transacciones
  const { sendTransaction, data: hash, error, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Inicializar provider y contratos
  useEffect(() => {
    const initContracts = async () => {
      try {
        // Usar RPC público para lectura
        const provider = new providers.JsonRpcProvider(RPC_URL);
        setProvider(provider);
        
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        setContract(contract);
        
        const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
        setUsdcContract(usdcContract);
      } catch {
        // Error initializing contracts
      }
    };

    initContracts();
  }, []);

  // Cargar datos del contrato
  const loadContractData = useCallback(async () => {
    if (!contract || !usdcContract || !address) return;

    try {
      setIsLoading(true);
      
      const [
        availableTokens,
        remainingTokens,
        usdcBalance,
        price,
        maxSupply,
        maxTokensPerWallet,
        userNFTBalance
      ] = await Promise.all([
        contract.getAvailableTokensCount(),
        contract.getRemainingTokensForWallet(address),
        usdcContract.balanceOf(address),
        contract.PRICE(),
        contract.MAX_SUPPLY(),
        contract.MAX_TOKENS_PER_WALLET(),
        contract.balanceOf(address)
      ]);

      setContractData({
        availableTokens: Number(availableTokens),
        remainingTokens: Number(remainingTokens),
        usdcBalance: Number(utils.formatUnits(usdcBalance, 6)), // USDC tiene 6 decimales
        price: Number(utils.formatUnits(price, 6)),
        maxSupply: Number(maxSupply),
        maxTokensPerWallet: Number(maxTokensPerWallet),
        userNFTBalance: Number(userNFTBalance)
      });
    } catch {
      // Error loading contract data
    } finally {
      setIsLoading(false);
    }
  }, [contract, usdcContract, address]);

  // Recargar datos del contrato sin mostrar loading (para después de transacciones)
  const refreshContractData = useCallback(async () => {
    if (!contract || !usdcContract || !address) return;

    try {
      const [
        availableTokens,
        remainingTokens,
        usdcBalance,
        price,
        maxSupply,
        maxTokensPerWallet,
        userNFTBalance
      ] = await Promise.all([
        contract.getAvailableTokensCount(),
        contract.getRemainingTokensForWallet(address),
        usdcContract.balanceOf(address),
        contract.PRICE(),
        contract.MAX_SUPPLY(),
        contract.MAX_TOKENS_PER_WALLET(),
        contract.balanceOf(address)
      ]);

      setContractData({
        availableTokens: Number(availableTokens),
        remainingTokens: Number(remainingTokens),
        usdcBalance: Number(utils.formatUnits(usdcBalance, 6)), // USDC tiene 6 decimales
        price: Number(utils.formatUnits(price, 6)),
        maxSupply: Number(maxSupply),
        maxTokensPerWallet: Number(maxTokensPerWallet),
        userNFTBalance: Number(userNFTBalance)
      });
    } catch {
      // Error refreshing contract data
    }
  }, [contract, usdcContract, address]);

  // Cargar datos cuando los contratos estén listos
  useEffect(() => {
    if (contract && usdcContract && address) {
      loadContractData();
    }
  }, [contract, usdcContract, address, loadContractData]);

  // Manejar estado de transacciones - versión simplificada
  useEffect(() => {
    if (isPending) {
      // Actualizar estado basado en el paso actual
      if (currentStep === 'approving') {
        setMintStatus({ status: 'approving', message: 'Aprobando USDC...' });
      } else if (currentStep === 'purchasing') {
        setMintStatus({ status: 'minting', message: 'Comprando NFTs...' });
      }
    } else if (isConfirming) {
      // Mantener el estado actual pero cambiar el mensaje
      if (currentStep === 'approving') {
        setMintStatus({ status: 'approving', message: 'Confirmando aprobación...' });
      } else if (currentStep === 'purchasing') {
        setMintStatus({ status: 'minting', message: 'Confirmando compra...' });
      }
    } else if (isSuccess && hash) {
      if (currentStep === 'approving' && pendingMintCount) {
        // Aprobación exitosa, proceder automáticamente con la compra
        setMintStatus({ status: 'minting', message: 'Comprando NFTs...' });
        setCurrentStep('purchasing');

        const nftInterface = new ethers.utils.Interface(CONTRACT_ABI);
        const buyData = nftInterface.encodeFunctionData('buyNFT', [pendingMintCount]);
        
        sendTransaction({
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: buyData as `0x${string}`,
        });
        
        setPendingMintCount(null);
      } else if (currentStep === 'purchasing') {
        // Compra exitosa
        setMintStatus({ 
          status: 'success', 
          message: '¡NFT adquirido con éxito! 🎉 Tu enano ya está en tu colección.',
          transactionHash: hash
        });
        setCurrentStep('idle');
        // Recargar datos del contrato con un pequeño delay
        setTimeout(() => {
          refreshContractData();
        }, 2000);
      }
    } else if (error) {
      // Manejar errores
      if (currentStep === 'approving') {
        setMintStatus({ 
          status: 'error', 
          message: 'Error en la aprobación de USDC' 
        });
      } else {
        setMintStatus({ 
          status: 'error', 
          message: 'Error en la compra' 
        });
      }
      setPendingMintCount(null);
      setCurrentStep('idle');
    }
  }, [isPending, isConfirming, isSuccess, error, hash, currentStep, pendingMintCount, refreshContractData, sendTransaction]);

  // Función para comprar NFTs - versión simplificada
  const buyNFTs = useCallback(async (tokenAmount: number) => {
    if (!contract || !usdcContract || !address || !contractData) {
      throw new Error('Contratos no inicializados o usuario no autenticado');
    }

    // Prevenir múltiples compras simultáneas
    if (currentStep !== 'idle') {
      return;
    }

    try {
      const totalPrice = contractData.price * tokenAmount;
      const totalPriceWei = utils.parseUnits(totalPrice.toString(), 6);

      // Verificar allowance actual
      const allowance = await usdcContract.allowance(address, CONTRACT_ADDRESS);
      
      if (allowance.lt(totalPriceWei)) {
        // Necesitamos aprobar USDC primero
        setCurrentStep('approving');
        setPendingMintCount(tokenAmount);
        setMintStatus({ status: 'approving', message: 'Aprobando USDC...' });

        const usdcInterface = new ethers.utils.Interface(USDC_ABI);
        const approveData = usdcInterface.encodeFunctionData('approve', [CONTRACT_ADDRESS, totalPriceWei]);
        
        sendTransaction({
          to: USDC_ADDRESS as `0x${string}`,
          data: approveData as `0x${string}`,
        });
      } else {
        // Ya tenemos suficiente allowance, proceder directamente a comprar
        setCurrentStep('purchasing');
        setMintStatus({ status: 'minting', message: 'Comprando NFTs...' });
        
        const nftInterface = new ethers.utils.Interface(CONTRACT_ABI);
        const buyData = nftInterface.encodeFunctionData('buyNFT', [tokenAmount]);
        
        sendTransaction({
          to: CONTRACT_ADDRESS as `0x${string}`,
          data: buyData as `0x${string}`,
        });
      }
    } catch (error: unknown) {
      setMintStatus({ 
        status: 'error', 
        message: 'Error en la compra' 
      });
      setPendingMintCount(null);
      setCurrentStep('idle');
      throw error;
    }
  }, [contract, usdcContract, address, contractData, currentStep, sendTransaction]);


  // Función para resetear el estado de mint
  const resetMintStatus = useCallback(() => {
    setMintStatus({ status: 'idle', message: '' });
    setCurrentStep('idle');
    setPendingMintCount(null);
  }, []);

  // Función para cancelar una compra en progreso
  const cancelMint = useCallback(() => {
    if (currentStep !== 'idle') {
      setMintStatus({ 
        status: 'error', 
        message: 'Cancelado' 
      });
      setPendingMintCount(null);
      setCurrentStep('idle');
      
      // Limpiar el estado después de un breve delay
      setTimeout(() => {
        setMintStatus({ status: 'idle', message: '' });
      }, 3000);
    }
  }, [currentStep]);

  // Función para verificar si un NFT está disponible
  const isNFTAvailable = useCallback(async (tokenId: number): Promise<boolean> => {
    if (!contract) return false;
    
    try {
      return await contract.isAvailableForSale(tokenId);
    } catch {
      return false;
    }
  }, [contract]);

  return {
    // Estado
    contract,
    usdcContract,
    provider,
    contractData,
    mintStatus,
    isLoading: isLoading, // Solo el estado de carga inicial de datos del contrato
    isProcessing: isPending || isConfirming, // Estado de procesamiento de transacciones
    isConnected: !!address,
    userAddress: address,
    currentStep,
    pendingMintCount,
    
    // Funciones
    loadContractData,
    refreshContractData,
    buyNFTs,
    resetMintStatus,
    cancelMint,
    isNFTAvailable
  };
};

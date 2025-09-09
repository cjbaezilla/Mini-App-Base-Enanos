'use client';

import { useState, useEffect } from 'react';
import { useNFTContractV2 as useNFTContract } from '../../lib/hooks/useNFTContractV2';
import { ContractStatus } from '../components/ContractStatus';
import { MintInfo } from '../components/MintInfo';
import { MintButton } from '../components/MintButton';

export default function MintPage() {
  const [mintCount, setMintCount] = useState(1);
  const {
    contractData,
    mintStatus,
    isLoading,
    isConnected,
    buyNFTs,
    resetMintStatus,
    cancelMint
  } = useNFTContract();

  const handleMint = async () => {
    if (!isConnected) {
      return;
    }

    try {
      await buyNFTs(mintCount);
    } catch {
      // Error minting NFTs
    }
  };

  // Resetear estado de mint después de un tiempo apropiado
  useEffect(() => {
    if (mintStatus.status === 'success') {
      // Resetear después de 6 segundos para éxito
      const timer = setTimeout(() => {
        resetMintStatus();
      }, 6000);
      return () => clearTimeout(timer);
    } else if (mintStatus.status === 'error') {
      // Resetear después de 10 segundos para errores (más tiempo para leer el mensaje)
      const timer = setTimeout(() => {
        resetMintStatus();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [mintStatus.status, resetMintStatus]);

  // Calcular valores para mostrar
  const totalSupply = contractData?.maxSupply || 188;
  const mintedCount = totalSupply - (contractData?.availableTokens || 0);
  const mintPrice = contractData?.price || 1;
  const maxMintable = Math.min(
    contractData?.remainingTokens || 0,
    contractData?.availableTokens || 0,
    10 // Máximo por transacción según el contrato
  );

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
              Forja de Enanos
            </h1>
            <p className="text-amber-700 dark:text-amber-300 mb-1">
              Crea tu propio enano legendario
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              {mintedCount} de {totalSupply} enanos minteados
            </p>
          </div>
        </div>

        {/* Estado del contrato y balance del usuario */}
        <div className="mb-8">
          <ContractStatus />
        </div>

        {/* Información de Mint */}
        <div className="mb-8">
          <MintInfo
            mintCount={mintCount}
            setMintCount={setMintCount}
            mintPrice={mintPrice}
            maxMintable={maxMintable}
            isLoading={isLoading}
          />
        </div>

        {/* Botón de Mint */}
        <div className="mb-8">
          <MintButton
            onMint={handleMint}
            onCancel={cancelMint}
            mintCount={mintCount}
            mintPrice={mintPrice}
            maxMintable={maxMintable}
            isLoading={isLoading}
            mintStatus={mintStatus}
            isConnected={isConnected}
          />
        </div>


      </div>
    </div>
  );
}

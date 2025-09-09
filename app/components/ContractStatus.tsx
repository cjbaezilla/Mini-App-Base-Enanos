'use client';

import { useEffect } from 'react';
import { useNFTContract } from '../../lib/hooks/useNFTContract';
import { useUSDCBalance } from '../../lib/hooks/useUSDCBalance';
import { Icon } from './ui/Icon';

export function ContractStatus() {
  const { contractData, isLoading, isConnected, mintStatus, refreshContractData } = useNFTContract();
  const { usdcBalance, isLoading: usdcLoading, error, refetch: refetchUSDC } = useUSDCBalance();

  // Actualizar balances cuando la compra sea exitosa
  useEffect(() => {
    if (mintStatus.status === 'success') {
      // Pequeño delay para asegurar que la transacción se haya procesado
      setTimeout(() => {
        refetchUSDC();
        refreshContractData(); // Actualizar también el balance de NFTs
      }, 1000);
    }
  }, [mintStatus.status, refetchUSDC, refreshContractData]);

  // Actualización periódica de ambos balances cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        refetchUSDC();
        refreshContractData(); // Actualizar también el balance de NFTs
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isConnected, refetchUSDC, refreshContractData]);

  if (!isConnected || !contractData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-800/30 dark:to-emerald-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-4 border-2 border-green-300 dark:border-green-700 shadow-lg">
      <h3 className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-base mb-1.5 sm:mb-2 text-center">
        Estado del Contrato
      </h3>
      
      {/* Layout de 2 columnas */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-4">
        {/* Columna izquierda - Estado del contrato */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-center space-x-1 mb-0.5 sm:mb-1">
              <Icon name="users" className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
              <h4 className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-sm">Disponibles</h4>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm sm:text-lg font-bold text-center">
              {isLoading ? '...' : contractData.availableTokens}
            </p>
          </div>
          
          <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-center space-x-1 mb-0.5 sm:mb-1">
              <Icon name="trending-up" className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
              <h4 className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-sm">Minteados</h4>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm sm:text-lg font-bold text-center">
              {isLoading ? '...' : contractData.maxSupply - contractData.availableTokens}
            </p>
          </div>
          
          {/* Barra de progreso compacta */}
          <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-center space-x-1 mb-0.5 sm:mb-1">
              <Icon name="bar-chart" className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-sm">Progreso</span>
            </div>
            <div className="text-center">
              <div className="text-green-700 dark:text-green-300 text-xs sm:text-sm font-bold mb-0.5 sm:mb-1">
                {Math.round(((contractData.maxSupply - contractData.availableTokens) / contractData.maxSupply) * 100)}%
              </div>
              <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-1 sm:h-2">
                <div 
                  className="bg-green-600 dark:bg-green-400 h-1 sm:h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((contractData.maxSupply - contractData.availableTokens) / contractData.maxSupply) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Balance del usuario */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="bg-blue-50/80 dark:bg-blue-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-center space-x-1 mb-0.5 sm:mb-1">
              <Icon name="wallet" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-blue-800 dark:text-blue-200 font-bold text-xs sm:text-sm">USDC</h4>
            </div>
            <div className="text-blue-700 dark:text-blue-300 text-sm sm:text-lg font-bold text-center">
              {usdcLoading ? (
                <div className="flex items-center justify-center space-x-1">
                  <div className="animate-spin w-3 h-3 border border-blue-300 border-t-blue-600 rounded-full"></div>
                  <span className="text-xs">Actualizando...</span>
                </div>
              ) : error ? (
                <span className="text-red-500 text-xs">Error</span>
              ) : (
                `${usdcBalance.toFixed(2)}`
              )}
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-0.5 sm:mt-1 text-center">
                {error}
              </p>
            )}
          </div>
          
          <div className="bg-blue-50/80 dark:bg-blue-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-center space-x-1 mb-0.5 sm:mb-1">
              <Icon name="users" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-blue-800 dark:text-blue-200 font-bold text-xs sm:text-sm">Tus NFTs</h4>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-lg font-bold text-center">
              {contractData.userNFTBalance || 0}
            </p>
          </div>
          
          {/* Información adicional compacta */}
          <div className="bg-blue-50/80 dark:bg-blue-900/50 rounded-md sm:rounded-lg p-1 sm:p-3 border border-blue-200 dark:border-blue-700">
            <div className="text-center">
              <div className="text-blue-800 dark:text-blue-200 font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">Precio</div>
              <div className="text-blue-700 dark:text-blue-300 text-sm sm:text-lg font-bold">
                {contractData.price || 1} USDC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

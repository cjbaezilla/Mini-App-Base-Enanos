'use client';

import { useNFTContract } from '../../lib/hooks/useNFTContract';
import { Icon } from './ui/Icon';

export function ContractInfo() {
  const { contractData, isLoading, isConnected } = useNFTContract();

  if (!isConnected || !contractData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-800/30 dark:to-emerald-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-2 sm:p-4 mb-3 sm:mb-6 border-2 border-green-300 dark:border-green-700 shadow-lg">
      <h3 className="text-green-800 dark:text-green-200 font-bold text-sm sm:text-base mb-2 text-center">
        Estado del Contrato
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
        <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-green-200 dark:border-green-700">
          <Icon name="users" className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 mx-auto mb-0.5 sm:mb-1" />
          <h4 className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-sm">Disponibles</h4>
          <p className="text-green-700 dark:text-green-300 text-sm sm:text-lg font-bold">
            {isLoading ? '...' : contractData.availableTokens}
          </p>
        </div>
        <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-green-200 dark:border-green-700">
          <Icon name="trending-up" className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400 mx-auto mb-0.5 sm:mb-1" />
          <h4 className="text-green-800 dark:text-green-200 font-bold text-xs sm:text-sm">Minteados</h4>
          <p className="text-green-700 dark:text-green-300 text-sm sm:text-lg font-bold">
            {isLoading ? '...' : contractData.maxSupply - contractData.availableTokens}
          </p>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="bg-green-50/80 dark:bg-green-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="bar-chart" className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            <div className="flex-1">
              <div className="flex justify-between text-xs sm:text-sm text-green-700 dark:text-green-300 mb-1">
                <span>Progreso</span>
                <span>{Math.round(((contractData.maxSupply - contractData.availableTokens) / contractData.maxSupply) * 100)}%</span>
              </div>
              <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-2">
                <div 
                  className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((contractData.maxSupply - contractData.availableTokens) / contractData.maxSupply) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

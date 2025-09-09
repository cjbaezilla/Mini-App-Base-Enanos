'use client';

import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { useUSDCBalance } from '../../lib/hooks/useUSDCBalance';

interface MintButtonProps {
  onMint: () => void;
  onCancel?: () => void;
  mintCount: number;
  mintPrice: number;
  maxMintable: number;
  isLoading: boolean;
  mintStatus: {
    status: string;
    message: string;
    transactionHash?: string;
  };
  isConnected: boolean;
}

export const MintButton = ({
  onMint,
  onCancel,
  mintCount,
  mintPrice,
  maxMintable,
  isLoading,
  mintStatus,
  isConnected
}: MintButtonProps) => {
  const { usdcBalance } = useUSDCBalance();

  const getStatusIcon = () => {
    switch (mintStatus.status) {
      case 'approving':
        return (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
            <span className="text-xs text-amber-600">Aprobando USDC...</span>
          </div>
        );
      case 'minting':
        return (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
            <span className="text-xs text-amber-600">{mintStatus.message || 'Procesando...'}</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center space-x-2">
            <Icon name="check" className="text-green-600 w-4 h-4" />
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-2">
            <Icon name="x" className="text-red-600 w-4 h-4" />
            <span className="text-xs text-red-600">Error</span>
          </div>
        );
      default:
        return null;
    }
  };

  const isInsufficientBalance = usdcBalance < mintPrice * mintCount;
  const isTransactionProcessing = mintStatus.status === 'approving' || mintStatus.status === 'minting';
  const isDisabled = isLoading || 
    isTransactionProcessing ||
    maxMintable === 0 ||
    isInsufficientBalance;

  const getButtonText = () => {
    if (mintStatus.status === 'approving') return 'Aprobando USDC...';
    if (mintStatus.status === 'minting') return 'Comprando Enanos...';
    if (maxMintable === 0) return 'No disponible';
    if (isInsufficientBalance) return 'Balance insuficiente';
    return `Comprar ${mintCount} Enano${mintCount > 1 ? 's' : ''}`;
  };


  return (
    <div className="text-center">
      <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-4 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
        {!isConnected ? (
          <div className="space-y-2">
            <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-base mb-3">
              Conecta tu wallet para comprar Enanos de Leyenda
            </p>
            <p className="text-amber-600 dark:text-amber-400 text-xs">
              Usa la autenticación de Base App para continuar
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={isTransactionProcessing ? undefined : onMint}
                disabled={isDisabled}
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none touch-manipulation flex-1"
                icon={
                  isTransactionProcessing ? 
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-5 sm:w-5 border-b-2 border-white"></div> : 
                  <Icon name="plus" className="w-3 h-3 sm:w-5 sm:h-5" />
                }
              >
                {getButtonText()}
              </Button>
              
              {isTransactionProcessing && onCancel && (
                <Button
                  onClick={onCancel}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium shadow-lg transform hover:scale-105 transition-all touch-manipulation"
                  icon={<Icon name="x" className="w-3 h-3 sm:w-4 sm:h-4" />}
                >
                  Cancelar
                </Button>
              )}
            </div>
            
            {mintStatus.status === 'success' && (
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                {getStatusIcon()}
                <span className="font-medium text-green-600">
                  {mintStatus.message}
                </span>
              </div>
            )}
            
            {mintStatus.status === 'error' && (
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                {getStatusIcon()}
                <span className="font-medium text-red-600">
                  {mintStatus.message}
                </span>
              </div>
            )}

            {mintStatus.transactionHash && (
              <div className="mt-2">
                <a
                  href={`https://basescan.org/tx/${mintStatus.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 text-xs hover:underline"
                >
                  Ver en BaseScan
                </a>
              </div>
            )}
          </div>
        )}
        
        <p className="text-amber-600 dark:text-amber-400 text-xs sm:text-sm mt-1.5 sm:mt-3">
          Cada enano es único y generado aleatoriamente
        </p>
      </div>
    </div>
  );
};

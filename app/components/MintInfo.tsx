'use client';

import { Icon } from './ui/Icon';

interface MintInfoProps {
  mintCount: number;
  setMintCount: (count: number) => void;
  mintPrice: number;
  maxMintable: number;
  isLoading: boolean;
}

export const MintInfo = ({ 
  mintCount, 
  setMintCount, 
  mintPrice, 
  maxMintable, 
  isLoading 
}: MintInfoProps) => {
  const formatPrice = (price: number) => {
    return `${price} USDC`;
  };

  return (
    <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-4 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {/* Precio */}
        <div className="text-center">
          <div className="bg-amber-50/80 dark:bg-amber-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-amber-200 dark:border-amber-700">
            <Icon name="coin" className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 mx-auto mb-0.5 sm:mb-1" />
            <h3 className="text-amber-800 dark:text-amber-200 font-bold text-xs sm:text-base">Precio</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-lg font-bold">
              {formatPrice(mintPrice)}
            </p>
          </div>
        </div>

        {/* Cantidad */}
        <div className="text-center">
          <div className="bg-amber-50/80 dark:bg-amber-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-amber-200 dark:border-amber-700">
            <Icon name="users" className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 mx-auto mb-0.5 sm:mb-1" />
            <h3 className="text-amber-800 dark:text-amber-200 font-bold text-xs sm:text-base">Cantidad</h3>
            <div className="flex items-center justify-center space-x-0.5 sm:space-x-2 mt-0.5 sm:mt-1">
              <button
                onClick={() => setMintCount(Math.max(1, mintCount - 1))}
                disabled={mintCount <= 1 || isLoading}
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
              >
                <Icon name="minus" className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <span className="text-amber-700 dark:text-amber-300 text-sm sm:text-lg font-bold px-1 sm:px-3">{mintCount}</span>
              <button
                onClick={() => setMintCount(Math.min(maxMintable, mintCount + 1))}
                disabled={mintCount >= maxMintable || isLoading}
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
              >
                <Icon name="plus" className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
            <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
              Máx: {maxMintable}
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="text-center">
          <div className="bg-amber-50/80 dark:bg-amber-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-amber-200 dark:border-amber-700">
            <Icon name="calculator" className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 mx-auto mb-0.5 sm:mb-1" />
            <h3 className="text-amber-800 dark:text-amber-200 font-bold text-xs sm:text-base">Total</h3>
            <p className="text-amber-700 dark:text-amber-300 text-sm sm:text-lg font-bold">
              {formatPrice(mintPrice * mintCount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

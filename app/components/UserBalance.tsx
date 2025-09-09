'use client';

import { Icon } from './ui/Icon';
import { useUSDCBalance } from '../../lib/hooks/useUSDCBalance';

interface UserBalanceProps {
  userNFTBalance: number;
  isConnected: boolean;
}

export const UserBalance = ({ userNFTBalance, isConnected }: UserBalanceProps) => {
  const { usdcBalance, isLoading, error } = useUSDCBalance();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-800/30 dark:to-indigo-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-2 sm:p-4 mb-3 sm:mb-6 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
        <div className="bg-blue-50/80 dark:bg-blue-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-blue-200 dark:border-blue-700">
          <Icon name="wallet" className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 mx-auto mb-0.5 sm:mb-1" />
          <h3 className="text-blue-800 dark:text-blue-200 font-bold text-xs sm:text-base">Tu Balance USDC</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-lg font-bold">
            {isLoading ? (
              <div className="animate-pulse">...</div>
            ) : error ? (
              <span className="text-red-500 text-xs">Error</span>
            ) : (
              `${usdcBalance.toFixed(2)} USDC`
            )}
          </p>
          {error && (
            <p className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}
        </div>
        <div className="bg-blue-50/80 dark:bg-blue-900/50 rounded-md sm:rounded-lg p-1.5 sm:p-3 border border-blue-200 dark:border-blue-700">
          <Icon name="users" className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 mx-auto mb-0.5 sm:mb-1" />
          <h3 className="text-blue-800 dark:text-blue-200 font-bold text-xs sm:text-base">Tus NFTs</h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-lg font-bold">
            {userNFTBalance}
          </p>
        </div>
      </div>
    </div>
  );
};

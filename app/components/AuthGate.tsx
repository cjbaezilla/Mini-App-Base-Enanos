'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAccount } from 'wagmi';
import { Icon } from './ui/Icon';

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { context } = useMiniKit();
  const { address, isConnected } = useAccount();

  // Usar datos del contexto para mostrar información del usuario (solo para UI)
  const displayName = context?.user?.displayName ?? 'Usuario';

  if (!isConnected || !address) {
    return (
      <div className="text-center py-2 sm:py-4">
        <div className="relative bg-gradient-to-br from-amber-50/90 via-orange-50/90 to-yellow-50/90 dark:from-amber-900/40 dark:via-orange-900/40 dark:to-yellow-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-amber-200/50 dark:border-amber-600/50 shadow-2xl max-w-md sm:max-w-lg mx-auto overflow-hidden">
          {/* Efecto de partículas de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
          </div>
          
          {/* Contenido principal */}
          <div className="relative z-10">
            {/* Icono principal con animación */}
            <div className="relative mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Icon name="wallet" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              {/* Anillo de pulso */}
              <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto border-2 border-amber-400 rounded-full animate-ping opacity-20"></div>
            </div>

            {/* Título principal */}
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent mb-3 sm:mb-4">
              Conecta tu Wallet
            </h2>

            {/* Descripción principal */}
            <p className="text-amber-700 dark:text-amber-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed font-medium">
              Para comprar Enanos de Leyenda, necesitas conectar tu wallet de Base App
            </p>

            {/* Card de información adicional */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-amber-200/50 dark:border-amber-600/50 mb-4 sm:mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="shield" className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 font-semibold text-sm sm:text-base">
                  Seguro y Confiable
                </span>
              </div>
              <p className="text-amber-600 dark:text-amber-400 text-sm">
                Usa la autenticación integrada de Base App
              </p>
            </div>

            {/* Indicador de estado */}
            <div className="flex items-center justify-center space-x-2 text-amber-600 dark:text-amber-400">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Esperando conexión...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Información del usuario */}
      <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 dark:from-purple-800/30 dark:to-pink-800/30 backdrop-blur-md rounded-lg sm:rounded-2xl p-2 sm:p-4 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="user" className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
          <div className="text-center">
            <h3 className="text-purple-800 dark:text-purple-200 font-bold text-sm sm:text-base">
              ¡Hola, {displayName}!
            </h3>
            {address && (
              <p className="text-purple-600 dark:text-purple-400 text-xs font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
}

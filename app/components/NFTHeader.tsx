'use client';

import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useConnect, useConnectors, useAccount, useDisconnect } from "wagmi";
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { SocialIcons } from './SocialIcons';
import { useFarcasterContext } from '../../lib/hooks/useFarcasterContext';
import { useHydration } from '../../lib/hooks/useHydration';
import Link from 'next/link';

interface NFTHeaderProps {
  title: string;
  subtitle: string;
}

export function NFTHeader({ title, subtitle }: NFTHeaderProps) {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();
  const { address, isConnected } = useAccount();
  const { isInFarcaster, isLoading } = useFarcasterContext();
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();
  const isHydrated = useHydration();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleConnectWallet = useCallback(async () => {
    console.log('Connect wallet button clicked');
    try {
      console.log('Attempting to connect wallet...');
      
      // Buscar el conector inyectado (MetaMask, etc.)
      const injectedConnector = connectors.find(connector => 
        connector.type === 'injected' || connector.name === 'MetaMask'
      );
      
      if (injectedConnector) {
        console.log('Using injected connector:', injectedConnector.name);
        await connect({ connector: injectedConnector });
      } else {
        console.log('No injected connector found, trying first available connector');
        await connect({ connector: connectors[0] });
      }
      
      console.log('Wallet connection successful');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, [connect, connectors]);

  const handleDisconnectWallet = useCallback(() => {
    console.log('Disconnecting wallet...');
    disconnect();
  }, [disconnect]);

  const formatAddress = useCallback((addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }, []);

  const headerButton = useMemo(() => {
    console.log('Rendering header button:', { isInFarcaster, isLoading, context, frameAdded, isConnected, address, isHydrated });
    
    // Mostrar un estado de carga consistente hasta que esté hidratado
    if (!isHydrated) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-amber-600 dark:text-amber-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 dark:border-amber-400"></div>
          <span>Cargando...</span>
        </div>
      );
    }
    
    // Mostrar loading si aún estamos detectando el contexto
    if (isLoading) {
      console.log('Showing loading state');
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-amber-600 dark:text-amber-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 dark:border-amber-400"></div>
          <span>Conectando...</span>
        </div>
      );
    }

    // Si estamos en Farcaster, mostrar el botón Save Frame
    if (isInFarcaster) {
      console.log('In Farcaster context, showing Save Frame button');
      if (!context?.client?.added || frameAdded) {
        if (frameAdded) {
          return (
            <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
              <Icon name="check" size="sm" className="text-[#0052FF]" />
              <span>Saved</span>
            </div>
          );
        }
        
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddFrame}
            className="text-[var(--app-accent)] p-4"
            icon={<Icon name="plus" size="sm" />}
          >
            Save Frame
          </Button>
        );
      }
      return null;
    }

    // Si estamos en el navegador y el usuario está conectado, mostrar su dirección
    if (isConnected && address) {
      console.log('User is connected, showing address:', address);
      console.log('Rendering connected state with green dot');
      return (
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDisconnectWallet}
            className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-amber-800 dark:text-amber-200 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 hover:from-amber-200 hover:to-orange-200 dark:hover:from-amber-700/40 dark:hover:to-orange-700/40 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600 border border-amber-200 dark:border-amber-700"
          >
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-600 dark:bg-amber-400 rounded-full flex items-center justify-center group-hover:bg-amber-700 dark:group-hover:bg-amber-300 transition-colors duration-300">
                <Icon name="user" size="sm" className="text-white dark:text-amber-900" />
              </div>
              <span className="font-mono text-xs">{formatAddress(address)}</span>
            </div>
          </button>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800 shadow-sm">
            <div className="relative">
              <span className="text-lg font-bold text-green-500 animate-pulse">●</span>
              <div className="absolute inset-0 text-lg font-bold text-green-400 animate-ping">●</div>
            </div>
            <span className="text-xs font-bold text-green-700 dark:text-green-300 tracking-wide">Conectado</span>
          </div>
        </div>
      );
    }

    // Si estamos en el navegador, mostrar el botón Connect Wallet
    console.log('In browser context, showing Connect Wallet button');
    return (
      <button
        onClick={handleConnectWallet}
        className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-600 overflow-hidden"
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Contenido del botón */}
        <div className="relative flex items-center space-x-2">
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
            <Icon name="wallet" size="sm" className="text-white" />
          </div>
          <span className="tracking-wide">Conectar Wallet</span>
        </div>
        
        {/* Efecto de pulso en el fondo */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </button>
    );
  }, [isInFarcaster, isLoading, context, frameAdded, isConnected, address, isHydrated, handleAddFrame, handleConnectWallet, handleDisconnectWallet, formatAddress]);

  return (
    <header className="px-4 py-4 border-b border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display">
          {title}
        </h1>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
          {subtitle}
        </p>
      </div>
      
      {/* Social Icons */}
      <div className="flex justify-center mt-3">
        <SocialIcons />
      </div>
      
      {/* Header Button - Save Frame or Connect Wallet */}
      <div className="flex justify-center mt-4">
        {headerButton}
      </div>
      
      {/* Guild and Voting Buttons */}
      <div className="flex justify-center gap-3 mt-3">
        <Link 
          href="/democracy"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-100 dark:bg-amber-800/30 text-amber-800 dark:text-amber-200 rounded-lg border border-amber-200 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800/50 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
          <span className="text-sm font-semibold">Nuestra Guild</span>
        </Link>
        
        <Link 
          href="/voting"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-sm font-semibold">Votar Propuestas</span>
        </Link>
      </div>
    </header>
  );
}
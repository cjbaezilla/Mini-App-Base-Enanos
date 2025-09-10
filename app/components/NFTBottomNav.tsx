import React from 'react';
import { Icon } from './ui/Icon';

type IconName = 'home' | 'nft' | 'plus' | 'mint';

interface NavItem {
  id: string;
  label: string;
  icon: IconName;
}

interface NFTBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const NFTBottomNav: React.FC<NFTBottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'mint', label: 'Mint', icon: 'mint' },
    { id: 'nft', label: 'Enanos', icon: 'nft' },
  ];

  return (
    <nav className="bg-[var(--app-paper-bg)] border-t-2 border-[var(--app-accent)] shadow-[var(--app-shadow-nav)] relative">
      <div className="flex items-center justify-center px-4 py-2 relative">
        {/* Botones laterales (Home y NFT) */}
        <div className="flex items-center justify-between w-full max-w-64">
          {navItems.filter(item => item.id !== 'mint').map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center space-y-1 py-1 px-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--app-accent)] bg-[var(--app-accent-light)] border border-[var(--app-accent)]/30 shadow-sm'
                    : 'text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)] hover:bg-[var(--app-surface-hover)] hover:border hover:border-[var(--app-surface-border)]'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size="sm" 
                  className={
                    isActive 
                      ? 'text-[var(--app-accent)]' 
                      : 'text-[var(--app-foreground-muted)]'
                  }
                />
                <span className={`font-semibold text-xs ${
                  isActive ? 'text-[var(--app-accent)]' : 'text-[var(--app-foreground-muted)]'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Botón central (Mint) */}
        {navItems.find(item => item.id === 'mint') && (
          <button
            onClick={() => onTabChange('mint')}
            className={`flex flex-col items-center space-y-1 py-3 px-4 rounded-2xl absolute z-20 -top-6 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
              activeTab === 'mint'
                ? 'text-white bg-[var(--app-accent)] border-2 border-[var(--app-accent)] shadow-2xl shadow-[var(--app-accent)]/50 scale-110'
                : 'text-white bg-[var(--app-accent)] border-2 border-[var(--app-accent)] hover:bg-[var(--app-accent)]/90 hover:shadow-xl hover:shadow-[var(--app-accent)]/30 hover:scale-110 hover:-top-8'
            }`}
          >
            <Icon 
              name="mint" 
              size="md" 
              className="text-white"
            />
            <span className="font-semibold text-sm text-white">
              Mint
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

'use client';

import { useState, useCallback } from 'react';
import { NFTBottomNav } from '../components/NFTBottomNav';
import { NFTHeader } from '../components/NFTHeader';
import { useRouter } from 'next/navigation';

export default function DemocracyPage() {
  const [activeTab, setActiveTab] = useState('democracy');
  const router = useRouter();

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'nft') {
      router.push('/nfts');
    } else if (tabId === 'mint') {
      router.push('/mint');
    } else if (tabId === 'home') {
      router.push('/');
    } else if (tabId === 'democracy') {
      router.push('/democracy');
    }
  }, [router]);

  const handleDiscordJoin = () => {
    const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/tu-servidor';
    window.open(discordUrl, '_blank');
  };

  const handleGuildJoin = () => {
    const guildUrl = process.env.NEXT_PUBLIC_GUILD_URL || 'https://era.guild.xyz/enanos-club-base';
    window.open(guildUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen font-body text-foreground mini-app-theme bg-background">
      <div className="w-full max-w-md mx-auto relative flex flex-col min-h-screen">
        {/* App Header */}
        <NFTHeader 
          title="Democracia"
          subtitle="Comunidad de Enanos"
        />
        
        {/* Main Content */}
        <main className="flex-1 px-4 py-6 relative pb-28">
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700 text-center">
              <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
                🏛️ Democracia de Enanos
              </h1>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Únete a nuestra comunidad en Discord
              </p>
            </div>

            {/* NFT Holder Benefits */}
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center border-2 border-amber-300 dark:border-amber-600">
                  <span className="text-2xl">👑</span>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                    Tu Enano, Tu Poder
                  </h2>
                  <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
                    Ser dueño de un NFT de Enano no es solo tener una imagen digital. Es formar parte de algo más grande.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/50 dark:to-orange-900/50 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
                  <div className="text-left space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-green-300 dark:border-green-600">
                        <span className="text-green-600 dark:text-green-400 text-xs">🔐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Acceso Exclusivo</h4>
                        <p className="text-amber-700 dark:text-amber-300 text-xs">Canales privados solo para poseedores de NFT</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-300 dark:border-blue-600">
                        <span className="text-blue-600 dark:text-blue-400 text-xs">💎</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Rol Personalizado</h4>
                        <p className="text-amber-700 dark:text-amber-300 text-xs">Tu enano te da identidad única en la comunidad</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-300 dark:border-purple-600">
                        <span className="text-purple-600 dark:text-purple-400 text-xs">🤝</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Conversaciones Íntimas</h4>
                        <p className="text-amber-700 dark:text-amber-300 text-xs">Discute estrategias y proyectos con otros enanos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-200/60 to-orange-200/60 dark:from-amber-700/40 dark:to-orange-700/40 rounded-lg p-4 border border-amber-300 dark:border-amber-600">
                  <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                    ¿Ya tienes tu NFT? ¡Conecta tu wallet y únete a los canales VIP donde las decisiones importantes se toman entre enanos de verdad.
                  </p>
                </div>

                {/* Guild Button */}
                <button
                  onClick={handleGuildJoin}
                  className="w-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-amber-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] border-2 border-amber-400 hover:border-amber-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <span className="text-lg tracking-wide">🔱 Unirse a Guild</span>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                </button>
              </div>
            </div>

            {/* Discord Info Card */}
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center border-2 border-amber-300 dark:border-amber-600">
                  <svg className="w-8 h-8 text-amber-700 dark:text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                    Servidor de Discord
                  </h2>
                  <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
                    Conecta con otros enanos, participa en votaciones y forma parte de la comunidad
                  </p>
                </div>

                <button
                  onClick={handleDiscordJoin}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Unirse a Discord</span>
                </button>
              </div>
            </div>


          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <NFTBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
}

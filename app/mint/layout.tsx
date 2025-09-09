'use client';

import { useState, useCallback } from "react";
import { NFTBottomNav } from "../components/NFTBottomNav";
import { NFTHeader } from "../components/NFTHeader";
import { useRouter } from "next/navigation";

export default function MintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState('mint');
  const router = useRouter();

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'nft') {
      router.push('/nfts');
    } else if (tabId === 'mint') {
      router.push('/mint');
    } else if (tabId === 'home') {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen font-body text-foreground mini-app-theme bg-background">
      <div className="w-full max-w-md mx-auto relative flex flex-col min-h-screen">
        {/* App Header */}
        <NFTHeader 
          title="Reino de los Enanos"
          subtitle="Forja de Enanos Legendarios"
        />
        
        {/* Main Content */}
        <main className="flex-1 px-0 py-1 sm:py-6 relative pb-16 sm:pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <NFTBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

      </div>
    </div>
  );
}

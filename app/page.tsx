"use client";

import { useState, useCallback } from "react";
import { Home } from "./components/Home";
import { NFTBottomNav } from "./components/NFTBottomNav";
import { NFTHeader } from "./components/NFTHeader";
import { useRouter } from "next/navigation";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
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

  return (
    <div className="flex flex-col min-h-screen font-body text-foreground mini-app-theme bg-background">
      <div className="w-full max-w-md mx-auto relative flex flex-col min-h-screen">
        
        {/* App Header */}
        <NFTHeader 
          title="Enanos Club"
          subtitle="Bienvenido a las Montañas Legendarias"
        />
        
        {/* Main Content */}
        <main className="flex-1 px-0 py-6 relative pb-20">
          <Home />
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <NFTBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

      </div>
    </div>
  );
}

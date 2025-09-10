'use client';

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  const handleTwitterClick = () => {
    window.open('https://x.com/enanos_club', '_blank');
  };

  const handleDiscordClick = () => {
    window.open('https://discord.gg/TkFVATms32', '_blank');
  };

  const handleGuildClick = () => {
    window.open('https://era.guild.xyz/enanos-club-base', '_blank');
  };

  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {/* Twitter Icon */}
      <button
        onClick={handleTwitterClick}
        className="w-10 h-10 bg-amber-100 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 rounded-full flex items-center justify-center border border-amber-200 dark:border-amber-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        aria-label="Síguenos en Twitter"
      >
        <svg 
          className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform duration-200" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* Discord Icon */}
      <button
        onClick={handleDiscordClick}
        className="w-10 h-10 bg-amber-100 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 rounded-full flex items-center justify-center border border-amber-200 dark:border-amber-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        aria-label="Únete a Discord"
      >
        <svg 
          className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform duration-200" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </button>

      {/* Guild Icon */}
      <button
        onClick={handleGuildClick}
        className="w-10 h-10 bg-amber-100 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 rounded-full flex items-center justify-center border border-amber-200 dark:border-amber-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 group shadow-sm hover:shadow-md"
        aria-label="Únete a Guild"
      >
        <svg 
          className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:scale-110 transition-transform duration-200" 
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
      </button>
    </div>
  );
}

/**
 * Header Component
 * Simple RFS branding header
 */

import rfsLogo from '../assets/rfs-logo.svg';

export function Header() {

  return (
    <header className="w-full bg-bg-header border-b border-border py-3 sm:py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src={rfsLogo} 
            alt="RFS Logo" 
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0"
          />
          <div>
            <h1 className="font-condensed font-bold text-base sm:text-lg uppercase text-text-primary">
              RFS Weather
            </h1>
            <p className="font-condensed text-xs uppercase text-text-secondary opacity-70 hidden sm:block">
              Fire Safety
            </p>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="font-mono text-xs uppercase text-text-secondary opacity-70">
            Live
          </span>
        </div>

      </div>
    </header>
  );
}


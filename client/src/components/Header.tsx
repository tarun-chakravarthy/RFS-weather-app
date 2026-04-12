/**
 * Header Component
 * Simple RFS branding header
 */

export function Header() {

  return (
    <header className="w-full bg-bg-header border-b border-border py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 font-condensed font-bold text-xs text-white"
            style={{
              backgroundColor: 'var(--rfs-red)',
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
            }}
          >
            RFS
          </div>
          <div>
            <h1 className="font-condensed font-bold text-lg uppercase text-text-primary">
              RFS Weather
            </h1>
            <p className="font-condensed text-xs uppercase text-text-secondary opacity-70">
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


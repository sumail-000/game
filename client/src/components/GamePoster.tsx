import { FC } from "react";

interface GamePosterProps {
  className?: string;
}

const GamePoster: FC<GamePosterProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full max-w-3xl h-96 rounded-lg overflow-hidden ${className}`}>
      {/* SVG Background with maze pattern */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
        <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#9900ff" />
            </linearGradient>
            <linearGradient id="gradientSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#00ff99" />
            </linearGradient>
          </defs>
          
          {/* Background grid */}
          <rect x="0" y="0" width="400" height="300" fill="#000" />
          
          {/* Grid lines */}
          <g opacity="0.2">
            {Array.from({ length: 20 }).map((_, i) => (
              <line 
                key={`h-${i}`} 
                x1="0" 
                y1={i * 15} 
                x2="400" 
                y2={i * 15} 
                stroke="#333" 
                strokeWidth="1" 
              />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line 
                key={`v-${i}`} 
                x1={i * 15} 
                y1="0" 
                x2={i * 15} 
                y2="300" 
                stroke="#333" 
                strokeWidth="1" 
              />
            ))}
          </g>
          
          {/* Maze walls - simplified for poster */}
          <g filter="url(#glow)">
            <path 
              d="M50,50 L200,50 L200,100 L150,100 L150,150 L250,150 L250,200 L100,200 L100,150 L50,150 Z" 
              stroke="url(#gradientPrimary)" 
              strokeWidth="3" 
              fill="none" 
            />
            <path 
              d="M300,50 L350,50 L350,250 L250,250 L250,200 L300,200 Z" 
              stroke="url(#gradientSecondary)" 
              strokeWidth="3" 
              fill="none" 
            />
            <circle cx="325" cy="225" r="15" fill="rgba(0,255,255,0.5)" />
          </g>
          
          {/* Player representation */}
          <circle cx="75" cy="75" r="8" fill="#ff00ff" filter="url(#glow)" />
        </svg>
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/30">
        <h2 className="text-5xl font-bold mb-4 neon-text tracking-widest text-center">NEON MAZE</h2>
        <p className="text-lg text-white text-center max-w-lg mb-6">
          Find your way through the glowing labyrinth
        </p>
        <div className="inline-block px-4 py-2 rounded border-2 border-secondary text-sm text-secondary neon-text-secondary">
          LEVEL 1 AVAILABLE NOW
        </div>
      </div>
    </div>
  );
};

export default GamePoster;

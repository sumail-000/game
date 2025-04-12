import { FC } from "react";

interface TitleScreenProps {
  onStart: () => void;
}

const TitleScreen: FC<TitleScreenProps> = ({ onStart }) => {
  return (
    <div className="title-screen">
      <h1 className="text-6xl font-bold mb-6 neon-text tracking-widest">NEON MAZE</h1>
      <p className="text-xl mb-12 text-white text-center max-w-md">
        Navigate through the glowing labyrinth and find the exit portal.
      </p>
      <button onClick={onStart} className="neon-button">
        START GAME
      </button>
      
      <div className="mt-12 text-sm text-muted-foreground flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2 text-white">CONTROLS</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-muted rounded">↑</span>
            <span>Move Forward</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-muted rounded">↓</span>
            <span>Move Backward</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-muted rounded">←</span>
            <span>Move Left</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 bg-muted rounded">→</span>
            <span>Move Right</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;


import { FC } from "react";
import { Link } from "react-router-dom";
import { useMazeGame } from "@/lib/stores/useMazeGame";

interface WinScreenProps {
  onRestart: () => void;
  onNextLevel: () => void;
}

const WinScreen: FC<WinScreenProps> = ({ onRestart, onNextLevel }) => {
  const { currentLevel, maxLevel, levelTime, score, bestTimes } = useMazeGame();
  const isLastLevel = currentLevel === maxLevel;
  
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="win-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 neon-text-accent tracking-widest">
          LEVEL COMPLETE!
        </h1>
        <div className="text-2xl mb-6 text-white">
          Time: {formatTime(levelTime)}
          {bestTimes[currentLevel] && 
            <div className="text-xl text-muted-foreground">
              Best: {formatTime(bestTimes[currentLevel])}
            </div>
          }
        </div>
        <div className="text-3xl mb-12 text-primary">
          Score: {score}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {!isLastLevel && (
            <button onClick={onNextLevel} className="neon-button">
              NEXT LEVEL
            </button>
          )}
          <button onClick={onRestart} className="neon-button">
            PLAY AGAIN
          </button>
          <Link to="/" className="neon-button" style={{ 
            color: "hsl(var(--secondary))", 
            borderColor: "hsl(var(--secondary))" 
          }}>
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;

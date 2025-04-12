import { Link } from "react-router-dom";
import { useAudio } from "@/lib/stores/useAudio";
import Footer from "./Footer";

export default function AboutPage() {
  const { toggleMute, isMuted } = useAudio();

  const handleSoundToggle = () => {
    toggleMute();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <header className="w-full py-6 px-4 flex justify-between items-center border-b border-border">
        <Link to="/" className="text-4xl font-bold neon-text tracking-wider">NEON MAZE</Link>
        <div className="flex items-center gap-4">
          <button onClick={handleSoundToggle} className="p-2 rounded-full">
            {isMuted ? (
              <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          <Link to="/" className="px-4 py-2 rounded-md bg-card hover:bg-card/80 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-6 neon-text tracking-wider">ABOUT NEON MAZE</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg border border-primary">
            <h2 className="text-2xl font-bold mb-4 neon-text">The Game</h2>
            <p className="text-muted-foreground mb-4">
              Neon Maze is a first-person maze navigation game set in a vibrant neon-themed virtual world. 
              Players must find their way through increasingly complex labyrinths to locate the exit portal 
              and advance to the next level.
            </p>
            <p className="text-muted-foreground">
              With its striking visual aesthetic inspired by 80s retro futurism and arcade games, 
              Neon Maze combines puzzle-solving and spatial awareness in an immersive 3D environment.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-secondary">
            <h2 className="text-2xl font-bold mb-4 neon-text-secondary">Technology</h2>
            <p className="text-muted-foreground mb-4">
              Built with modern web technologies including React, Three.js, and React Three Fiber, 
              Neon Maze delivers a smooth 3D gaming experience directly in your browser. 
            </p>
            <p className="text-muted-foreground">
              The game features procedurally generated mazes, ensuring that no two playthroughs are exactly 
              the same. The depth-first search algorithm creates complex but always solvable maze patterns.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-accent">
            <h2 className="text-2xl font-bold mb-4 neon-text-accent">Development</h2>
            <p className="text-muted-foreground mb-4">
              Neon Maze was developed as a passion project, combining a love for arcade aesthetics 
              with modern web development techniques. The game continues to evolve with new features 
              and maze challenges being added regularly.
            </p>
            <p className="text-muted-foreground">
              Future updates will include more complex maze patterns, additional gameplay mechanics, 
              and expanded difficulty levels for both casual and hardcore players.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/game" className="neon-button">
            PLAY NOW
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
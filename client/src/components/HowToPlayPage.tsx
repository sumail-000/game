import { Link } from "react-router-dom";
import { useAudio } from "@/lib/stores/useAudio";
import Footer from "./Footer";

export default function HowToPlayPage() {
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
          <h1 className="text-5xl font-bold mb-6 neon-text tracking-wider">HOW TO PLAY</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </div>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg border border-primary">
            <h2 className="text-2xl font-bold mb-4 neon-text">Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  Neon Maze is played using the keyboard arrow keys or WASD keys:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-muted">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </span>
                    <span>Move Forward (W or ↑)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-muted">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                    <span>Move Backward (S or ↓)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-muted">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </span>
                    <span>Move Left (A or ←)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded bg-muted">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span>Move Right (D or →)</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[200px] grid grid-cols-3 grid-rows-3 gap-2">
                  <div className="col-start-2">
                    <div className="flex items-center justify-center w-14 h-14 rounded bg-primary/20 border border-primary text-primary">W</div>
                  </div>
                  <div></div>
                  <div>
                    <div className="flex items-center justify-center w-14 h-14 rounded bg-primary/20 border border-primary text-primary">A</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-14 h-14 rounded bg-primary/20 border border-primary text-primary">S</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-14 h-14 rounded bg-primary/20 border border-primary text-primary">D</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-secondary">
            <h2 className="text-2xl font-bold mb-4 neon-text-secondary">Objective</h2>
            <p className="text-muted-foreground mb-4">
              Your goal is to navigate through the neon maze and find the exit portal to advance to the next level.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-black/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Portal</h3>
                <p className="text-muted-foreground">
                  The exit portal glows with a bright cyan/teal color. When you reach it, you'll be transported to the next level or complete the game.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-primary">Maze Walls</h3>
                <p className="text-muted-foreground">
                  Neon walls in pink and cyan colors block your path. You cannot walk through them and must find a path around them.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border border-accent">
            <h2 className="text-2xl font-bold mb-4 neon-text-accent">Tips & Strategies</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">1</span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-white">Right-hand rule:</span> Keep your right hand on the wall and follow it. In many mazes, this will eventually lead you to the exit.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">2</span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-white">Look for patterns:</span> Our mazes are procedurally generated, but they often contain recognizable patterns you can learn to navigate.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">3</span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-white">Mental mapping:</span> Try to build a mental map of the maze as you explore. Remember which paths you've already tried.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">4</span>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-white">Exit is usually far:</span> The exit portal is typically placed at the furthest point from the start, so be prepared for a journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/game" className="neon-button">
            START PLAYING
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { Link } from "react-router-dom";
import { useAudio } from "@/lib/stores/useAudio";
import Footer from "./Footer";
import GamePoster from "./GamePoster";

export default function HomePage() {
  const { toggleMute, isMuted } = useAudio();

  const handleSoundToggle = () => {
    toggleMute();
  };

  const handleStartGame = () => {
    // Play the background music when starting the game
    const { backgroundMusic, isMuted } = useAudio.getState();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <header className="w-full py-6 px-4 flex justify-between items-center border-b border-border">
        <h1 className="text-4xl font-bold neon-text tracking-wider">NEON MAZE</h1>
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
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 neon-text-accent tracking-widest">ENTER THE MAZE</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Navigate through complex neon labyrinths, find the portal, and escape to victory. 
            Can you master the challenge?
          </p>
        </div>

        <GamePoster className="mb-12" />

        <Link 
          to="/game" 
          className="neon-button mb-16"
          onClick={handleStartGame}
        >
          GET STARTED
        </Link>

        {/* Game Features Showcase */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text">GAME FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mx-auto">
            <div className="bg-card p-6 rounded-lg border border-accent">
              <h3 className="text-xl font-semibold mb-3 neon-text-accent">COMPLEX MAZES</h3>
              <p className="text-muted-foreground">Navigate through intricate paths with twists, turns, and dead ends.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-primary">
              <h3 className="text-xl font-semibold mb-3 neon-text">NEON VISUALS</h3>
              <p className="text-muted-foreground">Immerse yourself in stunning neon aesthetics that light up the darkness.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-secondary">
              <h3 className="text-xl font-semibold mb-3 neon-text-secondary">CHALLENGING GAMEPLAY</h3>
              <p className="text-muted-foreground">Test your navigation skills and spatial awareness in this maze adventure.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-primary">
              <h3 className="text-xl font-semibold mb-3 neon-text">DYNAMIC CONTROLS</h3>
              <p className="text-muted-foreground">Responsive keyboard controls for precise movement through the maze.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-secondary">
              <h3 className="text-xl font-semibold mb-3 neon-text-secondary">IMMERSIVE AUDIO</h3>
              <p className="text-muted-foreground">Atmospheric soundtrack and sound effects that enhance the gaming experience.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-accent">
              <h3 className="text-xl font-semibold mb-3 neon-text-accent">LEVEL PROGRESSION</h3>
              <p className="text-muted-foreground">Increasing difficulty with each level to keep you engaged and challenged.</p>
            </div>
          </div>
        </section>

        {/* Featured Game Levels */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text-secondary">FEATURED LEVELS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl w-full mx-auto">
            <div className="bg-black/50 rounded-lg overflow-hidden border border-primary/50 hover:border-primary transition-all">
              <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                <div className="text-6xl font-bold neon-text">1</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold neon-text">STARTER MAZE</h3>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">EASY</span>
                </div>
                <p className="text-sm text-muted-foreground">Your first challenge to learn the basics.</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-lg overflow-hidden border border-secondary/50 hover:border-secondary transition-all">
              <div className="h-48 bg-gradient-to-br from-cyan-900/50 to-teal-900/50 flex items-center justify-center">
                <div className="text-6xl font-bold neon-text-secondary">2</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold neon-text-secondary">TWISTY PATHS</h3>
                  <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded">MEDIUM</span>
                </div>
                <p className="text-sm text-muted-foreground">More complex pathways test your navigation.</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-lg overflow-hidden border border-accent/50 hover:border-accent transition-all">
              <div className="h-48 bg-gradient-to-br from-red-900/50 to-orange-900/50 flex items-center justify-center">
                <div className="text-6xl font-bold neon-text-accent">3</div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold neon-text-accent">DEEP LABYRINTH</h3>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">HARD</span>
                </div>
                <p className="text-sm text-muted-foreground">A complex maze with many dead ends.</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all">
              <div className="h-48 bg-gradient-to-br from-gray-900/50 to-gray-800/50 flex items-center justify-center relative">
                <div className="text-4xl font-bold text-gray-700">?</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-3 py-1 bg-black/70 text-white text-sm rotate-12 border border-gray-700">COMING SOON</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-400">MYSTERIOUS REALM</h3>
                  <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">EXTREME</span>
                </div>
                <p className="text-sm text-gray-500">Unlock this special level in a future update.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest News/Updates */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text">LATEST UPDATES</h2>
          <div className="max-w-4xl w-full mx-auto bg-black/30 rounded-lg overflow-hidden border border-primary/30">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold neon-text">VERSION 1.0 RELEASE</h3>
                <span className="text-xs text-muted-foreground">NEW</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Welcome to the official release of Neon Maze! We're excited to bring you this immersive maze experience 
                with glowing neon aesthetics and challenging gameplay.
              </p>
              <div className="mb-6 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <p className="text-sm text-muted-foreground">Initial release with 3 levels of increasing difficulty</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <p className="text-sm text-muted-foreground">Responsive controls with keyboard navigation</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <p className="text-sm text-muted-foreground">Dynamic maze generation algorithm for unique experiences</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <p className="text-sm text-muted-foreground">Atmospheric sound effects and background music</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground border-t border-primary/20 pt-4">
                <p className="italic">Coming soon: New maze levels, additional visual themes, and performance enhancements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Leaderboard Preview */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text-accent">TOP CHALLENGERS</h2>
          <div className="max-w-4xl w-full mx-auto">
            <div className="bg-black/50 rounded-lg overflow-hidden border border-accent/30 mb-6">
              <div className="p-4 bg-accent/10 border-b border-accent/20 flex justify-between items-center">
                <span className="font-semibold text-accent">PLAYER</span>
                <span className="font-semibold text-accent">COMPLETION TIME</span>
              </div>
              <div className="divide-y divide-accent/10">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-mono">1</span>
                    <span className="text-white">NeonRider</span>
                  </div>
                  <span className="text-accent font-mono">00:45.23</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-mono">2</span>
                    <span className="text-white">MazeMaster</span>
                  </div>
                  <span className="text-accent font-mono">00:52.17</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-mono">3</span>
                    <span className="text-white">GlowRunner</span>
                  </div>
                  <span className="text-accent font-mono">01:03.89</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link 
                to="/game" 
                className="inline-block px-6 py-3 bg-accent/20 hover:bg-accent/30 text-accent rounded-md transition-colors border border-accent/50"
                onClick={handleStartGame}
              >
                JOIN THE COMPETITION
              </Link>
            </div>
          </div>
        </section>

        {/* Game Tips & Strategies */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text-secondary">TIPS & STRATEGIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto">
            <div className="bg-black/50 rounded-lg overflow-hidden border border-secondary/30 p-6">
              <h3 className="text-xl font-semibold mb-4 neon-text-secondary">NAVIGATION TECHNIQUES</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Use the right-hand rule: Keep your right hand on the wall to explore the entire maze systematically.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Look for visual patterns in the maze structure to identify potential paths.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Take mental notes of dead ends to avoid revisiting them.</p>
                </li>
              </ul>
            </div>
            <div className="bg-black/50 rounded-lg overflow-hidden border border-secondary/30 p-6">
              <h3 className="text-xl font-semibold mb-4 neon-text-secondary">SPEED RUNNING</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Practice memorizing maze layouts for faster completion times.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Use momentum to your advantage when turning corners.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary text-lg">→</span>
                  <p className="text-muted-foreground">Master the keyboard controls for precise and quick movements.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Neon Maze Universe */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center neon-text">NEON MAZE UNIVERSE</h2>
          <div className="max-w-4xl w-full mx-auto bg-black/30 rounded-lg overflow-hidden border border-primary/30 p-6">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              In the distant future, the Neon Maze was created as the ultimate challenge for the most skilled navigators. 
              These digital labyrinths exist in a virtual dimension where light, sound, and geometry merge to create 
              spectacular challenges that test the limits of human perception and spatial reasoning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-black/50 p-4 rounded border border-primary/20">
                <h3 className="text-lg font-semibold mb-2 neon-text">THE PORTALS</h3>
                <p className="text-sm text-muted-foreground">
                  The glowing portals that mark the end of each maze are not just exits—they're gateways to more 
                  complex dimensions. Each successful traversal earns the navigator access to increasingly intricate challenges.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded border border-secondary/20">
                <h3 className="text-lg font-semibold mb-2 neon-text-secondary">THE ARCHITECTS</h3>
                <p className="text-sm text-muted-foreground">
                  Nobody knows who created the Neon Maze. The mysterious Architects left no trace of their identity, 
                  only the ever-shifting walls of light that challenge all who enter.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Will you uncover the secrets of the Neon Maze and become one of the legendary navigators whose names 
              are whispered throughout the digital realm?
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

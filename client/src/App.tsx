import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { useAudio } from "./lib/stores/useAudio";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import AboutPage from "./components/AboutPage";
import HowToPlayPage from "./components/HowToPlayPage";
import ContactPage from "./components/ContactPage";
import NotFound from "./pages/not-found";
import "@fontsource/inter";

function App() {
  // Initialize audio elements
  useEffect(() => {
    // Create and set up background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    
    // Create sound effects
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");
    
    // Store audio elements in the global store
    const audioStore = useAudio.getState();
    audioStore.setBackgroundMusic(bgMusic);
    audioStore.setHitSound(hitSound);
    audioStore.setSuccessSound(successSound);

    // Clean up function
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-to-play" element={<HowToPlayPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;

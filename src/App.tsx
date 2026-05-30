import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import KomorebiBackground from './components/KomorebiBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Hide intro after 5.5 seconds (gives enough time for staggered text animations and reading)
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative bg-[#08100D] transition-colors duration-1000 ${showIntro ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      {/* Background Layer (Continuous) */}
      <KomorebiBackground />
      
      {/* Intro Animation Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#08100D]/40 backdrop-blur-sm"
          >
            <div className="text-center px-4 w-full max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#A5D6A7] tracking-[0.3em] pl-[0.3em] text-xs md:text-sm block mb-8 uppercase font-sans font-medium drop-shadow-md"
              >
                Manga Artist & Illustrator
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#E8F0EB] tracking-widest pl-[0.1em] mb-10 drop-shadow-lg"
              >
                微光與茉色
              </motion.h1>
              
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "4rem", opacity: 1 }}
                transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
                className="h-[1px] bg-[#A5D6A7]/40 mx-auto mb-10"
              />

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <p className="text-[#E8F0EB]/90 tracking-[0.15em] pl-[0.15em] text-sm md:text-base font-light drop-shadow">
                  以筆尖編織夢境，探尋樹影間遺落的故事。
                </p>
                <p className="text-[#A5D6A7]/70 text-xs md:text-sm tracking-[0.05em] font-sans drop-shadow-sm max-w-lg mx-auto">
                  Tracing dreams through pen strokes, discovering stories left in the shadows of leaves.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Scrollable Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.2, delay: showIntro ? 0 : 0.5, ease: "easeIn" }}
        className={`relative z-10 w-full h-full ${showIntro ? 'pointer-events-none' : ''}`}
      >
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <About />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

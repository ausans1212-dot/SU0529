import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import KomorebiBackground from './components/KomorebiBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const [appState, setAppState] = useState<'intro' | 'languageSelect' | 'main'>('intro');
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    // Hide intro after 5.5 seconds (gives enough time for staggered text animations and reading)
    const timer = setTimeout(() => {
      setAppState('languageSelect');
    }, 5500); 
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    setAppState('main');
  };

  return (
    <div className={`relative bg-[#08100D] transition-colors duration-1000 ${appState !== 'main' ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      {/* Background Layer (Continuous) */}
      <KomorebiBackground />
      
      {/* Intro Animation Overlay */}
      <AnimatePresence mode="wait">
        {appState === 'intro' && (
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
                Moonlight Jasmine
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#E8F0EB] tracking-widest pl-[0.1em] mb-10 drop-shadow-lg"
              >
                {language === 'zh' ? '微光茉影' : '微光茉影'}
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
                {language === 'zh' ? (
                  <>
                    <p className="text-[#E8F0EB]/90 text-sm md:text-base font-light drop-shadow text-center">
                      以筆尖編織夢境，探尋樹影間遺落的故事。
                    </p>
                    <p className="text-[#A5D6A7]/70 text-xs md:text-sm tracking-[0.05em] font-sans drop-shadow-sm max-w-lg mx-auto">
                      Tracing dreams through pen strokes, discovering stories left in the shadows of leaves.
                    </p>
                  </>
                ) : (
                  <p className="text-[#A5D6A7]/80 tracking-[0.05em] text-sm md:text-base font-light drop-shadow-sm max-w-lg mx-auto">
                    Tracing dreams through pen strokes, discovering stories left<br className="hidden md:block" /> in the shadows of leaves.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Selection Overlay */}
      <AnimatePresence>
        {appState === 'languageSelect' && (
          <motion.div
            key="language-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(5px)", scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-transparent"
          >
            <div className="flex flex-col items-center gap-8">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[#E8F0EB] font-sans text-sm md:text-base tracking-[0.15em] font-light text-center"
              >
                選擇語言 / Select Language
              </motion.h2>
              <div className="flex flex-row gap-6">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  onClick={() => handleLanguageSelect('zh')}
                  className="px-8 py-3 border border-[#A5D6A7]/30 text-[#E8F0EB] font-sans tracking-widest hover:bg-[#A5D6A7]/10 transition-colors duration-300 rounded-sm"
                >
                  繁體中文
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  onClick={() => handleLanguageSelect('en')}
                  className="px-8 py-3 border border-[#A5D6A7]/30 text-[#E8F0EB] font-sans tracking-widest hover:bg-[#A5D6A7]/10 transition-colors duration-300 rounded-sm"
                >
                  English
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Scrollable Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: appState === 'main' ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeIn" }}
        className={`relative z-10 w-full h-full ${appState !== 'main' ? 'pointer-events-none' : ''}`}
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

import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center px-6 pointer-events-none">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <span className="block font-sans text-xs md:text-sm tracking-[0.3em] text-[#A5D6A7] uppercase mb-4 opacity-80">
            Moonlight Jasmine
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6"
        >
          <motion.span
            animate={{ backgroundPosition: ["-200% center", "200% center"] }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              delay: 2,
              repeat: Infinity,
              repeatDelay: 5
            }}
            className="inline-block bg-[length:300%_auto] bg-clip-text text-transparent bg-[linear-gradient(90deg,#E8F0EB_0%,#E8F0EB_35%,#FEF08A_50%,#E8F0EB_65%,#E8F0EB_100%)] drop-shadow-sm"
          >
            微光<span className="italic">茉影</span>
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-base md:text-lg text-neutral-400 font-light tracking-wide max-w-lg mx-auto leading-relaxed"
        >
          以筆尖編織夢境，探尋樹影間遺落的故事。<br />
          Tracing dreams through pen strokes, discovering stories left in the shadows of leaves.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-neutral-400 to-transparent"
        ></motion.div>
      </motion.div>
    </section>
  );
}

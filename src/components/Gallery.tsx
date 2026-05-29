import { motion } from 'motion/react';
import { artworksData } from '../data';
import ArtworkCard from './ArtworkCard';

export default function Gallery() {
  return (
    <section id="gallery" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-6 mb-16"
      >
        <h2 className="font-serif text-3xl md:text-3xl tracking-widest text-[#E8F0EB]">
          作品 <span className="text-neutral-500 font-sans text-base font-light">/ WORKS</span>
        </h2>
        <div className="flex-1 h-[1px] bg-neutral-800"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
        {artworksData.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { PenTool } from 'lucide-react';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-40 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between bg-[#08100D]/70 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 font-serif text-lg tracking-widest text-[#E8F0EB]">
        <PenTool className="w-5 h-5 text-[#A5D6A7]" />
        <span>MOMO SU</span>
      </div>
      
      <ul className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest text-neutral-400">
        <li className="hover:text-[#A5D6A7] transition-colors cursor-pointer" onClick={() => scrollToSection('gallery')}>作品集 / WORKS</li>
        <li className="hover:text-[#A5D6A7] transition-colors cursor-pointer" onClick={() => scrollToSection('about')}>關於＆聯繫 / ABOUT & CONTACT</li>
      </ul>
    </motion.nav>
  );
}

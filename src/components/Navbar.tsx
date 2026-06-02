import { motion } from 'motion/react';
import { PenTool, Globe } from 'lucide-react';
import { profileData } from '../data';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-40 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between bg-[#08100D]/70 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 font-serif text-sm md:text-base tracking-[0.15em] md:tracking-widest text-[#E8F0EB]">
        <PenTool className="w-4 h-4 md:w-5 md:h-5 text-[#A5D6A7]" />
        <span>{profileData.name} {profileData.pseudonym}</span>
      </div>
      
      <div className="flex items-center gap-6 md:gap-8 font-sans text-sm tracking-widest text-neutral-400">
        <ul className="hidden md:flex items-center gap-8">
          <li className="hover:text-[#A5D6A7] transition-colors cursor-pointer" onClick={() => scrollToSection('gallery')}>{t('nav.projects')}</li>
          <li className="hover:text-[#A5D6A7] transition-colors cursor-pointer" onClick={() => scrollToSection('about')}>{t('nav.about')}</li>
        </ul>
        
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 md:gap-2 text-neutral-300 hover:text-[#A5D6A7] transition-colors py-1 px-2.5 md:px-3 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 shadow-sm"
        >
          <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-[10px] md:text-xs tracking-widest">{t('language.switch')}</span>
        </button>
      </div>
    </motion.nav>
  );
}

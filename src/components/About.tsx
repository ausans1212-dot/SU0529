import { motion } from 'motion/react';
import { profileData } from '../data';
import { Instagram, Facebook, AtSign, Mail } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-6 mb-16"
      >
        <div className="flex-1 h-[1px] bg-neutral-800"></div>
        <h2 className="font-serif text-3xl md:text-4xl tracking-widest text-[#E8F0EB]">
          關於作者 <span className="text-neutral-500 font-sans text-lg font-light">/ PROFILE</span>
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center md:items-start max-w-4xl mx-auto">
        {/* Placeholder Avatar / Sketch */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 relative"
        >
          <img 
            src={profileData.avatarUrl} 
            alt={profileData.name} 
            className="w-full h-full object-cover select-none pointer-events-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-neutral-800 rounded-full"></div>
        </motion.div>

        {/* Bio */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-end gap-3 mb-2">
            <h3 className="font-serif text-3xl">{profileData.name}</h3>
            <p className="font-sans text-lg tracking-wide text-[#A5D6A7] font-light pb-[2px]">{profileData.pseudonym}</p>
          </div>
          
          <p className="font-sans font-light text-neutral-400 leading-loose text-justify md:text-left whitespace-pre-line">
            {profileData.bio}
          </p>

          <div className="flex items-center gap-6 mt-4">
            {profileData.social.facebook && (
              <a href={profileData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#A5D6A7] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {profileData.social.instagram && (
              <a href={profileData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#A5D6A7] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {profileData.social.threads && (
              <a href={profileData.social.threads} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#A5D6A7] transition-colors flex items-center gap-2">
                <AtSign className="w-5 h-5" />
                <span className="text-sm font-sans tracking-wider uppercase">Threads</span>
              </a>
            )}
            {profileData.social.email && (
              <a href={`mailto:${profileData.social.email}`} className="text-neutral-500 hover:text-[#A5D6A7] transition-colors flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-sans tracking-wider uppercase">Email</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

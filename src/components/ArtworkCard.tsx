import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, AlertTriangle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Artwork } from '../types';

interface Props {
  artwork: Artwork;
  index: number;
  key?: string | number;
}

export default function ArtworkCard({ artwork, index }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const active = Math.round(scrollLeft / width);
      setActiveIndex(active);
    }
  };

  const extraPagesCount = artwork.extraPages?.length || 0;
  const totalPages = 3 + extraPagesCount;

  const scrollTo = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * pageIndex, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative w-full mx-auto flex flex-col gap-3 group"
    >
      <div className="relative w-full aspect-[4/5] bg-[#0c1611] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col group/card">
        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar flex-1"
        >
        {/* Page 1: Image View */}
        <div className="min-w-full h-full snap-center relative flex items-center justify-center bg-[#0c1611] overflow-hidden">
           <img 
             src={artwork.imageUrl} 
             alt={artwork.title}
             className={`w-full h-full select-none pointer-events-none ${artwork.imageClassName || 'object-cover'}`}
             style={artwork.imageStyle}
             onContextMenu={(e) => e.preventDefault()}
             draggable={false}
           />
           <div className="absolute inset-0 bg-transparent z-[1]" onContextMenu={(e) => e.preventDefault()}></div>
           <div className="absolute inset-x-0 bottom-0 p-5 pt-16 flex flex-col gap-1 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent text-shadow-sm pb-10 z-[2]">
             <h3 className="font-serif text-white text-xl md:text-2xl drop-shadow-md leading-snug">{artwork.title}</h3>
             {artwork.titleEn && <span className="font-sans text-neutral-300 text-xs tracking-wide drop-shadow-md block mb-1">{artwork.titleEn}</span>}
             <span className="font-sans text-xs text-[#A5D6A7] tracking-wider drop-shadow-md">{artwork.category}</span>
           </div>
        </div>

        {/* Page 2: Detailed Text View (ZH) */}
        <div className="min-w-full h-full snap-center bg-[#0c1611] flex flex-col items-center justify-center p-5 md:p-8 overflow-y-auto">
          <div className="w-full flex-1 flex flex-col pt-2 pb-8 items-start">
              <div className="flex items-center gap-3 text-xs tracking-wider text-[#A5D6A7] font-mono shrink-0 mb-3">
                <span>{artwork.category}</span>
              </div>
              
              <h2 className="text-xl font-serif text-[#E8F0EB] leading-tight shrink-0 mb-3 text-left w-full">
                {artwork.title}
                {artwork.titleEn && <span className="block text-sm text-neutral-500 font-sans mt-1.5">{artwork.titleEn}</span>}
              </h2>

              {artwork.ageRestriction && (
                <div className="flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md text-xs font-sans w-fit shrink-0 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>建議18歲以上觀看</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300 font-sans shrink-0 mb-4">
                {artwork.status && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px]">
                     {artwork.status}
                   </span>
                )}
                {artwork.episodes && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px]">
                     {artwork.episodes}
                   </span>
                )}
                {artwork.platform && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {artwork.platform}
                   </span>
                )}
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent my-1 shrink-0"></div>
              
              {artwork.credits && (
                <div className="mt-4 mb-2 text-xs font-sans text-neutral-400 tracking-wide leading-relaxed">
                  {artwork.credits}
                </div>
              )}

              <p className="font-sans text-neutral-300 leading-relaxed text-sm whitespace-pre-line overflow-y-auto pr-2 flex-grow mt-3 text-left w-full hide-scrollbar">
                {artwork.description}
              </p>

              {(artwork.link || artwork.link18Plus) && (
                <div className="mt-4 shrink-0 w-full flex flex-col gap-2">
                  {artwork.link && (
                    <a 
                      href={artwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm shadow-[0_0_20px_rgba(165,214,167,0.2)] hover:shadow-[0_0_30px_rgba(165,214,167,0.4)]"
                    >
                      進入作品
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  )}
                  {artwork.link18Plus && (
                    <a 
                      href={artwork.link18Plus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-red-950/40 border border-red-900/50 hover:bg-red-900/40 text-red-200 rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm"
                    >
                      進入作品 (18+ 版本)
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Page 3: Detailed Text View (EN) */}
        <div className="min-w-full h-full snap-center bg-[#0c1611] flex flex-col items-center justify-center p-5 md:p-8 overflow-y-auto">
          <div className="w-full flex-1 flex flex-col pt-2 pb-8 items-start">
              <div className="flex items-center gap-3 text-xs tracking-wider text-[#A5D6A7] font-mono shrink-0 mb-3">
                <span>{artwork.categoryEn || artwork.category}</span>
              </div>
              
              <h2 className="text-xl font-serif text-[#E8F0EB] leading-tight shrink-0 mb-3 text-left w-full">
                {artwork.titleEn || artwork.title}
              </h2>

              {artwork.ageRestriction && (
                <div className="flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md text-xs font-sans w-fit shrink-0 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Mature Content 18+</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300 font-sans shrink-0 mb-4">
                {(artwork.statusEn || artwork.status) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {artwork.statusEn || artwork.status}
                   </span>
                )}
                {(artwork.episodesEn || artwork.episodes) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {artwork.episodesEn || artwork.episodes}
                   </span>
                )}
                {(artwork.platformEn || artwork.platform) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {artwork.platformEn || artwork.platform}
                   </span>
                )}
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent my-1 shrink-0"></div>

              <p className="font-sans text-neutral-300 leading-relaxed text-sm whitespace-pre-line overflow-y-auto pr-2 flex-grow mt-3 text-left w-full hide-scrollbar">
                {artwork.descriptionEn || artwork.description}
              </p>

              {(artwork.link || artwork.link18Plus) && (
                <div className="mt-4 shrink-0 w-full flex flex-col gap-2">
                  {artwork.link && (
                    <a 
                      href={artwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm shadow-[0_0_20px_rgba(165,214,167,0.2)] hover:shadow-[0_0_30px_rgba(165,214,167,0.4)]"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  )}
                  {artwork.link18Plus && (
                    <a 
                      href={artwork.link18Plus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-red-950/40 border border-red-900/50 hover:bg-red-900/40 text-red-200 rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm"
                    >
                      Read More (18+ Version)
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Extra Pages */}
        {artwork.extraPages?.map((page, idx) => (
          <div key={`extra-${idx}`} className="min-w-full h-full snap-center relative flex flex-col items-center justify-center bg-[#0c1611] overflow-hidden px-2 pt-2 pb-5">
            {page.imageUrl ? (
               <>
                 <div className="w-full flex-[2] relative mb-2 mt-2 max-w-4xl mx-auto">
                   <img 
                     src={page.imageUrl} 
                     alt={`Extra ${idx}`}
                     className="absolute inset-0 w-full h-full object-contain drop-shadow-md scale-105 select-none pointer-events-none"
                     onContextMenu={(e) => e.preventDefault()}
                     draggable={false}
                   />
                   <div className="absolute inset-0 bg-transparent z-[1]" onContextMenu={(e) => e.preventDefault()}></div>
                 </div>
                 <div className="w-full flex-none flex flex-col gap-3 pb-4 px-3">
                   {page.description && (
                     <p className="font-sans text-neutral-200 leading-relaxed text-sm whitespace-pre-line text-left pointer-events-auto">
                       {page.description}
                     </p>
                   )}
                   {page.link && (
                     <a 
                       href={page.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm shadow-[0_0_20px_rgba(165,214,167,0.2)] hover:shadow-[0_0_30px_rgba(165,214,167,0.4)] pointer-events-auto"
                     >
                       購買連結
                       <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                     </a>
                   )}
                 </div>
               </>
            ) : (
                <div className="w-full flex-1 flex flex-col pt-10 pb-8 px-5 items-start">
                   {page.description && (
                     <p className="font-sans text-neutral-300 leading-relaxed text-sm whitespace-pre-line overflow-y-auto flex-grow text-left w-full hide-scrollbar">
                       {page.description}
                     </p>
                   )}
                   {page.link && (
                     <a 
                       href={page.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="mt-4 group/btn flex items-center justify-center gap-2 w-full py-3 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm shadow-[0_0_20px_rgba(165,214,167,0.2)] hover:shadow-[0_0_30px_rgba(165,214,167,0.4)] pointer-events-auto"
                     >
                       購買連結
                       <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                     </a>
                   )}
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md pointer-events-none">
        {Array.from({ length: totalPages }).map((_, dotIdx) => (
          <button 
            key={dotIdx}
            onClick={() => scrollTo(dotIdx)} 
            className={`transition-all duration-300 rounded-full pointer-events-auto ${activeIndex === dotIdx ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'}`}
            aria-label={`View Page ${dotIdx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none md:pointer-events-auto z-10">
        {activeIndex > 0 && (
          <button 
            onClick={() => scrollTo(activeIndex - 1)}
            className="w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors pointer-events-auto"
          >
            <ChevronLeft className="w-5 h-5 ml-[-2px]" />
          </button>
        )}
      </div>
      <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none md:pointer-events-auto z-10">
        {activeIndex < totalPages - 1 && (
          <button 
            onClick={() => scrollTo(activeIndex + 1)}
            className="w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors pointer-events-auto"
          >
            <ChevronRight className="w-5 h-5 mr-[-2px]" />
          </button>
        )}
      </div>
      </div>
      
      {/* Year Below Card */}
      <div className="px-1 mt-1 flex justify-center">
        <span className="font-mono text-sm text-neutral-500 tracking-wider font-light">{artwork.year}</span>
      </div>
    </motion.div>
  );
}

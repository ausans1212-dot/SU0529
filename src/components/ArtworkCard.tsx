import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, AlertTriangle, ChevronRight, ChevronLeft, BookOpen, X, Eye } from 'lucide-react';
import { Artwork } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  artwork: Artwork;
  index: number;
  key?: string | number;
}

export default function ArtworkCard({ artwork, index }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxScrollRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const { language, t } = useLanguage();

  const extraPagesCount = artwork.extraPages?.length || 0;
  const totalPages = 2 + extraPagesCount;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const active = Math.round(scrollLeft / width);
      setActiveIndex(active);
    }
  };

  const scrollTo = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * pageIndex, behavior: 'smooth' });
    }
  };

  const openLightbox = () => {
    setLightboxIndex(0);
    setIsLightboxOpen(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const handleImageLoad = (idx: number) => {
    setLoadedImages(prev => ({ ...prev, [idx]: true }));
  };

  const handleLightboxScroll = () => {
    if (lightboxScrollRef.current) {
      const scrollLeft = lightboxScrollRef.current.scrollLeft;
      const width = lightboxScrollRef.current.clientWidth;
      const active = Math.round(scrollLeft / width);
      setLightboxIndex(active);
    }
  };

  const scrollToLightboxPage = (pageIndex: number) => {
    if (lightboxScrollRef.current) {
      const width = lightboxScrollRef.current.clientWidth;
      lightboxScrollRef.current.scrollTo({ left: width * pageIndex, behavior: 'smooth' });
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
      <div 
        className="relative w-full aspect-[4/5] bg-[#0c1611] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col group/card"
      >
        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar flex-1"
        >
        {/* Page 1: Image/Video View */}
        <div className="min-w-full h-full snap-center relative flex items-center justify-center bg-[#0c1611] overflow-hidden">
           {artwork.youtubeUrl ? (
             <iframe
               src={`${artwork.youtubeUrl}?autoplay=1&loop=1&mute=1&playlist=${artwork.youtubeUrl.split('/').pop()?.split('?')[0]}&controls=0&modestbranding=1&playsinline=1`}
               className={`absolute w-[180%] h-[180%] max-w-none select-none pointer-events-none`}
               allow="autoplay; encrypted-media"
               frameBorder="0"
             />
           ) : artwork.videoUrl ? (
             <video 
               src={artwork.videoUrl} 
               className={`w-full h-full select-none pointer-events-none ${artwork.videoClassName || 'object-cover'}`}
               style={artwork.videoStyle}
               autoPlay
               loop
               muted
               playsInline
               onContextMenu={(e) => e.preventDefault()}
             />
           ) : (
             <img 
               src={artwork.imageUrl} 
               alt={artwork.title}
               className={`w-full h-full select-none pointer-events-none ${artwork.imageClassName || 'object-cover'}`}
               style={artwork.imageStyle}
               onContextMenu={(e) => e.preventDefault()}
               draggable={false}
             />
           )}
           {artwork.title === "最特別的事" && (
             <div className="absolute w-full h-full pointer-events-none z-[1] overflow-hidden inset-0">
               {Array.from({ length: 15 }).map((_, i) => {
                 const size = Math.random() * 20 + 8;
                 const left = Math.random() * 100;
                 const animDuration = Math.random() * 4 + 4;
                 const animDelay = Math.random() * 5;
                 return (
                   <div
                     key={i}
                     className="absolute bottom-0 rounded-full bg-white/20 backdrop-blur-sm animate-floatUp border border-white/30"
                     style={{
                       width: `${size}px`,
                       height: `${size}px`,
                       left: `${left}%`,
                       animationDuration: `${animDuration}s`,
                       animationDelay: `${animDelay}s`,
                     }}
                   />
                 );
               })}
             </div>
           )}
           <div 
             className="absolute inset-0 bg-transparent z-[1]" 
             onContextMenu={(e) => e.preventDefault()}
           ></div>
           <div className="absolute inset-x-0 bottom-0 p-5 pt-16 flex flex-col gap-1 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent text-shadow-sm pb-10 z-[2]">
             <h3 className="font-serif text-white text-xl md:text-2xl drop-shadow-md leading-snug">{language === 'zh' ? artwork.title : (artwork.titleEn || artwork.title)}</h3>
             {language === 'zh' 
               ? (artwork.titleEn && <span className="font-sans text-neutral-300 text-xs tracking-wide drop-shadow-md block mb-1">{artwork.titleEn}</span>)
               : (artwork.title && <span className="font-sans text-neutral-300 text-xs tracking-wide drop-shadow-md block mb-1">{artwork.title}</span>)
             }
             <span className="font-sans text-xs text-[#A5D6A7] tracking-wider drop-shadow-md">{language === 'zh' ? artwork.category : (artwork.categoryEn || artwork.category)}</span>
           </div>
        </div>

        {/* Page 2: Detailed Text View */}
        <div className="min-w-full h-full snap-center bg-[#0c1611] flex flex-col items-center justify-center p-5 md:p-8 overflow-y-auto">
          <div className="w-full flex-1 flex flex-col pt-2 pb-8 items-start">
              <div className="flex items-center gap-3 text-xs tracking-wider text-[#A5D6A7] font-mono shrink-0 mb-3">
                <span>{language === 'zh' ? artwork.category : (artwork.categoryEn || artwork.category)}</span>
              </div>
              
              <h2 className="text-xl font-serif text-[#E8F0EB] leading-tight shrink-0 mb-3 text-left w-full">
                {language === 'zh' ? artwork.title : (artwork.titleEn || artwork.title)}
                {language === 'zh' 
                  ? (artwork.titleEn && <span className="block text-sm text-neutral-500 font-sans mt-1.5">{artwork.titleEn}</span>)
                  : (artwork.title && <span className="block text-sm text-neutral-500 font-sans mt-1.5">{artwork.title}</span>)
                }
              </h2>

              {artwork.ageRestriction && (
                <div className="flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md text-xs font-sans w-fit shrink-0 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{language === 'zh' ? '建議18歲以上觀看' : 'Mature Content 18+'}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300 font-sans shrink-0 mb-4">
                {(artwork.status || artwork.statusEn) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {language === 'zh' ? artwork.status : (artwork.statusEn || artwork.status)}
                   </span>
                )}
                {(artwork.episodes || artwork.episodesEn) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {language === 'zh' ? artwork.episodes : (artwork.episodesEn || artwork.episodes)}
                   </span>
                )}
                {(artwork.platform || artwork.platformEn) && (
                   <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 tracking-widest text-[10px] uppercase">
                     {language === 'zh' ? artwork.platform : (artwork.platformEn || artwork.platform)}
                   </span>
                )}
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent my-1 shrink-0"></div>
              
              {artwork.credits && language === 'zh' && (
                <div className="mt-4 mb-2 text-xs font-sans text-neutral-400 tracking-wide leading-relaxed">
                  {artwork.credits}
                </div>
              )}

              <p className="font-sans text-neutral-300 leading-relaxed text-sm whitespace-pre-line overflow-y-auto pr-2 flex-grow mt-3 text-left w-full hide-scrollbar">
                {language === 'zh' ? artwork.description : (artwork.descriptionEn || artwork.description)}
              </p>

              {(artwork.link || artwork.link18Plus || (artwork.previewImages && artwork.previewImages.length > 0)) && (
                <div className="mt-4 shrink-0 w-full flex flex-col gap-2">
                  {artwork.previewImages && artwork.previewImages.length > 0 && (
                    <button
                      onClick={openLightbox}
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm border border-neutral-700 hover:border-neutral-500"
                    >
                      <BookOpen className="w-4 h-4" />
                      {language === 'zh' ? '作品局部預覽' : 'Preview Chapters'}
                    </button>
                  )}
                  {artwork.link && (
                    <a 
                      href={artwork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-sm transition-all duration-300 font-sans tracking-widest font-medium text-sm shadow-[0_0_20px_rgba(165,214,167,0.2)] hover:shadow-[0_0_30px_rgba(165,214,167,0.4)]"
                    >
                      {t('project.read')}
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
                      {t('project.read')} (18+)
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
            {page.iframeUrl ? (
               <>
                 <div className="w-full flex-1 relative mb-2 mt-2 max-w-4xl mx-auto rounded-md overflow-hidden bg-black/50">
                    <iframe 
                      src={page.iframeUrl} 
                      className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                 </div>
                 {page.description && (
                   <div className="w-full flex-none flex flex-col gap-3 pb-4 px-3">
                     <p className="font-sans text-neutral-200 leading-relaxed text-sm whitespace-pre-line text-left pointer-events-auto">
                       {page.description}
                     </p>
                   </div>
                 )}
               </>
            ) : page.imageUrl ? (
               <>
                 <div className="w-full flex-[2] relative mb-2 mt-2 max-w-4xl mx-auto">
                   <img 
                     src={page.imageUrl} 
                     alt={`Extra ${idx}`}
                     className="absolute inset-0 w-full h-full object-contain drop-shadow-md scale-105 select-none pointer-events-none"
                     onContextMenu={(e) => e.preventDefault()}
                     draggable={false}
                   />
                   <div 
                     className="absolute inset-0 bg-transparent z-[1]" 
                     onContextMenu={(e) => e.preventDefault()}
                   ></div>
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
                        {page.linkText || (language === 'zh' ? '購買連結' : 'Purchase')}
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
                        {page.linkText || (language === 'zh' ? '購買連結' : 'Purchase')}
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
      
      {/* Year & View Count Below Card */}
      <div className="px-1 mt-1 flex justify-center items-center gap-4">
        <span className="font-mono text-sm text-neutral-500 tracking-wider font-light">{artwork.year}</span>
        {artwork.viewCount && (
          <div className="flex items-center gap-1.5 text-neutral-500" title={language === 'zh' ? '作品熱度' : 'View Count'}>
            <Eye className="w-4 h-4 opacity-70" />
            <span className="font-mono text-sm font-light">{artwork.viewCount}</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isLightboxOpen && artwork.previewImages && artwork.previewImages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 text-white absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
                <span className="font-serif tracking-widest text-sm md:text-base">
                  {language === 'zh' ? '作品局部預覽' : 'Preview'} ({lightboxIndex + 1}/{artwork.previewImages.length})
                </span>
                <button 
                  onClick={closeLightbox}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Images Container */}
              <div 
                ref={lightboxScrollRef}
                onScroll={handleLightboxScroll}
                className="flex-1 w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              >
                {artwork.previewImages.map((img, idx) => (
                  <div key={idx} className="min-w-full h-full snap-center flex items-center justify-center p-4 md:p-8 pt-20 pb-20 relative">
                    {!loadedImages[idx] && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-neutral-700 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img 
                      src={img} 
                      alt={`Preview Page ${idx + 1}`}
                      className={`max-w-full max-h-full object-contain rounded-md shadow-2xl transition-opacity duration-500 ease-in-out ${loadedImages[idx] ? 'opacity-100' : 'opacity-0'}`}
                      draggable={false}
                      onLoad={() => handleImageLoad(idx)}
                    />
                  </div>
                ))}
              </div>

              {/* Left/Right Arrows for Lightbox */}
              {lightboxIndex > 0 && (
                <button 
                  onClick={() => scrollToLightboxPage(lightboxIndex - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 ml-[-2px]" />
                </button>
              )}
              {lightboxIndex < artwork.previewImages.length - 1 && (
                <button 
                  onClick={() => scrollToLightboxPage(lightboxIndex + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 mr-[-2px]" />
                </button>
              )}

              {/* Bottom Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {artwork.previewImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToLightboxPage(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      lightboxIndex === idx ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

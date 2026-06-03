import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Link as LinkIcon, Check, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function FloatingShare() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://sumomo.vercel.app/');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareUrl = encodeURIComponent('https://sumomo.vercel.app/');
  const shareTitle = encodeURIComponent(document.title);

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LINE',
      url: `https://social-plugins.line.me/lineit/share?url=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22.06 10.42c0-4.32-4.28-7.83-9.52-7.83s-9.52 3.51-9.52 7.83c0 3.86 3.4 7.12 7.89 7.73.3.06.72.19.82.44.1.23.03.58 0 .82l-.24 1.48c-.07.41-.35 1.73 1.52.94 1.87-.79 10.1-5.95 10.1-9.98zm-13.6 1.95H5.85c-.24 0-.44-.2-.44-.44V8.58c0-.24.2-.44.44-.44h.87c.24 0 .44.2.44.44v2.48h1.3c.24 0 .44.2.44.44v.86c0 .24-.2.43-.44.43zm2.54 0h-.87c-.24 0-.44-.2-.44-.44V8.58c0-.24.2-.44.44-.44h.87c.24 0 .44.2.44.44v3.35c0 .24-.2.43-.44.43zm4.5 0h-1.02l-1.58-2.22c-.06-.08-.12-.11-.2-.11v2.33c0 .24-.2.44-.44.44h-.88c-.24 0-.44-.2-.44-.44V8.58c0-.24.2-.44.44-.44h.88c.15 0 .28.08.36.19l1.6 2.22c.07.09.12.12.2.12V8.58c0-.24.19-.44.43-.44h.88c.24 0 .44.2.44.44v3.35c0 .24-.2.43-.44.43zm2.84-.87h-1.74v-.86h1.74c.24 0 .44-.2.44-.44v-.86c0-.24-.2-.44-.44-.44h-1.74v-.87h1.74c.24 0 .44-.2.44-.44v-.86c0-.24-.2-.44-.44-.44h-2.61c-.24 0-.44.2-.44.44v3.35c0 .24.2.44.44.44h2.61c.24 0 .44-.2.44-.44v-.86c0-.24-.2-.44-.44-.44z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-2 bg-[#111a14] border border-neutral-800 p-2 rounded-2xl shadow-2xl backdrop-blur-md"
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                title={`Share to ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
            <button
              onClick={handleCopyLink}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title={t('share.copy')}
            >
              {copied ? <Check className="w-5 h-5 text-[#A5D6A7]" /> : <LinkIcon className="w-5 h-5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#A5D6A7] hover:bg-[#bbf0bd] text-[#08100D] rounded-full shadow-[0_0_20px_rgba(165,214,167,0.3)] hover:shadow-[0_0_30px_rgba(165,214,167,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        aria-label={t('share.title')}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6 ml-[-2px]" />}
      </button>
    </div>
  );
}

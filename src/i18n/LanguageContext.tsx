import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    'nav.projects': '作品',
    'nav.about': '關於作者&聯繫',
    'hero.title': '微光茉影',
    'hero.subtitle': '以筆尖編織夢境，探尋樹影間遺落的故事。',
    'gallery.title': '作品',
    'about.title': '關於作者',
    'about.bio': '漫畫家。\n擅長唯美多變的畫風與細膩寫實的都會情感刻畫，作品多聚焦於現代女性的成長與浪漫情誼。善用光影與柔和色調烘托浪漫、曖昧或憂傷的氛圍。是個喜歡樹與綠葉植物的創作者。',
    'about.contact': '聯絡資訊',
    'about.social': '社群平台',
    'footer.rights': 'All rights reserved.',
    'project.episodes': '回',
    'project.status.completed': '已完結',
    'project.status.season1': '第一季',
    'project.credits': '製作人員',
    'project.extra': '實體書已授權由台灣角川出版',
    'project.read': '閱讀作品',
    'project.read.r18': '18+ 版本',
    'language.switch': 'English'
  },
  en: {
    'nav.projects': 'WORKS',
    'nav.about': 'ABOUT & CONTACT',
    'hero.title': '微光茉影',
    'hero.subtitle': 'Tracing dreams through pen strokes, discovering stories left in the shadows of leaves.',
    'gallery.title': 'WORKS',
    'about.title': 'PROFILE',
    'about.bio': 'A Comic Artist specializing in an aesthetic, versatile style and nuanced, realistic portrayals of urban emotions. The works focus on the growth of modern women and their romantic bonds. Masterfully using light, shadow, and soft palettes to evoke atmospheres of romance, ambiguity, and tender melancholy, this creator draws deep inspiration from the quiet presence of trees and verdant foliage.',
    'about.contact': 'Contact',
    'about.social': 'Social Media',
    'footer.rights': 'All rights reserved.',
    'project.episodes': 'Episodes',
    'project.status.completed': 'Completed',
    'project.status.season1': 'Season 1',
    'project.credits': 'Credits',
    'project.extra': 'Physical book rights licensed to Kadokawa Taiwan',
    'project.read': 'Read',
    'project.read.r18': '18+ Version',
    'language.switch': '繁體中文'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

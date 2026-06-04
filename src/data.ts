import { Artwork, Profile } from './types';

export const profileData: Profile = {
  name: "蘇茉茉",
  pseudonym: "MOMO SU",
  bio: "漫畫家。\n擅長唯美多變的畫風與細膩寫實的都會情感刻畫，作品多聚焦於現代女性的成長與浪漫情誼。善用光影與柔和色調烘托浪漫、曖昧或憂傷的氛圍。是個喜歡樹與綠葉植物的創作者。",
  // 💡 若要更換成自己的照片，請將圖片上傳至 /public/images/ 資料夾
  // 然後將此處的網址改為 "/images/您的圖片檔名.jpg"
  avatarUrl: "/images/images_01.JPG",
  social: {
    facebook: "https://www.facebook.com/momosu1212/?locale=zh_TW",
    instagram: "https://www.instagram.com/sumomo121/",
    threads: "https://www.threads.com/@sumomo121",
    email: "ausans1212@gmail.com"
  }
};

export const artworksData: Artwork[] = [
  {
    id: "1",
    title: "這場戀愛別有居心",
    titleEn: "This Love Has Plans",
    category: "連載漫畫",
    categoryEn: "Serialized Manga",
    imageUrl: "/images/images_02.JPEG",
    videoUrl: "/images/cover.mp4",
    videoClassName: "object-cover object-left-top",
    description: "遭詐騙失去棲身之所的小職員，在聚餐後趁著酒意，與菁英上司度過一夜激情。原以為只是一場意亂情迷，卻在現實的無助中，誘惑暗戀已久的他——把他的家，變成自己的避風港。",
    descriptionEn: "A small employee who lost her shelter due to a scam spends a passionate night with her elite boss after drinking at a company dinner. What she thought was just a moment of infatuation turns into a temptation of her long-time crush in the helplessness of reality—turning his home into her own safe haven.",
    year: "2025",
    link: "https://mojoin.tw/F7Kry",
    episodes: "８回",
    episodesEn: "8 Episodes",
    platform: "MOJOIN",
    platformEn: "MOJOIN",
    status: "已完結",
    statusEn: "Completed",
    ageRestriction: true,
    viewCount: "35k",
    previewImages: [
      "/images/preview_01.JPG",
      "/images/preview_02.JPG",
      "/images/preview_03.JPG",
      "/images/preview_04.JPG"
    ],
    extraPages: [
      {
        description: "這場戀愛別有居心 - PV",
        iframeUrl: "https://www.youtube.com/embed/zxX1nWFS6HQ",
        link: "https://youtube.com/shorts/zxX1nWFS6HQ?si=uI7Beq_IXMaIsUZ1",
        linkText: "影音連結"
      }
    ]
  },
  {
    id: "2",
    title: "影后：愛的角色扮演",
    titleEn: "Behind the Spotlight: Love Roleplay",
    category: "影集授權改編／連載漫畫",
    categoryEn: "Serialized Manga",
    imageUrl: "/images/images_03.jpg",
    description: "臺灣原創影集推薦《影后》獨家授權改編角色前傳漫畫線上看。由漫畫家蘇茉茉、編劇柯映安聯手描繪妮妮與博磊過往的戀愛故事——為了還債而拍三級片的女明星，與迷惘於是否承接家業的富二代，在無光的愛情中，扮演本不屬於自己的角色，談一場期間限定的戀愛。",
    descriptionEn: "An actress who shoots R-rated films to pay off her debts, and a wealthy second-generation heir confused about whether to inherit the family business. In a lightless relationship, they play roles that do not belong to them and embark on a limited-time romance.",
    year: "2024",
    link: "https://mojoin.tw/87WNC",
    episodes: "15回",
    episodesEn: "15 Episodes",
    platform: "MOJOIN",
    platformEn: "MOJOIN",
    credits: "編劇/柯映安、漫畫/蘇茉茉、授權/良人行影業有限公司",
    status: "已完結",
    statusEn: "Completed",
    viewCount: "12k",
    imageClassName: "object-cover",
    imageStyle: { transform: "scale(1.25)", transformOrigin: "center 40%" },
    extraPages: [
      {
        description: "影后：愛的角色扮演 - Shorts",
        iframeUrl: "https://www.youtube.com/embed/Z8wk4xhnT7w",
        link: "https://youtube.com/shorts/Z8wk4xhnT7w?si=GPiu8bM6LyxoL2qu",
        linkText: "影音連結"
      },
      {
        imageUrl: "/images/images_06.png",
        description: "實體書已授權由台灣角川出版",
        link: "https://www.kadokawa.com.tw/products/9786264157254"
      }
    ]
  },
  {
    id: "3",
    title: "愛情，手到擒來",
    titleEn: "Falling Into Your Hands",
    category: "連載漫畫",
    categoryEn: "Serialized Manga",
    imageUrl: "/images/images_04.jpg",
    description: "「手漂亮的人也會是善良的人。」身為手控又母胎單身的彩春，一直抱持著此信念暗戀學長多年，某次終於鼓起勇氣告白卻遭到狠狠拒絕…但她卻意外與利敦相遇了。有點霸道、各方面條件都相當優秀的利敦，突然向彩春提出了試用交往…？！",
    descriptionEn: "\"People with beautiful hands are also kind-hearted.\" Caichun, a hand fetishist who has been single since birth, has long held this belief while secretly crushing on her senior for years. She finally mustered the courage to confess but was ruthlessly rejected... However, she unexpectedly meets Lidun. Lidun, who is slightly domineering and excellent in every way, suddenly proposes a trial relationship with Caichun...?!",
    year: "2021",
    link: "https://www.webtoons.com/zh-hant/romance/falling-into-your-hands/list?title_no=3268",
    link18Plus: "https://www.webtoons.com/zh-hant/romance/falling-into-your-hands-r18/list?title_no=6363",
    episodes: "65回",
    episodesEn: "65 Episodes",
    platform: "LINE WEBTOON",
    platformEn: "LINE WEBTOON",
    status: "第一季",
    statusEn: "Season 1",
    viewCount: "185k",
    imageClassName: "object-cover",
    imageStyle: { transform: "scale(1.05)", transformOrigin: "center top" }
  },
  {
    id: "4",
    title: "最特別的事",
    titleEn: "Silver Lining",
    category: "連載漫畫",
    categoryEn: "Serialized Manga",
    imageUrl: "/images/images_05.jpg",
    videoUrl: "/images/special.mp4",
    audioUrl: "/images/Sacred_Tide.mp3",
    audioStartTime: 3,
    videoClassName: "object-cover",
    videoStyle: { transform: "scale(1.4) translate(12%, 10%)", transformOrigin: "right bottom", objectPosition: "30% 70%" },
    description: "藏在心底的回憶，隨著夢想而清晰。 身為成人漫畫家的女孩夢想成為少女漫畫界的天后，決心改變的過程邂逅了不同的人們，但隨著距離夢想愈來愈近，深埋女孩心底的秘密也漸漸揭露，她終於明白什麼是最特別的事⋯",
    descriptionEn: "Memories hidden in the bottom of the heart become clearer with dreams. A girl who is an adult manga artist dreams of becoming the queen of the shoujo manga world. In the process of deciding to change, she meets different people, but as she gets closer to her dream, the secret buried deep in her heart is gradually revealed, and she finally understands what the most special thing is...",
    year: "2018",
    link: "https://www.webtoons.com/zh-hant/local/silver-lining/list?title_no=4317",
    episodes: "33回",
    episodesEn: "33 Episodes",
    platform: "LINE WEBTOON",
    platformEn: "LINE WEBTOON",
    status: "已完結",
    statusEn: "Completed",
    viewCount: "89k",
    imageClassName: "object-cover",
    imageStyle: { transform: "scale(1.05)", transformOrigin: "center top" }
  }
];

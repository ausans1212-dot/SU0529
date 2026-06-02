import React from 'react';

export interface Artwork {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  imageUrl: string;
  description?: string;
  descriptionEn?: string;
  year: string;
  link?: string;
  link18Plus?: string;
  episodes?: string;
  episodesEn?: string;
  platform?: string;
  platformEn?: string;
  credits?: string;
  status?: string;
  statusEn?: string;
  ageRestriction?: boolean;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  extraPages?: {
    imageUrl?: string;
    iframeUrl?: string;
    description?: string;
    link?: string;
    linkText?: string;
  }[];
}

export interface Profile {
  name: string;
  pseudonym: string;
  bio: string;
  avatarUrl: string;
  social: {
    facebook?: string;
    instagram?: string;
    threads?: string;
    email?: string;
  }
}

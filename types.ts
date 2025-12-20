import React from 'react';

export interface PhotoItem {
  id: number;
  url: string;
  gallery: string[];
  title: string;
  category: string;
  description: string;
  rotation: number;
}

export enum Section {
  HOME = 'home',
  GALLERY = 'gallery',
  ABOUT = 'about',
  CONTACT = 'contact'
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
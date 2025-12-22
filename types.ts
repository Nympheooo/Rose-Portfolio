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

export interface PortfolioContextType {
  items: PhotoItem[];
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updateCoverImage: (id: number, url: string) => void;
  addPhotoToGallery: (id: number, url: string) => void;
  deletePhotoFromGallery: (id: number, index: number) => void;
  reorderGalleryPhoto: (id: number, fromIndex: number, toIndex: number) => void;
  createGallery: (title: string, category: string, description: string) => void;
  deleteGallery: (id: number) => void;
  updateGalleryDetails: (id: number, title: string, category: string, description: string) => void;
  reorderGalleries: (fromIndex: number, toIndex: number) => void;
}
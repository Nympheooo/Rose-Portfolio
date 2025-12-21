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

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  content: string;
  date: string; // ISO String
  read: boolean;
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
  messages: ContactMessage[]; // Liste des messages
  unreadCount: number;
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
  // Méthodes de messagerie
  sendMessage: (name: string, phone: string, content: string) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}
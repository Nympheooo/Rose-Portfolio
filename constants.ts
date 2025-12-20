import React from 'react';
import { PhotoItem, SocialLink } from "./types";

// Images d'attente (Placeholders) pour la structure initiale
const PLACEHOLDER_COVER = "https://placehold.co/600x800/FFF0F5/EC4899?text=Shooting";

export const PORTFOLIO_ITEMS: PhotoItem[] = [
  {
    id: 1,
    url: PLACEHOLDER_COVER,
    gallery: [], // Galerie vide
    title: "Summer Breeze",
    category: "Editorial",
    description: "Description à personnaliser...",
    rotation: -2
  },
  {
    id: 2,
    url: PLACEHOLDER_COVER,
    gallery: [], // Galerie vide
    title: "Urban Chic",
    category: "Streetwear",
    description: "Description à personnaliser...",
    rotation: 1
  },
  {
    id: 3,
    url: PLACEHOLDER_COVER,
    gallery: [], // Galerie vide
    title: "Sweet Cherry",
    category: "Commercial",
    description: "Description à personnaliser...",
    rotation: -1
  },
  {
    id: 4,
    url: PLACEHOLDER_COVER,
    gallery: [], // Galerie vide
    title: "Golden Hour",
    category: "Portrait",
    description: "Description à personnaliser...",
    rotation: 3
  },
  {
    id: 5,
    url: PLACEHOLDER_COVER,
    gallery: [], // Galerie vide
    title: "Retro Vibes",
    category: "Fashion",
    description: "Description à personnaliser...",
    rotation: -2
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { 
    platform: "Email", 
    url: "mailto:contact@rosek.com", 
    icon: "@" 
  },
  { 
    platform: "Facebrowser", 
    url: "https://facebrowser.gta.world/notanangel", 
    icon: React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-4 h-4",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor"
    }, React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    }))
  }
];
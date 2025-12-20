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
    url: "https://i.imgur.com/OStQU8o.png",
    gallery: [
      "https://i.imgur.com/p65Walq.png",
      "https://i.imgur.com/2uWmgnr.png",
      "https://i.imgur.com/OBDMp9l.png",
      "https://i.imgur.com/zs4yolL.png",
      "https://i.imgur.com/4tNVxlF.png"
    ],
    title: "Ocean Drive",
    category: "Maillots de bain",
    description: "Clichés réalisé pour la marque de maillots de bain \"Ocean Drive\" à Vice City.",
    rotation: 1
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
import React from 'react';
import { PhotoItem, SocialLink } from "./types";

export const PORTFOLIO_ITEMS: PhotoItem[] = [
  {
    id: 1,
    url: "https://picsum.photos/600/800?random=1",
    gallery: [
        "https://picsum.photos/600/800?random=11",
        "https://picsum.photos/600/400?random=12",
        "https://picsum.photos/600/800?random=13"
    ],
    title: "Summer Breeze",
    category: "Editorial",
    description: "Shooting pour le magazine Vogue, collection été.",
    rotation: -2
  },
  {
    id: 2,
    url: "https://picsum.photos/600/800?random=2",
    gallery: [
        "https://picsum.photos/600/800?random=21",
        "https://picsum.photos/600/800?random=22",
        "https://picsum.photos/600/400?random=23"
    ],
    title: "Urban Chic",
    category: "Streetwear",
    description: "Campagne publicitaire en centre-ville.",
    rotation: 1
  },
  {
    id: 3,
    url: "https://picsum.photos/600/800?random=3",
    gallery: [
        "https://picsum.photos/600/400?random=31",
        "https://picsum.photos/600/800?random=32",
        "https://picsum.photos/600/800?random=33"
    ],
    title: "Sweet Cherry",
    category: "Commercial",
    description: "Publicité pour une marque de cosmétiques bio.",
    rotation: -1
  },
  {
    id: 4,
    url: "https://picsum.photos/600/800?random=4",
    gallery: [
        "https://picsum.photos/600/800?random=41",
        "https://picsum.photos/600/800?random=42",
        "https://picsum.photos/600/800?random=43"
    ],
    title: "Golden Hour",
    category: "Portrait",
    description: "Séance lumière naturelle au coucher du soleil.",
    rotation: 3
  },
  {
    id: 5,
    url: "https://picsum.photos/600/800?random=5",
    gallery: [
        "https://picsum.photos/600/400?random=51",
        "https://picsum.photos/600/800?random=52",
        "https://picsum.photos/600/400?random=53"
    ],
    title: "Retro Vibes",
    category: "Fashion",
    description: "Inspiration années 60, stylisme vintage.",
    rotation: -2
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
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
  },
  { 
    platform: "Email", 
    url: "mailto:contact@rosek.com", 
    icon: "@" 
  }
];
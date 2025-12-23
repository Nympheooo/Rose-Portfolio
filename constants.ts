import React from 'react';
import { PhotoItem, SocialLink } from "./types";

// Images d'attente (Placeholders) pour la structure initiale
const PLACEHOLDER_COVER = "https://placehold.co/600x800/FFF0F5/EC4899?text=Shooting";

export const PORTFOLIO_ITEMS: PhotoItem[] = [
  {
    id: 1,
    url: "https://i.imgur.com/ymBKlMf.png",
    gallery: [
      "https://i.imgur.com/SXILnuZ.png",
      "https://i.imgur.com/PktDUQg.png",
      "https://i.imgur.com/tVetvEZ.png"
    ],
    title: "Bigness",
    category: "Streetwear",
    description: "Clichés promotionnels d'une nouvelle collection pour la marque streetwear BIGNESS. Le shooting a eu lieu dans les rues de Liberty City",
    rotation: -2
  },
  {
    id: 2,
    url: "https://i.imgur.com/OStQU8o.png",
    gallery: [
      "https://i.imgur.com/2uWmgnr.png",
      "https://i.imgur.com/3e9tb9H.png",
      "https://i.imgur.com/zs4yolL.png",
      "https://i.imgur.com/4tNVxlF.png",
      "https://i.imgur.com/lbyZ2Ur.png"
    ],
    title: "Ocean Drive",
    category: "Maillots de bain",
    description: "Clichés réalisé pour la marque de maillots de bain \"Ocean Drive\" à Vice City.",
    rotation: 1
  }
];

export const SECRET_PORTFOLIO_ITEMS: PhotoItem[] = [
  {
    id: 101,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", 
    gallery: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
    ],
    title: "Shadow Work",
    category: "Artistique & Sombre",
    description: "Exploration des contrastes et de l'anonymat. Une série réalisée dans les sous-sols industriels de Los Santos.",
    rotation: 3
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { 
    platform: "FacebrowserID", 
    url: "https://facebrowser.gta.world/notanangel", 
    icon: "@Facebrowser" 
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
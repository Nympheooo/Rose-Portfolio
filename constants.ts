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
    url: "https://i.imgur.com/cPNbUm1.png", 
    gallery: [
        "https://img1.pixhost.to/images/11150/674238082_c6107657-e23e-4f71-bf4c-84b697b6999c.png",
        "https://img1.pixhost.to/images/11150/674238242_fc48dbde-95b4-41bd-9f38-b283b4e8c459.png",
        "https://img1.pixhost.to/images/11150/674238235_97d7e874-6ef6-4bb7-8f28-eb6850db7a1d.png",
        "https://img1.pixhost.to/images/11150/674238236_73603504-3c21-4296-8680-08984f80b8c2.png",
        "https://img1.pixhost.to/images/11150/674238237_bf6a7a31-5086-4a8a-80ef-d7eff29cd74c1.png"
    ],
    title: "Noël 2025",
    category: "Shooting privé",
    description: "Un petit shooting cadeau pour noël !",
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
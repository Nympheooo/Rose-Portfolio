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
    rotation: -2,
    year: '2025'
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
    rotation: 1,
    year: '2025'
  },
  {
    id: 3,
    url: "https://i.imgur.com/nuaTpI3.png",
    gallery: [
        "https://i.imgur.com/aRnzJsL.png",
        "https://i.imgur.com/6vM0Uzt.png",
        "https://i.imgur.com/uKyST0u.png",
        "https://i.imgur.com/puHS29S.png"
    ],
    title: "Perseus",
    category: "Bijouterie, maroquinerie",
    description: "Perseus est une enseigne spécialisée dans la maroquinerie et la vente de bijoux de luxe pour une clientèle raffinée",
    rotation: 2,
    year: '2025'
  }
];

export const SECRET_PORTFOLIO_ITEMS: PhotoItem[] = [
  {
    id: 101,
    url: "https://i.imgur.com/cPNbUm1.png", 
    gallery: [
        "https://img1.pixhost.to/images/11151/674255370_9890cd9d-b78f-4522-ac38-83e5a000fdc4.png",
        "https://img1.pixhost.to/images/11150/674238082_c6107657-e23e-4f71-bf4c-84b697b6999c.png",
        "https://img1.pixhost.to/images/11150/674238242_fc48dbde-95b4-41bd-9f38-b283b4e8c459.png",
        "https://img1.pixhost.to/images/11150/674238235_97d7e874-6ef6-4bb7-8f28-eb6850db7a1d.png",
        "https://img1.pixhost.to/images/11150/674238236_73603504-3c21-4296-8680-08984f80b8c2.png",
        "https://img1.pixhost.to/images/11150/674238237_bf6a7a31-5086-4a8a-80ef-d7eff29cd74c1.png"
    ],
    title: "Noël 2025",
    category: "Shooting privé",
    description: "Un petit shooting cadeau pour noël !",
    rotation: 3,
    year: '2025'
  },
  {
    id: 102,
    url: "https://i.imgur.com/VdEzIrK.png",
    gallery: [
        "https://img2.pixhost.to/images/5333/689120907_34ff90b6-0caa-4914-afee-3d538c6cc855.png",
        "https://img2.pixhost.to/images/5333/689121048_974c30ab-b40d-4be7-a8c7-1f5fffda274c.png",
        "https://img2.pixhost.to/images/5333/689121047_001.png"
    ],
    title: "Premier Bouquet de Rose.",
    category: "Intime",
    description: "Collection exclusive 2026.",
    rotation: -1,
    year: '2026'
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
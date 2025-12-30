import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoItem, PortfolioContextType } from '../types';
import { PORTFOLIO_ITEMS, SECRET_PORTFOLIO_ITEMS } from '../constants';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Clés de stockage
const STORAGE_KEY_PUBLIC = 'portfolio_data_v22';
// Changement de version pour forcer le rechargement des nouvelles images secrètes
const STORAGE_KEY_SECRET = 'portfolio_secret_data_v6';
const PLACEHOLDER_COVER = "https://placehold.co/600x800/FFF0F5/EC4899?text=New+Cover";

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États séparés pour le contenu Public et Secret
  const [publicItems, setPublicItems] = useState<PhotoItem[]>([]);
  const [secretItems, setSecretItems] = useState<PhotoItem[]>([]);
  
  const [isAdmin, setIsAdmin] = useState(false);

  // Chargement initial
  useEffect(() => {
    // 1. Charger Public
    const savedPublic = localStorage.getItem(STORAGE_KEY_PUBLIC);
    if (savedPublic) {
      setPublicItems(JSON.parse(savedPublic));
    } else {
      setPublicItems(PORTFOLIO_ITEMS);
    }

    // 2. Charger Secret
    const savedSecret = localStorage.getItem(STORAGE_KEY_SECRET);
    if (savedSecret) {
      setSecretItems(JSON.parse(savedSecret));
    } else {
      setSecretItems(SECRET_PORTFOLIO_ITEMS);
    }
    
    setIsAdmin(false);
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (publicItems.length > 0) {
      localStorage.setItem(STORAGE_KEY_PUBLIC, JSON.stringify(publicItems));
    }
  }, [publicItems]);

  useEffect(() => {
    if (secretItems.length > 0) {
      localStorage.setItem(STORAGE_KEY_SECRET, JSON.stringify(secretItems));
    }
  }, [secretItems]);

  // L'état "items" exposé dépend du mode (Admin = Secret)
  const items = isAdmin ? secretItems : publicItems;

  // Helper pour mettre à jour la bonne liste selon le mode actuel
  const updateCurrentItems = (callback: (prev: PhotoItem[]) => PhotoItem[]) => {
    if (isAdmin) {
      setSecretItems(callback);
    } else {
      setPublicItems(callback);
    }
  };

  // --- Auth ---
  const login = (password: string): boolean => {
    if (password === 'Nymphe') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  // --- Portfolio Actions (Agnostic of mode) ---
  const updateCoverImage = (id: number, url: string) => {
    updateCurrentItems(prev => prev.map(item => 
      item.id === id ? { ...item, url } : item
    ));
  };

  const addPhotoToGallery = (id: number, url: string) => {
    updateCurrentItems(prev => prev.map(item => 
      item.id === id ? { ...item, gallery: [url, ...item.gallery] } : item
    ));
  };

  const deletePhotoFromGallery = (id: number, photoIndex: number) => {
    updateCurrentItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newGallery = [...item.gallery];
      newGallery.splice(photoIndex, 1);
      return { ...item, gallery: newGallery };
    }));
  };

  const reorderGalleryPhoto = (id: number, fromIndex: number, toIndex: number) => {
    updateCurrentItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newGallery = [...item.gallery];
      if (toIndex < 0 || toIndex >= newGallery.length) return item;
      const element = newGallery[fromIndex];
      newGallery.splice(fromIndex, 1);
      newGallery.splice(toIndex, 0, element);
      return { ...item, gallery: newGallery };
    }));
  };

  const createGallery = (title: string, category: string, description: string) => {
    updateCurrentItems(prev => {
        const newId = prev.length > 0 ? Math.max(...prev.map(i => i.id)) + 1 : 1;
        const randomRotation = (Math.random() * 6) - 3; 
        const newItem: PhotoItem = {
          id: newId,
          title,
          category,
          description,
          url: PLACEHOLDER_COVER,
          gallery: [],
          rotation: randomRotation
        };
        return [...prev, newItem];
    });
  };

  const deleteGallery = (id: number) => {
    updateCurrentItems(prev => prev.filter(item => item.id !== id));
  };

  const updateGalleryDetails = (id: number, title: string, category: string, description: string) => {
    updateCurrentItems(prev => prev.map(item => 
      item.id === id ? { ...item, title, category, description } : item
    ));
  };

  const reorderGalleries = (fromIndex: number, toIndex: number) => {
    updateCurrentItems(prev => {
      const newItems = [...prev];
      if (toIndex < 0 || toIndex >= newItems.length) return prev;
      const element = newItems[fromIndex];
      newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, element);
      return newItems;
    });
  };

  return (
    <PortfolioContext.Provider value={{ 
      items, 
      isAdmin, 
      login, 
      logout, 
      updateCoverImage, 
      addPhotoToGallery, 
      deletePhotoFromGallery,
      reorderGalleryPhoto,
      createGallery,
      deleteGallery,
      updateGalleryDetails,
      reorderGalleries
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
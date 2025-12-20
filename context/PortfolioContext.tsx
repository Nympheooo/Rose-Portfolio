import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoItem, PortfolioContextType } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Clé de stockage mise à jour pour réinitialiser les données
const STORAGE_KEY = 'portfolio_data_v12';
const PLACEHOLDER_COVER = "https://placehold.co/600x800/FFF0F5/EC4899?text=New+Cover";

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Chargement initial depuis le LocalStorage ou les constantes
  useEffect(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(PORTFOLIO_ITEMS);
    }
    
    // Vérification de session admin persistante (optionnel, ici on remet à false au refresh par sécurité)
    setIsAdmin(false);
  }, []);

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

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

  const updateCoverImage = (id: number, url: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, url } : item
    ));
  };

  const addPhotoToGallery = (id: number, url: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, gallery: [url, ...item.gallery] } : item
    ));
  };

  const deletePhotoFromGallery = (id: number, photoIndex: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newGallery = [...item.gallery];
      newGallery.splice(photoIndex, 1);
      return { ...item, gallery: newGallery };
    }));
  };

  const reorderGalleryPhoto = (id: number, fromIndex: number, toIndex: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newGallery = [...item.gallery];
      
      // Protection bounds
      if (toIndex < 0 || toIndex >= newGallery.length) return item;

      // Swap elements
      const element = newGallery[fromIndex];
      newGallery.splice(fromIndex, 1);
      newGallery.splice(toIndex, 0, element);
      
      return { ...item, gallery: newGallery };
    }));
  };

  const createGallery = (title: string, category: string, description: string) => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    // Rotation aléatoire entre -3 et 3 degrés pour le style
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

    setItems(prev => [...prev, newItem]);
  };

  const deleteGallery = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateGalleryDetails = (id: number, title: string, category: string, description: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, title, category, description } : item
    ));
  };

  const reorderGalleries = (fromIndex: number, toIndex: number) => {
    setItems(prev => {
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
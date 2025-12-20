import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoItem, PortfolioContextType } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Chargement initial depuis le LocalStorage ou les constantes
  useEffect(() => {
    const savedItems = localStorage.getItem('portfolio_items');
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
      localStorage.setItem('portfolio_items', JSON.stringify(items));
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

  return (
    <PortfolioContext.Provider value={{ 
      items, 
      isAdmin, 
      login, 
      logout, 
      updateCoverImage, 
      addPhotoToGallery, 
      deletePhotoFromGallery,
      reorderGalleryPhoto
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
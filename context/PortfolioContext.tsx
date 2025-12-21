import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhotoItem, PortfolioContextType, ContactMessage } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Clés de stockage
const STORAGE_KEY_PORTFOLIO = 'portfolio_data_v16';
const STORAGE_KEY_MESSAGES = 'portfolio_messages_v1';
const PLACEHOLDER_COVER = "https://placehold.co/600x800/FFF0F5/EC4899?text=New+Cover";

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // État Portfolio
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // État Messagerie
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Chargement initial
  useEffect(() => {
    // Charger le Portfolio
    const savedItems = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(PORTFOLIO_ITEMS);
    }

    // Charger les Messages
    const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    setIsAdmin(false);
  }, []);

  // Sauvegarde automatique du Portfolio
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(items));
    }
  }, [items]);

  // Sauvegarde automatique des Messages
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

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

  // --- Portfolio Actions ---
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
      if (toIndex < 0 || toIndex >= newGallery.length) return item;
      const element = newGallery[fromIndex];
      newGallery.splice(fromIndex, 1);
      newGallery.splice(toIndex, 0, element);
      return { ...item, gallery: newGallery };
    }));
  };

  const createGallery = (title: string, category: string, description: string) => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
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

  // --- Messaging Actions ---
  const sendMessage = (name: string, phone: string, content: string) => {
    const newMessage: ContactMessage = {
      id: Date.now().toString(), // Simple ID based on timestamp
      name,
      phone,
      content,
      date: new Date().toISOString(),
      read: false
    };
    // Ajout au début de la liste
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <PortfolioContext.Provider value={{ 
      items, 
      isAdmin, 
      messages,
      unreadCount,
      login, 
      logout, 
      updateCoverImage, 
      addPhotoToGallery, 
      deletePhotoFromGallery,
      reorderGalleryPhoto,
      createGallery,
      deleteGallery,
      updateGalleryDetails,
      reorderGalleries,
      sendMessage,
      markMessageAsRead,
      deleteMessage
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
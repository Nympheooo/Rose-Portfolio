import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export const FilmStrip: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PhotoItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // États pour le Gestionnaire de Dashboard
  const [showDashboard, setShowDashboard] = useState(false);
  
  // États pour le formulaire d'ajout rapide dans le dashboard
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('');

  const { items, isAdmin, updateCoverImage, addPhotoToGallery, deletePhotoFromGallery, reorderGalleryPhoto, createGallery, deleteGallery, updateGalleryDetails, reorderGalleries } = usePortfolio();

  // Fonction pour définir une image comme couverture via l'étoile
  const handleSetCover = (e: React.MouseEvent, imgUrl: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selectedItem) {
        updateCoverImage(selectedItem.id, imgUrl);
        // Mise à jour immédiate de l'interface locale
        setSelectedItem(prev => prev ? { ...prev, url: imgUrl } : null);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem && newImageUrl) {
      addPhotoToGallery(selectedItem.id, newImageUrl);
      setSelectedItem(prev => prev ? { ...prev, gallery: [newImageUrl, ...prev.gallery] } : null);
      setNewImageUrl('');
    }
  };

  const handleDeletePhoto = (e: React.MouseEvent, idx: number) => {
      e.preventDefault();
      e.stopPropagation();
      
      if(window.confirm("Supprimer cette photo ?") && selectedItem) {
          deletePhotoFromGallery(selectedItem.id, idx);
           setSelectedItem(prev => {
               if(!prev) return null;
               const newG = [...prev.gallery];
               newG.splice(idx, 1);
               return {...prev, gallery: newG};
           });
      }
  }

  const handleMovePhoto = (e: React.MouseEvent, idx: number, direction: 'left' | 'right') => {
      e.preventDefault();
      e.stopPropagation();

      if (!selectedItem) return;

      const newIndex = direction === 'left' ? idx - 1 : idx + 1;
      
      if (newIndex < 0 || newIndex >= selectedItem.gallery.length) return;

      reorderGalleryPhoto(selectedItem.id, idx, newIndex);

      setSelectedItem(prev => {
          if (!prev) return null;
          const newG = [...prev.gallery];
          const element = newG[idx];
          newG.splice(idx, 1);
          newG.splice(newIndex, 0, element);
          return { ...prev, gallery: newG };
      });
  };

  // Gestionnaire robuste pour la suppression de galerie dans le dashboard
  const handleDashboardDelete = (e: React.MouseEvent, id: number, title: string) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if(window.confirm(`⚠️ ATTENTION\n\nVoulez-vous vraiment supprimer l'album "${title}" ?\nCette action est irréversible.`)) {
          deleteGallery(id);
      }
  };

  const handleQuickCreate = (e: React.FormEvent) => {
      e.preventDefault();
      if(quickTitle && quickCategory) {
          createGallery(quickTitle, quickCategory, "Description à venir...");
          setQuickTitle('');
          setQuickCategory('');
      }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-12 pt-10">
        <h2 className="text-5xl md:text-7xl font-display text-pink-900 drop-shadow-sm mb-6">
            Shooting
        </h2>
        
        <div className="flex justify-center gap-12 font-serif text-lg tracking-widest relative z-20 mb-8">
            <button 
                onClick={() => setSelectedYear('2025')}
                className={`transition-all duration-500 relative px-2 py-1 ${
                    selectedYear === '2025' 
                    ? 'text-pink-600 font-bold' 
                    : 'text-pink-300 hover:text-pink-400'
                }`}
            >
                2025
                <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-pink-400 transition-all duration-300 ${selectedYear === '2025' ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>

            <button 
                onClick={() => setSelectedYear('2026')}
                className={`transition-all duration-500 relative px-2 py-1 ${
                    selectedYear === '2026' 
                    ? 'text-pink-600 font-bold' 
                    : 'text-pink-300 hover:text-pink-400'
                }`}
            >
                2026
                <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-pink-400 transition-all duration-300 ${selectedYear === '2026' ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>
        </div>

        {/* ADMIN DASHBOARD BUTTON */}
        {isAdmin && selectedYear === '2025' && (
            <div className="flex justify-center mb-12 animate-in fade-in">
                <button 
                    onClick={() => setShowDashboard(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 transition-all font-bold uppercase text-xs tracking-widest"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Gestion des Shootings
                </button>
            </div>
        )}
      </div>
      
      {selectedYear === '2025' ? (
        <div className="relative flex flex-col gap-24 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Central decorative line */}
            <div className="absolute top-10 bottom-10 left-1/2 w-px bg-pink-200 -z-10 transform -translate-x-1/2 hidden md:block" />

            {items.map((item: PhotoItem, index: number) => (
            <div 
                key={item.id}
                className={`flex w-full ${
                index % 2 === 0 ? 'justify-center md:justify-start md:pl-16' : 'justify-center md:justify-end md:pr-16'
                }`}
            >
                <div className="relative group"> 
                    
                    {/* WRAPPER VISUEL (Rotation + Scale) */}
                    <div 
                        className="relative transition-all duration-500 hover:scale-105 hover:z-20"
                        style={{ transform: `rotate(${item.rotation}deg)` }}
                    >
                        {/* 2. CARTE POLAROID (Zone cliquable pour ouvrir) */}
                        <div 
                            className="bg-white p-4 pb-8 shadow-xl w-72 md:w-[26rem] hover:shadow-2xl border border-gray-100 flex flex-col relative cursor-pointer"
                            onClick={() => setSelectedItem(item)}
                        >
                            {/* Tape Effect */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-pink-100/80 rotate-1 shadow-sm z-10 opacity-90 pointer-events-none" />
                            
                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4 pointer-events-none">
                                <img 
                                    src={item.url} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            
                            {/* Text Info */}
                            <div className="text-center pointer-events-none">
                                <h3 className="font-display text-3xl text-gray-800 mb-1 leading-tight">{item.title}</h3>
                                <p className="font-serif text-xs text-pink-500 uppercase tracking-widest">{item.category}</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Description (Tooltip) */}
                    <div className={`absolute top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-56 z-30 hidden md:block ${
                        index % 2 === 0 ? '-right-64' : '-left-64'
                    }`}>
                        <p className="text-sm font-serif italic text-gray-600 mb-3">"{item.description}"</p>
                        <div className="flex items-center text-pink-400 text-xs font-bold uppercase tracking-wider">
                            <span>Voir la galerie</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center pb-20 animate-in fade-in zoom-in-95 duration-700">
            <div className="w-16 h-1 bg-pink-200 mb-8 rounded-full opacity-50"></div>
            <p className="font-display text-4xl text-pink-300 mb-4 tracking-wide">Coming Soon</p>
            <p className="font-serif text-gray-500 italic max-w-md mx-auto">
                La magie est en cours de création. De nouveaux projets, de nouvelles lumières et de nouvelles histoires arrivent pour 2026.
            </p>
        </div>
      )}
      
      <div className="flex items-center justify-center mt-12 mb-4">
         <span className="font-display text-2xl text-pink-300 animate-pulse">● ● ●</span>
      </div>

      {/* DASHBOARD MANAGEMENT MODAL */}
      {showDashboard && (
        <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-pink-950/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setShowDashboard(false)}
        >
             <div 
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-pink-100 max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                 {/* Header */}
                 <div className="p-6 border-b border-pink-100 bg-pink-50/50 flex justify-between items-center">
                    <div>
                        <h3 className="font-display text-3xl text-pink-900">Gestion du Portfolio</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Organiser, Modifier & Planifier</p>
                    </div>
                    <button 
                        onClick={() => setShowDashboard(false)}
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                 </div>

                 {/* Content - Scrollable List */}
                 <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-all">
                                <div className="flex items-start gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Edit Fields */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Titre</label>
                                            <input 
                                                type="text" 
                                                value={item.title}
                                                onChange={(e) => updateGalleryDetails(item.id, e.target.value, item.category, item.description)}
                                                className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm font-display text-gray-800 focus:border-pink-400 focus:bg-white focus:outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Catégorie</label>
                                            <input 
                                                type="text" 
                                                value={item.category}
                                                onChange={(e) => updateGalleryDetails(item.id, item.title, e.target.value, item.description)}
                                                className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm font-serif italic text-pink-600 focus:border-pink-400 focus:bg-white focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1 items-end">
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => reorderGalleries(idx, idx - 1)}
                                                disabled={idx === 0}
                                                className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded disabled:opacity-20 transition-colors"
                                                title="Monter"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                            </button>
                                            <button 
                                                onClick={() => reorderGalleries(idx, idx + 1)}
                                                disabled={idx === items.length - 1}
                                                className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded disabled:opacity-20 transition-colors"
                                                title="Descendre"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </button>
                                        </div>
                                        
                                        {/* FIXED DELETE BUTTON */}
                                        <button 
                                            type="button"
                                            onClick={(e) => handleDashboardDelete(e, item.id, item.title)}
                                            className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Supprimer"
                                            aria-label="Supprimer ce shooting"
                                        >
                                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase text-gray-400 font-bold block mb-1">Description</label>
                                    <textarea 
                                        value={item.description}
                                        onChange={(e) => updateGalleryDetails(item.id, item.title, item.category, e.target.value)}
                                        rows={2}
                                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 focus:border-pink-400 focus:bg-white focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Footer - Add New */}
                 <div className="p-6 bg-pink-100/30 border-t border-pink-200">
                    <h4 className="text-xs uppercase tracking-widest text-pink-600 font-bold mb-3">Ajouter un nouveau shooting</h4>
                    <form onSubmit={handleQuickCreate} className="flex flex-col md:flex-row gap-3">
                        <input 
                            type="text" 
                            placeholder="Titre (ex: Summer Vibes)" 
                            value={quickTitle}
                            onChange={(e) => setQuickTitle(e.target.value)}
                            className="flex-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 font-display"
                        />
                        <input 
                            type="text" 
                            placeholder="Catégorie (ex: Editorial)" 
                            value={quickCategory}
                            onChange={(e) => setQuickCategory(e.target.value)}
                            className="flex-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 font-serif italic"
                        />
                        <button 
                            type="submit"
                            disabled={!quickTitle || !quickCategory}
                            className="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            Créer
                        </button>
                    </form>
                 </div>
             </div>
        </div>
      )}

      {/* Dynamic Gallery Modal (Single Gallery View) */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSelectedItem(null)}
        >
            <div 
                className="bg-[#FFF5F7] w-full max-w-6xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden relative rounded-sm animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 md:p-8 flex justify-between items-center bg-white border-b border-pink-100 flex-shrink-0">
                    <div>
                        <span className="text-pink-400 text-xs uppercase tracking-widest block mb-1">{selectedItem.category}</span>
                        <h2 className="font-display text-3xl md:text-5xl text-gray-900">{selectedItem.title}</h2>
                    </div>
                    <button 
                        onClick={() => setSelectedItem(null)}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
                    >
                        <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-pink-500">Fermer</span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-white">
                    {/* Admin Add Photo */}
                    {isAdmin && (
                        <form onSubmit={handleAddPhoto} className="mb-8 p-4 bg-pink-50 rounded-lg border border-pink-200 flex gap-2">
                            <input 
                                type="text" 
                                value={newImageUrl} 
                                onChange={e => setNewImageUrl(e.target.value)}
                                placeholder="URL de la nouvelle photo..."
                                className="flex-1 px-4 py-2 border rounded border-gray-300 focus:outline-none focus:border-pink-500"
                            />
                            <button type="submit" className="px-4 py-2 bg-pink-500 text-white font-bold rounded hover:bg-pink-600 uppercase text-xs">
                                Ajouter
                            </button>
                        </form>
                    )}

                    {/* Masonry Layout for Dynamic Images */}
                    <div className="masonry-grid">
                        
                        {/* Gallery Images */}
                        {selectedItem.gallery.map((img, idx) => (
                            <div 
                                key={idx} 
                                className="break-inside-avoid mb-4 group relative cursor-zoom-in overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all"
                                onClick={() => setLightboxImage(img)}
                            >
                                {/* Bordure dorée si c'est la couverture */}
                                {selectedItem.url === img && (
                                    <div className="absolute inset-0 border-4 border-yellow-400/70 z-10 rounded-lg pointer-events-none"></div>
                                )}

                                <img 
                                    src={img} 
                                    className="w-full rounded-lg hover:opacity-90 transition-opacity" 
                                    alt={`Gallery ${idx}`}
                                    loading="lazy" 
                                />
                                
                                {/* ADMIN ACTIONS OVERLAY */}
                                {isAdmin && (
                                    <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between p-2 z-20">
                                        
                                        <div className="flex gap-1 items-center">
                                            {/* Bouton Star / Cover */}
                                            <button
                                                onClick={(e) => handleSetCover(e, img)}
                                                className={`p-1.5 rounded-full transition-colors ${selectedItem.url === img ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
                                                title={selectedItem.url === img ? "C'est la couverture actuelle" : "Définir comme couverture"}
                                            >
                                                {selectedItem.url === img ? (
                                                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                                ) : (
                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                                )}
                                            </button>

                                            <div className="w-px h-4 bg-gray-600 mx-1"></div>

                                            {/* Move Left/Up */}
                                            {idx > 0 && (
                                                <button 
                                                    onClick={(e) => handleMovePhoto(e, idx, 'left')}
                                                    className="p-1.5 text-white hover:text-pink-400 hover:bg-white/20 rounded-full transition-colors"
                                                    title="Déplacer avant"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                                </button>
                                            )}

                                            {/* Move Right/Down */}
                                            {idx < selectedItem.gallery.length - 1 && (
                                                <button 
                                                    onClick={(e) => handleMovePhoto(e, idx, 'right')}
                                                    className="p-1.5 text-white hover:text-pink-400 hover:bg-white/20 rounded-full transition-colors"
                                                    title="Déplacer après"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                                </button>
                                            )}
                                        </div>

                                        {/* Delete Button */}
                                        <button 
                                            onClick={(e) => handleDeletePhoto(e, idx)}
                                            className="p-1.5 text-red-400 hover:text-red-500 hover:bg-white/20 rounded-full transition-colors"
                                            title="Supprimer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col justify-center text-center">
                        <h4 className="font-display text-2xl text-pink-900 mb-2">Crédits</h4>
                        <p className="font-serif text-sm text-gray-500 italic">Photographie, Direction Artistique & Stylisme.</p>
                        <div className="w-10 h-px bg-pink-300 mx-auto mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setLightboxImage(null)}
        >
            <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img 
                src={lightboxImage} 
                alt="Full size" 
                className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
      )}
    </div>
  );
};
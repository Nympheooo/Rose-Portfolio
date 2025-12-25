import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PhotoItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export const FilmStrip: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PhotoItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // États pour le Gestionnaire de Dashboard
  const [showDashboard, setShowDashboard] = useState(false);
  
  // États pour le formulaire d'ajout rapide dans le dashboard
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('');

  const { items, isAdmin, createGallery, deleteGallery, updateGalleryDetails, reorderGalleries } = usePortfolio();

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

  // Styles dynamiques
  const cardBg = isAdmin ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100';
  const cardTitle = isAdmin ? 'text-white' : 'text-gray-800';
  const cardSub = isAdmin ? 'text-purple-400' : 'text-pink-500';
  const tapeColor = isAdmin ? 'bg-purple-900/50' : 'bg-pink-100/80';
  const titleColor = isAdmin ? 'text-white' : 'text-pink-900';
  const yearActive = isAdmin ? 'text-purple-400 font-bold' : 'text-pink-600 font-bold';
  const yearInactive = isAdmin ? 'text-gray-500 hover:text-purple-300' : 'text-pink-300 hover:text-pink-400';
  const dotActive = isAdmin ? 'bg-purple-500' : 'bg-pink-400';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-12 pt-10">
        <h2 className={`text-5xl md:text-7xl font-display drop-shadow-sm mb-6 ${titleColor}`}>
            Shooting
        </h2>
        
        <div className="flex justify-center gap-12 font-serif text-lg tracking-widest relative z-20 mb-8">
            <button 
                onClick={() => setSelectedYear('2025')}
                className={`transition-all duration-500 relative px-2 py-1 ${selectedYear === '2025' ? yearActive : yearInactive}`}
            >
                2025
                <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${dotActive} ${selectedYear === '2025' ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>

            <button 
                onClick={() => setSelectedYear('2026')}
                className={`transition-all duration-500 relative px-2 py-1 ${selectedYear === '2026' ? yearActive : yearInactive}`}
            >
                2026
                <span className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${dotActive} ${selectedYear === '2026' ? 'opacity-100' : 'opacity-0'}`}></span>
            </button>
        </div>

        {/* ADMIN DASHBOARD BUTTON */}
        {isAdmin && selectedYear === '2025' && (
            <div className="flex justify-center mb-12 animate-in fade-in">
                <button 
                    onClick={() => setShowDashboard(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all font-bold uppercase text-xs tracking-widest"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Gestion du Portfolio Secret
                </button>
            </div>
        )}
      </div>
      
      {selectedYear === '2025' ? (
        <div className="relative flex flex-col gap-24 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Central decorative line */}
            <div className={`absolute top-10 bottom-10 left-1/2 w-px -z-10 transform -translate-x-1/2 hidden md:block ${isAdmin ? 'bg-purple-900/50' : 'bg-pink-200'}`} />

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
                            className={`${cardBg} p-4 pb-8 shadow-xl w-72 md:w-[26rem] hover:shadow-2xl border flex flex-col relative cursor-pointer transition-colors duration-500`}
                            onClick={() => setSelectedItem(item)}
                        >
                            {/* Tape Effect */}
                            <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-8 ${tapeColor} rotate-1 shadow-sm z-10 opacity-90 pointer-events-none`} />
                            
                            {/* Image Container */}
                            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4 pointer-events-none">
                                <img 
                                    src={item.url} 
                                    alt={item.title} 
                                    className={`w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ${isAdmin ? 'contrast-125 brightness-90' : ''}`}
                                />
                            </div>
                            
                            {/* Text Info */}
                            <div className="text-center pointer-events-none">
                                <h3 className={`font-display text-3xl mb-1 leading-tight ${cardTitle}`}>{item.title}</h3>
                                <p className={`font-serif text-xs uppercase tracking-widest ${cardSub}`}>{item.category}</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating Description (Tooltip) */}
                    <div className={`absolute top-1/2 -translate-y-1/2 p-5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-56 z-30 hidden md:block ${
                        index % 2 === 0 ? '-right-64' : '-left-64'
                    } ${isAdmin ? 'bg-slate-800/95 text-gray-300' : 'bg-white/95 text-gray-600'}`}>
                        <p className="text-sm font-serif italic mb-3">"{item.description}"</p>
                        <div className={`flex items-center text-xs font-bold uppercase tracking-wider ${isAdmin ? 'text-purple-400' : 'text-pink-400'}`}>
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
            <div className={`w-16 h-1 mb-8 rounded-full opacity-50 ${isAdmin ? 'bg-purple-500' : 'bg-pink-200'}`}></div>
            <p className={`font-display text-4xl mb-4 tracking-wide ${isAdmin ? 'text-purple-300' : 'text-pink-300'}`}>Coming Soon</p>
            <p className="font-serif text-gray-500 italic max-w-md mx-auto">
                La magie est en cours de création. De nouveaux projets, de nouvelles lumières et de nouvelles histoires arrivent pour 2026.
            </p>
        </div>
      )}
      
      <div className="flex items-center justify-center mt-12 mb-4">
         <span className={`font-display text-2xl animate-pulse ${isAdmin ? 'text-purple-500' : 'text-pink-300'}`}>● ● ●</span>
      </div>

      {/* DASHBOARD MANAGEMENT MODAL - PORTAL */}
      {showDashboard && createPortal(
        <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setShowDashboard(false)}
        >
             <div 
                className={`rounded-2xl shadow-2xl max-w-4xl w-full border max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${isAdmin ? 'bg-slate-900 border-slate-700' : 'bg-white border-pink-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                 {/* Header */}
                 <div className={`p-6 border-b flex justify-between items-center ${isAdmin ? 'border-slate-700 bg-slate-800' : 'border-pink-100 bg-pink-50/50'}`}>
                    <div>
                        <h3 className={`font-display text-3xl ${isAdmin ? 'text-white' : 'text-pink-900'}`}>Gestion du Portfolio</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Organiser, Modifier & Planifier</p>
                    </div>
                    <button 
                        onClick={() => setShowDashboard(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                 </div>

                 {/* Content - Scrollable List */}
                 <div className={`flex-1 overflow-y-auto p-6 ${isAdmin ? 'bg-black/50' : 'bg-gray-50/50'}`}>
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={item.id} className={`p-4 rounded-xl shadow-sm border flex flex-col gap-4 hover:shadow-md transition-all ${isAdmin ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                                <div className="flex items-start gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Edit Fields */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Titre</label>
                                            <input 
                                                type="text" 
                                                value={item.title}
                                                onChange={(e) => updateGalleryDetails(item.id, e.target.value, item.category, item.description)}
                                                className={`w-full p-2 border rounded text-sm font-display focus:outline-none transition-colors ${isAdmin ? 'bg-slate-900 border-slate-600 text-white focus:border-purple-400' : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-pink-400'}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Catégorie</label>
                                            <input 
                                                type="text" 
                                                value={item.category}
                                                onChange={(e) => updateGalleryDetails(item.id, item.title, e.target.value, item.description)}
                                                className={`w-full p-2 border rounded text-sm font-serif italic focus:outline-none transition-colors ${isAdmin ? 'bg-slate-900 border-slate-600 text-purple-400 focus:border-purple-400' : 'bg-gray-50 border-gray-200 text-pink-600 focus:border-pink-400'}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1 items-end">
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => reorderGalleries(idx, idx - 1)}
                                                disabled={idx === 0}
                                                className="p-2 text-gray-400 hover:text-purple-500 hover:bg-white/10 rounded disabled:opacity-20 transition-colors"
                                                title="Monter"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                            </button>
                                            <button 
                                                onClick={() => reorderGalleries(idx, idx + 1)}
                                                disabled={idx === items.length - 1}
                                                className="p-2 text-gray-400 hover:text-purple-500 hover:bg-white/10 rounded disabled:opacity-20 transition-colors"
                                                title="Descendre"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </button>
                                        </div>
                                        
                                        <button 
                                            type="button"
                                            onClick={(e) => handleDashboardDelete(e, item.id, item.title)}
                                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-900/20 rounded transition-colors"
                                            title="Supprimer"
                                        >
                                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold block mb-1">Description</label>
                                    <textarea 
                                        value={item.description}
                                        onChange={(e) => updateGalleryDetails(item.id, item.title, item.category, e.target.value)}
                                        rows={2}
                                        className={`w-full p-2 border rounded text-xs focus:outline-none transition-colors ${isAdmin ? 'bg-slate-900 border-slate-600 text-gray-300 focus:border-purple-400' : 'bg-gray-50 border-gray-200 text-gray-600 focus:border-pink-400'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Footer - Add New */}
                 <div className={`p-6 border-t ${isAdmin ? 'bg-purple-900/20 border-purple-900/50' : 'bg-pink-100/30 border-pink-200'}`}>
                    <h4 className={`text-xs uppercase tracking-widest font-bold mb-3 ${isAdmin ? 'text-purple-400' : 'text-pink-600'}`}>Ajouter un nouveau shooting</h4>
                    <form onSubmit={handleQuickCreate} className="flex flex-col md:flex-row gap-3">
                        <input 
                            type="text" 
                            placeholder="Titre (ex: Summer Vibes)" 
                            value={quickTitle}
                            onChange={(e) => setQuickTitle(e.target.value)}
                            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none font-display ${isAdmin ? 'bg-slate-800 border-slate-600 text-white focus:border-purple-500' : 'bg-white border-pink-200 text-gray-800 focus:border-pink-500'}`}
                        />
                        <input 
                            type="text" 
                            placeholder="Catégorie (ex: Editorial)" 
                            value={quickCategory}
                            onChange={(e) => setQuickCategory(e.target.value)}
                            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none font-serif italic ${isAdmin ? 'bg-slate-800 border-slate-600 text-purple-300 focus:border-purple-500' : 'bg-white border-pink-200 text-gray-800 focus:border-pink-500'}`}
                        />
                        <button 
                            type="submit"
                            disabled={!quickTitle || !quickCategory}
                            className={`px-6 py-2 rounded-lg font-bold uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-white ${isAdmin ? 'bg-purple-600 hover:bg-purple-500' : 'bg-pink-500 hover:bg-pink-600'}`}
                        >
                            Créer
                        </button>
                    </form>
                 </div>
             </div>
        </div>,
        document.body
      )}

      {/* Dynamic Gallery Modal (Single Gallery View) - PORTAL */}
      {selectedItem && createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 animate-in fade-in duration-300"
            onClick={() => setSelectedItem(null)}
        >
            <div 
                className={`w-full h-full flex flex-col overflow-hidden relative shadow-2xl ${isAdmin ? 'bg-slate-950' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Sticky Header */}
                <div className={`absolute top-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-between items-center pointer-events-none bg-gradient-to-b ${isAdmin ? 'from-slate-950 via-slate-950/95' : 'from-white via-white/95'} to-transparent`}>
                    <div className="pointer-events-auto">
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md border transition-all transform hover:-translate-y-0.5 ${isAdmin ? 'bg-slate-800 border-slate-700 hover:border-purple-500 text-gray-300' : 'bg-white border-pink-100 hover:border-pink-300 hover:bg-pink-50 text-gray-500'}`}
                        >
                             <svg className={`w-4 h-4 ${isAdmin ? 'text-purple-500' : 'text-pink-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            <span className={`text-xs uppercase tracking-widest font-bold ${isAdmin ? 'group-hover:text-purple-400' : 'group-hover:text-pink-600'}`}>Retour</span>
                        </button>
                    </div>
                    <div className={`text-right pointer-events-auto backdrop-blur px-4 py-2 rounded-xl shadow-sm border ${isAdmin ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-pink-50'}`}>
                        <span className={`text-[10px] uppercase tracking-[0.2em] block mb-0.5 ${isAdmin ? 'text-purple-400' : 'text-pink-400'}`}>{selectedItem.category}</span>
                        <h2 className={`font-display text-2xl md:text-3xl ${isAdmin ? 'text-white' : 'text-gray-900'}`}>{selectedItem.title}</h2>
                    </div>
                </div>

                {/* Content */}
                <div className={`flex-1 overflow-y-auto no-scrollbar ${isAdmin ? 'bg-slate-950' : 'bg-white'}`}>
                    {/* Hero Image / Top Padding */}
                    <div className="h-32 md:h-40 w-full"></div>

                    <div className="px-4 md:px-16 pb-20 max-w-7xl mx-auto">
                        {/* Description Block */}
                        <div className="mb-16 text-center max-w-2xl mx-auto">
                            <div className={`w-12 h-1 mx-auto mb-6 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-pink-300'}`}></div>
                            <p className={`font-serif text-lg md:text-xl italic leading-relaxed ${isAdmin ? 'text-gray-400' : 'text-gray-600'}`}>
                                {selectedItem.description}
                            </p>
                        </div>

                        {/* Masonry Layout for Dynamic Images */}
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            
                            {/* Gallery Images */}
                            {selectedItem.gallery.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className="break-inside-avoid relative group cursor-zoom-in"
                                    onClick={() => setLightboxImage(img)}
                                >
                                    <img 
                                        src={img} 
                                        className={`w-full h-auto object-cover transition-all duration-700 group-hover:opacity-95 shadow-sm hover:shadow-xl ${isAdmin ? 'grayscale-[30%] hover:grayscale-0' : ''}`} 
                                        alt={`Gallery ${idx}`}
                                        loading="lazy" 
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={`mt-16 pt-12 border-t flex flex-col justify-center text-center ${isAdmin ? 'border-gray-800' : 'border-gray-100'}`}>
                            <h4 className={`font-display text-2xl mb-2 ${isAdmin ? 'text-white' : 'text-pink-900'}`}>Crédits</h4>
                            <p className={`font-serif text-sm italic ${isAdmin ? 'text-gray-500' : 'text-gray-500'}`}>Photographie, Direction Artistique & Stylisme.</p>
                            <div className={`w-10 h-px mx-auto mt-6 ${isAdmin ? 'bg-purple-500' : 'bg-pink-300'}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
      )}

      {/* Lightbox Overlay - PORTAL */}
      {lightboxImage && createPortal(
        <div 
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300 backdrop-blur-xl"
            onClick={() => setLightboxImage(null)}
        >
            <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img 
                src={lightboxImage} 
                alt="Full size" 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>,
        document.body
      )}
    </div>
  );
};
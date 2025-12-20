import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PhotoItem } from '../types';

export const FilmStrip: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PhotoItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2025');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative">
      <div className="text-center mb-24 pt-10">
        <h2 className="text-5xl md:text-7xl font-display text-pink-900 drop-shadow-sm mb-6">
            Shooting
        </h2>
        
        <div className="flex justify-center gap-12 font-serif text-lg tracking-widest relative z-20">
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
      </div>
      
      {selectedYear === '2025' ? (
        <div className="relative flex flex-col gap-24 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Central decorative line */}
            <div className="absolute top-10 bottom-10 left-1/2 w-px bg-pink-200 -z-10 transform -translate-x-1/2 hidden md:block" />

            {PORTFOLIO_ITEMS.map((item: PhotoItem, index: number) => (
            <div 
                key={item.id}
                className={`flex w-full ${
                index % 2 === 0 ? 'justify-center md:justify-start md:pl-16' : 'justify-center md:justify-end md:pr-16'
                }`}
            >
                {/* Wrapper for hover effects and positioning */}
                <div 
                    className="relative group cursor-pointer" 
                    onClick={() => setSelectedItem(item)}
                >
                    {/* Polaroid container */}
                    <div 
                    className="bg-white p-4 pb-8 shadow-xl w-72 md:w-[26rem] transition-all duration-500 hover:scale-105 hover:z-20 hover:shadow-2xl border border-gray-100 flex flex-col"
                    style={{ transform: `rotate(${item.rotation}deg)` }}
                    >
                        {/* Tape Effect */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-pink-100/80 rotate-1 shadow-sm z-10 opacity-90" />
                        
                        {/* Image Container */}
                        <div className="overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                            <img 
                            src={item.url} 
                            alt={item.title} 
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        
                        {/* Text Container - Below image to avoid overlap */}
                        <div className="text-center">
                            <h3 className="font-display text-3xl text-gray-800 mb-1 leading-tight">{item.title}</h3>
                            <p className="font-serif text-xs text-pink-500 uppercase tracking-widest">{item.category}</p>
                        </div>
                    </div>

                    {/* Floating Description (appears on hover) */}
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

      {/* Dynamic Gallery Modal - Keeping the ambitious design */}
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
                <div className="p-6 md:p-8 flex justify-between items-center bg-white border-b border-pink-100">
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
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
                        {/* Main large image */}
                        <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group rounded-lg">
                             <img src={selectedItem.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
                        </div>
                        
                        {/* Secondary images */}
                        {selectedItem.gallery.map((img, idx) => (
                            <div 
                                key={idx} 
                                className={`relative overflow-hidden group rounded-lg ${idx === 0 ? 'md:col-span-4 md:row-span-2' : 'md:col-span-4 md:row-span-1'}`}
                            >
                                <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={`Gallery ${idx}`} />
                            </div>
                        ))}
                         <div className="md:col-span-4 bg-pink-50 flex flex-col justify-center p-8 text-center rounded-lg">
                            <h4 className="font-display text-2xl text-pink-900 mb-2">Crédits</h4>
                            <p className="font-serif text-sm text-gray-500 italic">Photographie, Direction Artistique & Stylisme.</p>
                            <div className="w-10 h-px bg-pink-300 mx-auto mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { VerticalNav } from './components/VerticalNav';
import { FilmStrip } from './components/FilmStrip';
import { ContactAI } from './components/ContactAI';
import { Section } from './types';

function App() {
  return (
    <div className="min-h-screen text-gray-800 selection:bg-pink-200 selection:text-pink-900">
      <style>{`
        .text-stroke-pink {
          -webkit-text-stroke: 2px #ec4899;
          color: transparent;
        }
        /* Masquer la scrollbar par défaut pour un look plus épuré, tout en permettant le scroll */
        html {
            scroll-behavior: smooth;
        }
      `}</style>
      
      {/* Navigation Flottante Transparente */}
      <VerticalNav />

      {/* Main Content - Full Width stacked sections */}
      <main className="w-full relative">
        
        {/* SECTION 1: HOME - Dégradé Sweet Pink vers Blanc */}
        <section id={Section.HOME} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-pink-200 via-pink-50 to-white">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                 <div className="absolute top-10 left-10 text-9xl font-display text-pink-400 transform -rotate-12">R</div>
                 <div className="absolute bottom-10 right-10 text-9xl font-display text-pink-400 transform rotate-12">K</div>
            </div>
            
            <div className="text-center z-10 relative">
              <h1 className="text-7xl md:text-9xl font-display text-pink-900 mb-4 tracking-tighter">
                Rose <span className="text-white text-stroke-pink">K.</span>
              </h1>
              <p className="font-serif text-xl md:text-2xl text-gray-600 italic mb-12 tracking-widest">
                Modèle Photo & Muse
              </p>
              
              <div className="animate-bounce mt-8">
                <svg className="w-6 h-6 text-pink-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
            
            {/* Decorative vertical lines */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/50"></div>
            <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white/50"></div>
        </section>

        {/* SECTION 2: GALLERY - Fond Blanc pur pour mettre en valeur les photos */}
        <section id={Section.GALLERY} className="min-h-screen bg-white py-10 relative z-10">
             <FilmStrip />
        </section>

        {/* SECTION 3: ABOUT - Fond Blanc pur avec accent rose subtil */}
        <section id={Section.ABOUT} className="min-h-screen flex items-center bg-white relative overflow-hidden">
             {/* Background Blob - Adjusted specifically for white background */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
             
             <div className="max-w-6xl mx-auto py-20 px-8 flex flex-col md:flex-row items-center gap-20 relative z-10 pl-24">
                <div className="w-full md:w-1/2 relative group">
                     <div className="absolute inset-0 bg-pink-200 transform translate-x-4 translate-y-4 rounded-lg transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                     <img src="https://picsum.photos/600/800?random=10" alt="Rose Portrait" className="relative rounded-lg shadow-xl w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover h-[600px]" />
                </div>
                <div className="w-full md:w-1/2">
                    <span className="text-pink-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Bio & Stats</span>
                    <h2 className="text-6xl font-display text-pink-900 mb-8 leading-tight">Hello, c'est <br/><span className="text-pink-500 italic">Rose</span></h2>
                    <p className="font-serif text-lg text-gray-600 leading-loose mb-10 text-justify">
                        Passionnée par l'art visuel et la mode vintage, je parcours le monde à la recherche de la lumière parfaite. 
                        Mon style allie l'élégance du cinéma classique américain à la fraîcheur de la mode contemporaine. 
                        Je suis disponible pour des projets éditoriaux, commerciaux et artistiques.
                    </p>
                    <div className="grid grid-cols-2 gap-8 border-t border-pink-100 pt-8">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Hauteur</p>
                            <p className="font-display text-2xl text-pink-900">1m75</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Yeux</p>
                            <p className="font-display text-2xl text-pink-900">Noisette</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Cheveux</p>
                            <p className="font-display text-2xl text-pink-900">Bruns</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Base</p>
                            <p className="font-display text-2xl text-pink-900">Paris, FR</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 4: CONTACT - Dégradé Blanc vers Sweet Pink */}
        <section id={Section.CONTACT} className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-pink-50 to-pink-200 relative">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#ec4899 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="z-10 w-full px-4">
                <ContactAI />
            </div>
            <footer className="absolute bottom-8 text-center w-full text-pink-900/60 text-xs font-serif italic">
                © 2025 Rose K. Portfolio - Fait avec amour et paillettes ✨
            </footer>
        </section>

      </main>
    </div>
  );
}

export default App;
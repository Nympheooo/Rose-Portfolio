import React from 'react';
import { VerticalNav } from './components/VerticalNav';
import { FilmStrip } from './components/FilmStrip';
import { ContactAI } from './components/ContactAI';
import { Section } from './types';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Composant interne pour utiliser le contexte
const AppContent = () => {
  const { isAdmin } = usePortfolio();

  // Classes dynamiques selon le mode (Public = Pink/White, Admin/Secret = Dark/Slate)
  const theme = {
    bgMain: isAdmin ? "bg-slate-900 selection:bg-purple-500 selection:text-white" : "bg-white selection:bg-pink-200 selection:text-pink-900",
    textMain: isAdmin ? "text-gray-100" : "text-gray-800",
    homeGradient: isAdmin 
        ? "bg-gradient-to-b from-slate-900 via-slate-800 to-black" 
        : "bg-gradient-to-b from-pink-200 via-pink-50 to-white",
    galleryBg: isAdmin ? "bg-black" : "bg-white",
    aboutBg: isAdmin ? "bg-slate-900" : "bg-white",
    contactGradient: isAdmin
        ? "bg-gradient-to-b from-slate-900 via-purple-900/20 to-black"
        : "bg-gradient-to-b from-white via-pink-50 to-pink-200",
    textAccent: isAdmin ? "text-purple-400" : "text-pink-500",
    textStroke: isAdmin ? "text-stroke-purple" : "text-stroke-pink",
    blobColor: isAdmin ? "bg-purple-900/30" : "bg-pink-50",
    titleColor: isAdmin ? "text-white" : "text-pink-900"
  };

  return (
      <div className={`min-h-screen transition-colors duration-700 ${theme.bgMain} ${theme.textMain}`}>
        <style>{`
          .text-stroke-pink {
            -webkit-text-stroke: 2px #ec4899;
            color: transparent;
          }
          .text-stroke-purple {
            -webkit-text-stroke: 2px #a855f7;
            color: transparent;
          }
          html {
              scroll-behavior: smooth;
          }
          /* Custom scrollbar for masonry layout if needed */
          .masonry-grid {
             column-count: 1;
             column-gap: 1rem;
          }
          @media (min-width: 768px) {
            .masonry-grid {
              column-count: 2;
            }
          }
          @media (min-width: 1024px) {
            .masonry-grid {
              column-count: 3;
            }
          }
          .break-inside-avoid {
            break-inside: avoid;
          }
        `}</style>
        
        {/* Navigation Flottante Transparente */}
        <VerticalNav />

        {/* Main Content - Full Width stacked sections */}
        <main className="w-full relative">
          
          {/* SECTION 1: HOME */}
          <section id={Section.HOME} className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-700 ${theme.homeGradient}`}>
              <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                   <div className={`absolute top-10 left-10 text-9xl font-display transform -rotate-12 ${isAdmin ? 'text-purple-500' : 'text-pink-400'}`}>R</div>
                   <div className={`absolute bottom-10 right-10 text-9xl font-display transform rotate-12 ${isAdmin ? 'text-purple-500' : 'text-pink-400'}`}>K</div>
              </div>
              
              <div className="text-center z-10 relative">
                <h1 className={`text-7xl md:text-9xl font-display mb-4 tracking-tighter ${theme.titleColor}`}>
                  Rose <span className={`text-white ${theme.textStroke}`}>K.</span>
                </h1>
                <p className={`font-serif text-xl md:text-2xl italic mb-12 tracking-widest ${isAdmin ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isAdmin ? "L'autre facette." : "Modèle Photo & Muse"}
                </p>
                
                <div className="animate-bounce mt-8">
                  <svg className={`w-6 h-6 mx-auto ${isAdmin ? 'text-purple-400' : 'text-pink-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
              
              {/* Decorative vertical lines */}
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10"></div>
              <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white/10"></div>
          </section>

          {/* SECTION 2: GALLERY */}
          <section id={Section.GALLERY} className={`min-h-screen py-10 relative z-10 transition-colors duration-700 ${theme.galleryBg}`}>
               <FilmStrip />
          </section>

          {/* SECTION 3: ABOUT */}
          <section id={Section.ABOUT} className={`min-h-screen flex items-center relative overflow-hidden transition-colors duration-700 ${theme.aboutBg}`}>
               {/* Background Blob */}
               <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 transition-colors duration-700 ${theme.blobColor}`}></div>
               
               <div className="max-w-6xl mx-auto py-20 px-8 flex flex-col md:flex-row items-center gap-20 relative z-10 pl-24">
                  <div className="w-full md:w-1/2 relative group">
                       <div className={`absolute inset-0 transform translate-x-4 translate-y-4 rounded-lg transition-transform group-hover:translate-x-6 group-hover:translate-y-6 ${isAdmin ? 'bg-purple-900/50' : 'bg-pink-200'}`}></div>
                       <img 
                          src="https://i.imgur.com/QkaahV8.png" 
                          alt="Rose Portrait" 
                          className={`relative rounded-lg shadow-xl w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover object-center h-[600px] ${isAdmin ? 'brightness-75 contrast-125' : ''}`} 
                       />
                  </div>
                  <div className="w-full md:w-1/2">
                      <span className={`font-bold tracking-[0.3em] uppercase text-sm mb-4 block ${theme.textAccent}`}>{isAdmin ? "Confidentiel" : "Bio & Stats"}</span>
                      <h2 className={`text-6xl font-display mb-8 leading-tight ${theme.titleColor}`}>
                          {isAdmin ? "Rose," : "Hello, moi c'est"} <br/>
                          <span className={`${isAdmin ? 'text-purple-500' : 'text-pink-500'} italic`}>
                              {isAdmin ? "NotAnAngel" : "Rose"}
                          </span>
                      </h2>
                      <p className={`font-serif text-lg leading-loose mb-10 text-justify ${isAdmin ? 'text-gray-300' : 'text-gray-600'}`}>
                           {isAdmin 
                            ? "Ici résident les projets que la lumière du jour n'atteint pas. Une exploration de l'ombre, de l'anonymat et de l'esthétique brute. Cet espace est réservé aux collaborations exclusives et expérimentales." 
                            : "Passionnée par l'art de la photographie, je mets mon image au service de projets visuels comme les marques ou les projets purement artistique. Mon univers se teinte d'émotions et d'élégance candide."}
                      </p>
                      <div className={`grid grid-cols-2 gap-8 border-t pt-8 ${isAdmin ? 'border-gray-800' : 'border-pink-100'}`}>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Âge</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>23 ans</p>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Hauteur</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>1m66</p>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Poids</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>56 kg</p>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Yeux</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>Bleu clair</p>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Cheveux</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>Blanc</p>
                          </div>
                          <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Origine</p>
                              <p className={`font-display text-2xl ${theme.titleColor}`}>Vice City, USA</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* SECTION 4: CONTACT - VISIBLE ONLY IN PUBLIC MODE */}
          {!isAdmin && (
            <section id={Section.CONTACT} className={`min-h-screen flex flex-col items-center justify-center p-4 relative transition-colors duration-700 ${theme.contactGradient}`}>
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient('#ec4899' 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
                <div className="z-10 w-full px-4">
                    <ContactAI />
                </div>
                <footer className="absolute bottom-8 text-center w-full text-xs font-serif italic text-pink-900/60">
                    © 2025 Rose K. Portfolio - Fait avec amour et paillettes ✨
                </footer>
            </section>
          )}

          {/* SIMPLE FOOTER FOR ADMIN MODE (SINCE CONTACT SECTION IS HIDDEN) */}
          {isAdmin && (
             <footer className="py-8 text-center w-full text-xs font-serif italic text-gray-500 bg-slate-900">
                © 2025 Rose K. Portfolio - Mode Parallèle Actif 🌑
            </footer>
          )}

        </main>
      </div>
  );
};

function App() {
  return (
    <PortfolioProvider>
       <AppContent />
    </PortfolioProvider>
  );
}

export default App;
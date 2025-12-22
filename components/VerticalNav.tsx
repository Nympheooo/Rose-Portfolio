import React, { useEffect, useState } from 'react';
import { Section } from '../types';
import { SOCIAL_LINKS } from '../constants';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminMessaging } from './AdminMessaging';

export const VerticalNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const { login, isAdmin, logout, unreadCount } = usePortfolio();

  const scrollToSection = (sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [Section.HOME, Section.GALLERY, Section.ABOUT, Section.CONTACT];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSocialClick = (e: React.MouseEvent, link: typeof SOCIAL_LINKS[0]) => {
    // Si c'est l'icône Profil (Facebrowser), on gère le login admin
    if (link.platform === 'Facebrowser') {
      e.preventDefault();
      if (isAdmin) {
        // Déjà connecté, on redirige ou on propose de déconnecter (ici on ouvre le lien normal)
         if(window.confirm("Vous êtes connecté en Admin. Voulez-vous vous déconnecter ?")) {
             logout();
         } else {
             window.open(link.url, '_blank');
         }
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLoginModal(false);
      setPassword('');
      setLoginError(false);
      alert('Mode Administrateur activé ! ✨');
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-48 flex flex-col justify-between pl-8 py-12 z-50 pointer-events-none">
        {/* Brand Initials */}
        <div 
          className="font-display text-4xl text-pink-500/90 cursor-pointer pointer-events-auto mix-blend-multiply hover:scale-110 transition-transform origin-left" 
          onClick={() => scrollToSection(Section.HOME)}
        >
          R.K
          {isAdmin && <span className="text-xs text-green-500 block font-serif tracking-widest ml-1">ADMIN</span>}
        </div>

        {/* Navigation Links - Horizontal Text in Vertical Layout */}
        <div className="flex flex-col gap-6 pointer-events-auto">
          {[Section.HOME, Section.GALLERY, Section.ABOUT, Section.CONTACT].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              {/* Active Indicator Line */}
              <div className={`h-px bg-pink-500 transition-all duration-300 ${activeSection === section ? 'w-8' : 'w-0 group-hover:w-4'}`} />
              
              <span className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 text-left ${
                activeSection === section 
                  ? 'text-pink-600 font-bold' 
                  : 'text-gray-400 hover:text-pink-400'
              }`}>
                {section === 'home' ? 'Accueil' : 
                 section === 'about' ? 'À Propos' :
                 section === 'gallery' ? 'Shooting' :
                 section}
              </span>
            </button>
          ))}
          
          {/* Admin Messaging Button */}
          {isAdmin && (
             <button
                onClick={() => setShowMessaging(true)}
                className="group flex items-center gap-3 focus:outline-none mt-4 animate-in fade-in"
             >
                <div className="h-px bg-purple-400 w-4 group-hover:w-8 transition-all" />
                <span className="text-xs uppercase tracking-[0.2em] text-purple-500 font-bold flex items-center gap-2">
                    Messagerie
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </span>
             </button>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 pointer-events-auto items-end">
          {SOCIAL_LINKS.map((link) => {
             const isFacebrowserText = link.icon === "@Facebrowser";
             
             return (
                <a
                  key={link.platform}
                  href={link.url}
                  onClick={(e) => handleSocialClick(e, link)}
                  className={`transition-colors transform hover:-translate-y-1 
                    ${isFacebrowserText ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-pink-500'} 
                    ${link.platform === 'Facebrowser' && isAdmin && !isFacebrowserText ? 'text-pink-500' : ''}`
                  }
                >
                  <span className={`text-[10px] font-bold border rounded-full h-8 flex items-center justify-center transition-all
                      ${isFacebrowserText ? 'w-auto px-3 border-red-200 bg-red-50' : 'w-8 border-pink-200 hover:bg-pink-50'}
                      ${!isFacebrowserText && link.platform === 'Facebrowser' && isAdmin ? 'border-pink-500 bg-pink-50' : ''}
                  `}>
                      {link.icon}
                  </span>
                </a>
             );
          })}
        </div>
      </nav>

      {/* Modal Messaging Admin */}
      {showMessaging && (
        <AdminMessaging onClose={() => setShowMessaging(false)} />
      )}

      {/* Modal Login Admin */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-900/20 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-pink-100">
            <h3 className="font-display text-2xl text-pink-900 mb-4 text-center">Espace Privé</h3>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe magique..."
                  className="w-full px-4 py-2 bg-pink-50 border border-pink-100 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none text-center font-serif text-sm"
                  autoFocus
                />
                {loginError && <p className="text-red-400 text-xs text-center mt-2 italic">Mot de passe incorrect</p>}
              </div>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-xs uppercase tracking-wider"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-xs uppercase tracking-wider font-bold"
                >
                  Entrer
                </button>
              </div>
              {/* Lien discret pour l'accès normal si l'utilisateur n'est pas admin mais a cliqué par erreur */}
              <div className="mt-4 text-center border-t border-gray-100 pt-2">
                 <a href={SOCIAL_LINKS.find(l => l.platform === 'Facebrowser')?.url} target="_blank" rel="noreferrer" className="text-[10px] text-gray-300 hover:text-gray-500 uppercase">
                    Accéder au profil public
                 </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
import React, { useEffect, useState } from 'react';
import { Section } from '../types';
import { SOCIAL_LINKS } from '../constants';

export const VerticalNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);

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

  return (
    <nav className="fixed left-0 top-0 h-screen w-48 flex flex-col justify-between pl-8 py-12 z-50 pointer-events-none">
      {/* Brand Initials */}
      <div 
        className="font-display text-4xl text-pink-500/90 cursor-pointer pointer-events-auto mix-blend-multiply hover:scale-110 transition-transform origin-left" 
        onClick={() => scrollToSection(Section.HOME)}
      >
        R.K
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
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 pointer-events-auto">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            className="text-gray-300 hover:text-pink-500 transition-colors transform hover:-translate-y-1"
          >
            <span className="text-[10px] font-bold border border-pink-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-pink-50">
                {link.icon}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};
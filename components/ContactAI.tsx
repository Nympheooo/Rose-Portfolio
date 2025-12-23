import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactAI: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isAdmin } = usePortfolio();

  // ---------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------
  // Utilisation de l'ID sécurisé FormSubmit
  const FORM_ENDPOINT = 'https://formsubmit.co/95df9cba95851c870bbc2e97e454e3ee';
  // ---------------------------------------------------------

  const handleCopy = () => {
      navigator.clipboard.writeText('24717584').then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      });
  };

  // Gestion optimiste de l'affichage après l'envoi
  const handleFormSubmit = () => {
      setTimeout(() => setSubmitted(true), 500);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  // Styles dynamiques
  const containerBg = isAdmin ? 'bg-slate-900 border-purple-900' : 'bg-white border-pink-100';
  const blob1 = isAdmin ? 'bg-purple-900 opacity-40' : 'bg-pink-200 opacity-70';
  const blob2 = isAdmin ? 'bg-indigo-900 opacity-40' : 'bg-purple-200 opacity-70';
  const infoBg = isAdmin ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-r from-pink-50 to-white border-pink-200';
  const infoText = isAdmin ? 'text-gray-300' : 'text-gray-600';
  const titleColor = isAdmin ? 'text-white' : 'text-pink-900';
  const subtitleColor = isAdmin ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isAdmin ? 'bg-slate-800/50 border-slate-700 text-gray-200 focus:ring-purple-500' : 'bg-pink-50/50 border-pink-100 text-gray-800 focus:ring-pink-400';
  const btnPrimary = isAdmin ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20' : 'bg-pink-500 hover:bg-pink-600 shadow-lg';
  const numberBox = isAdmin ? 'bg-slate-800 border-slate-700 hover:border-purple-500' : 'bg-white border-pink-100 hover:border-pink-300';
  const numberText = isAdmin ? 'text-gray-200' : 'text-gray-800';

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 md:p-12 shadow-2xl rounded-3xl border-4 relative overflow-hidden transition-colors duration-500 ${containerBg}`}>
        {/* Background Decorative Elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl animate-blob ${blob1}`}></div>
        <div className={`absolute -bottom-8 -left-8 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 ${blob2}`}></div>

      <div className="relative z-10">
        
        {/* BANDEAU INFO RAPIDE */}
        <div className={`rounded-2xl p-6 mb-10 shadow-sm text-center relative overflow-hidden border ${infoBg}`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isAdmin ? 'from-purple-600 via-indigo-500 to-purple-600' : 'from-pink-300 via-purple-300 to-pink-300'}`}></div>
            
            <h3 className={`font-display text-2xl mb-3 uppercase tracking-widest ${titleColor}`}>Contact Direct</h3>
            
            <div className={`font-serif leading-relaxed space-y-2 ${infoText}`}>
                <p>
                    Retrouvez-moi sur <a href="https://facebrowser.gta.world/notanangel" target="_blank" rel="noreferrer" className="text-red-500 font-bold hover:text-red-600 hover:underline decoration-red-300 underline-offset-2 transition-all">Facebrowser</a>
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <span>ou par SMS au</span>
                    <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border shadow-sm group transition-colors ${numberBox}`}>
                        <svg className={`w-4 h-4 ${isAdmin ? 'text-purple-500' : 'text-pink-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span className={`font-mono font-bold tracking-wider ${numberText}`}>24717584</span>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button 
                            onClick={handleCopy}
                            className={`text-[10px] uppercase font-bold transition-colors focus:outline-none ${isAdmin ? 'text-gray-500 hover:text-purple-400' : 'text-gray-400 hover:text-pink-600'}`}
                            title="Copier le numéro"
                        >
                            {copied ? (
                                <span className="text-green-500 flex items-center animate-in fade-in slide-in-from-left-1">
                                    Copié
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                            ) : (
                                "Copier"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <h2 className={`text-4xl font-display text-center mb-2 ${titleColor}`}>M'envoyer un mot</h2>
        <p className={`text-center font-serif italic mb-8 ${subtitleColor}`}>Une proposition, un projet ou juste un coucou ?</p>

        {submitted ? (
             <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-xl text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p className="font-display text-2xl mb-2">Formulaire Envoyé</p>
                <p className="text-xs mt-4 text-green-600 opacity-70">
                    Merci ! Une page de confirmation s'est ouverte dans un nouvel onglet.
                </p>
                
                <button 
                    onClick={handleReset}
                    className="mt-8 px-6 py-3 bg-white border border-green-200 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-green-50 hover:shadow-md transition-all duration-300"
                >
                    Envoyer un autre message
                </button>
             </div>
        ) : (
            <form 
                action={FORM_ENDPOINT} 
                method="POST"
                target="_blank"
                onSubmit={handleFormSubmit}
                className="space-y-6"
            >
                <input type="hidden" name="_subject" value="Nouveau contact Portfolio" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="email" value="contactportfolio@gmail.com" />

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Comment dois-je vous appeler ?</label>
                    <input
                        type="text"
                        name="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-colors font-serif ${inputBg}`}
                        placeholder="Votre nom, pseudonyme..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Votre numéro (Facultatif)</label>
                    <input
                        type="text"
                        name="phone"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-colors font-serif ${inputBg}`}
                        placeholder="Pour que je puisse vous recontacter..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Votre Message</label>
                    <textarea
                        name="message"
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-colors font-serif ${inputBg}`}
                        placeholder="Dites-moi tout..."
                        required
                    />
                </div>
            
                <button
                    type="submit"
                    className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm flex justify-center items-center gap-3 ${btnPrimary}`}
                >
                    <span>Envoyer</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </form>
        )}
      </div>
    </div>
  );
};
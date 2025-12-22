import React, { useState } from 'react';

export const ContactAI: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
  // Comme le formulaire s'ouvre dans un nouvel onglet, on affiche simplement un message de succès ici.
  const handleFormSubmit = () => {
      setTimeout(() => setSubmitted(true), 500);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-3xl border-4 border-pink-100 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        
        {/* BANDEAU INFO RAPIDE */}
        <div className="bg-gradient-to-r from-pink-50 to-white border border-pink-200 rounded-2xl p-6 mb-10 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
            
            <h3 className="font-display text-2xl text-pink-900 mb-3 uppercase tracking-widest">Contact Direct</h3>
            
            <div className="text-gray-600 font-serif leading-relaxed space-y-2">
                <p>
                    Retrouvez-moi sur <a href="https://facebrowser.gta.world/notanangel" target="_blank" rel="noreferrer" className="text-red-500 font-bold hover:text-red-600 hover:underline decoration-red-300 underline-offset-2 transition-all">Facebrowser</a>
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <span>ou par SMS au</span>
                    <div className="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-pink-100 shadow-sm group hover:border-pink-300 transition-colors">
                        <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span className="font-mono font-bold text-gray-800 tracking-wider">24717584</span>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button 
                            onClick={handleCopy}
                            className="text-[10px] uppercase font-bold text-gray-400 hover:text-pink-600 transition-colors focus:outline-none"
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

        <h2 className="text-4xl font-display text-center text-pink-900 mb-2">M'envoyer un mot</h2>
        <p className="text-center text-gray-500 font-serif italic mb-8">Une proposition, un projet ou juste un coucou ?</p>

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
                {/* Champs cachés de configuration FormSubmit */}
                <input type="hidden" name="_subject" value="Nouveau contact Portfolio" />
                <input type="hidden" name="_template" value="table" />
                
                {/* Champ Email Caché et Fixe */}
                <input type="hidden" name="email" value="contactportfolio@gmail.com" />

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Comment dois-je vous appeler ?</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                        placeholder="Votre nom, pseudonyme..."
                        required
                    />
                </div>

                {/* Le champ email visible a été retiré et remplacé par l'input hidden ci-dessus */}

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Votre numéro (Facultatif)</label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                        placeholder="Pour que je puisse vous recontacter..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Votre Message</label>
                    <textarea
                        name="message"
                        rows={5}
                        className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                        placeholder="Dites-moi tout..."
                        required
                    />
                </div>
            
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pink-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm flex justify-center items-center gap-3"
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
import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactAI: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ---------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------
  const DESTINATION_EMAIL = 'nymphe.jdr@gmail.com'; 
  // ---------------------------------------------------------

  const { sendMessage } = usePortfolio();

  const handleSubmit = (e: React.FormEvent) => {
    // On laisse le formulaire s'envoyer naturellement vers FormSubmit (target="_blank")
    // On enregistre juste en local pour l'admin
    sendMessage(name, phone, message);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-3xl border-4 border-pink-100 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-display text-center text-pink-900 mb-2">Travaillons Ensemble</h2>
        <p className="text-center text-gray-500 font-serif italic mb-8">Parlez-moi de votre projet ✨</p>

        {submitted ? (
             <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-xl text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <p className="font-display text-2xl mb-2">Validation requise</p>
                
                <p className="text-xs mt-6 text-green-600 opacity-70 uppercase tracking-widest">Une fois validé, je vous recontacterai sous peu.</p>
                
                <button 
                    onClick={handleReset}
                    className="mt-8 px-6 py-3 bg-white border border-green-200 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-green-50 hover:shadow-md transition-all duration-300"
                >
                    J'ai une autre demande
                </button>
             </div>
        ) : (
            <form 
                action={`https://formsubmit.co/${DESTINATION_EMAIL}`} 
                method="POST" 
                target="_blank"
                onSubmit={handleSubmit} 
                className="space-y-5"
            >
            {/* Configuration FormSubmit */}
            <input type="hidden" name="_subject" value={`Portfolio: Nouveau message de ${name}`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="true" /> {/* Force le captcha pour garantir l'envoi */}
            <input type="text" name="_honey" style={{display: 'none'}} />

            <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Nom complet</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                    placeholder="Votre identité..."
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Téléphone (Optionnel)</label>
                <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                    placeholder="06..."
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Votre Message</label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-colors font-serif text-gray-800"
                    placeholder="Détails du shooting, dates, inspiration..."
                    required
                />
            </div>
            
            <button
                type="submit"
                className="w-full bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pink-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm flex justify-center items-center gap-3"
            >
                <span>Envoyer le message</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>

            {/* Lien de secours */}
            <div className="text-center mt-4">
                <a href={`mailto:${DESTINATION_EMAIL}`} className="text-[10px] text-gray-400 hover:text-pink-500 uppercase tracking-widest border-b border-transparent hover:border-pink-300 transition-all pb-0.5">
                    Problème d'envoi ? Cliquez ici pour m'écrire directement
                </a>
            </div>
            </form>
        )}
      </div>
    </div>
  );
};
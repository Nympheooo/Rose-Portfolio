import React, { useState } from 'react';
import { generateDraftReply } from '../services/geminiService';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactAI: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [aiDraft, setAiDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { sendMessage } = usePortfolio();

  const handleSimulateResponse = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!message || !name) return;
    
    setLoading(true);
    const draft = await generateDraftReply(message, name);
    setAiDraft(draft);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Envoi du message via le contexte (stockage DB locale)
    sendMessage(name, phone, message);

    setSubmitted(true);
    
    // Reset du formulaire
    setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setMessage('');
        setAiDraft('');
    }, 3000);
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
             <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center animate-pulse">
                <p className="font-bold text-xl mb-2">Message Envoyé ! 💌</p>
                <p>Merci {name}, votre message a bien été transmis à Rose.</p>
             </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Nom et Prénom</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
                    placeholder="Votre identité..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Numéro de téléphone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
                    placeholder="06..."
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Votre Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
                    placeholder="Détails du shooting, dates, inspiration..."
                    required
                />
            </div>

            {/* AI Assistant Feature */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-purple-500 uppercase flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Assistant IA de Rose
                    </span>
                    <button 
                        type="button"
                        onClick={handleSimulateResponse}
                        disabled={!message || loading}
                        className="text-xs underline text-pink-600 hover:text-pink-800 disabled:opacity-50"
                    >
                        {loading ? 'Réflexion...' : 'Prévisualiser la réponse auto'}
                    </button>
                </div>
                
                {aiDraft && (
                    <div className="bg-white p-3 rounded border border-gray-100 text-sm text-gray-600 italic font-serif leading-relaxed">
                        "{aiDraft}"
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-pink-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm"
            >
                Envoyer le message
            </button>
            </form>
        )}
      </div>
    </div>
  );
};
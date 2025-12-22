import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactAI: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // ---------------------------------------------------------
  // CONFIGURATION FACILE
  // Remplacez simplement l'email ci-dessous par le vôtre.
  // Lors du premier envoi, vous recevrez un mail pour "Activer" le formulaire.
  // ---------------------------------------------------------
  const DESTINATION_EMAIL = 'votre_email@exemple.com'; 
  // ---------------------------------------------------------

  const { sendMessage } = usePortfolio();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    
    // 1. Sauvegarde locale (pour l'admin dashboard)
    sendMessage(name, phone, message);

    try {
        // 2. Envoi via FormSubmit.co (Alternative robuste à EmailJS)
        // Pas de librairie requise, juste un appel standard.
        const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                message: message,
                _subject: `Nouveau contact Portfolio de ${name}`, // Sujet du mail
                _template: "table", // Format du mail plus joli
                _captcha: "false"   // Désactive le captcha google (optionnel)
            })
        });

        const data = await response.json();

        if (response.ok) {
            setSubmitted(true);
            // Reset du formulaire
            setTimeout(() => {
                setSubmitted(false);
                setName('');
                setPhone('');
                setMessage('');
            }, 5000);
        } else {
            // En cas d'erreur renvoyée par le service
            throw new Error(data.message || "Erreur lors de l'envoi");
        }

    } catch (err: any) {
        console.error("❌ Erreur d'envoi:", err);
        setError("Impossible d'envoyer le message pour le moment. Réessayez plus tard.");
    } finally {
        setSending(false);
    }
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
             <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center animate-in fade-in zoom-in">
                <p className="font-bold text-xl mb-2">Message Envoyé ! 💌</p>
                <p>Merci {name}, votre message a bien été transmis.</p>
                <p className="text-xs mt-4 text-green-600 opacity-70">Je vous répondrai très vite !</p>
             </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Nom et Prénom</label>
                <input
                    type="text"
                    name="name"
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
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
                    placeholder="06..."
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Votre Message</label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 font-serif"
                    placeholder="Détails du shooting, dates, inspiration..."
                    required
                />
            </div>
            
            {error && (
                <div className="text-red-600 text-sm font-bold text-center bg-red-50 p-4 rounded border border-red-200 animate-pulse">
                    ⚠️ {error}
                </div>
            )}

            <button
                type="submit"
                disabled={sending}
                className="w-full bg-pink-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-pink-600 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {sending ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                    </>
                ) : (
                    'Envoyer le message'
                )}
            </button>
            </form>
        )}
      </div>
    </div>
  );
};
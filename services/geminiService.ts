import { GoogleGenAI } from "@google/genai";

// Récupération sécurisée de la clé API selon l'environnement (Vite ou standard)
// Note: Sur Vercel avec Vite, la variable doit s'appeler VITE_API_KEY
const getApiKey = () => {
  try {
    // @ts-ignore - Support pour Vite
    if (import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
    // Fallback pour Create React App ou environnements Node
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Erreur lors de la lecture de la clé API");
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateDraftReply = async (inquiryText: string, senderName: string): Promise<string> => {
  if (!apiKey) {
    return "Configuration manquante : Clé API non trouvée. Veuillez configurer VITE_API_KEY.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Tu es l'assistant personnel virtuel de Rose K., une modèle photo professionnelle au style 'sweet, girly, retro mais pro'.
        
        Un professionnel nommé ${senderName} a envoyé ce message : "${inquiryText}".
        
        Rédige une réponse courte, polie, professionnelle mais avec une touche chaleureuse et mignonne (style 'sweet pink'). 
        Remercie pour l'intérêt, indique que Rose est actuellement disponible pour des collaborations sur Paris et qu'elle reviendra vers eux sous 24h.
        Signe "Team Rose ✨".
      `,
    });
    return response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
  } catch (error) {
    console.error("Error generating draft:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant.";
  }
};
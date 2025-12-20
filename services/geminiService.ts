import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDraftReply = async (inquiryText: string, senderName: string): Promise<string> => {
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
import React from 'react';

// Ce composant n'est plus utilisé car la messagerie interne a été remplacée par l'envoi direct d'emails.
// Le fichier est conservé comme placeholder pour éviter les erreurs d'import si nécessaire, 
// mais la fonctionnalité est désactivée.
export const AdminMessaging: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return null;
};
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface AdminMessagingProps {
  onClose: () => void;
}

export const AdminMessaging: React.FC<AdminMessagingProps> = ({ onClose }) => {
  const { messages, markMessageAsRead, deleteMessage, unreadCount } = usePortfolio();

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-pink-950/80 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-pink-100 max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="p-6 border-b border-pink-100 bg-pink-50/50 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 text-pink-500 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                        <h3 className="font-display text-2xl text-pink-900">Messagerie</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                            {unreadCount} message{unreadCount > 1 ? 's' : ''} non lu{unreadCount > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                        <p className="font-serif italic">Aucun message pour le moment</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`group relative bg-white p-5 rounded-xl border transition-all hover:shadow-md ${!msg.read ? 'border-pink-300 shadow-sm' : 'border-gray-100 opacity-90'}`}
                            >
                                {/* Status Indicator */}
                                {!msg.read && (
                                    <span className="absolute top-5 right-5 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                                )}

                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className={`text-lg ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                            {msg.name}
                                        </h4>
                                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 uppercase tracking-wide">
                                            <span>{formatDate(msg.date)}</span>
                                            {msg.phone && (
                                                <span className="flex items-center gap-1 text-pink-400">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                    {msg.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!msg.read && (
                                            <button 
                                                onClick={() => markMessageAsRead(msg.id)}
                                                className="p-2 bg-pink-50 text-pink-600 rounded hover:bg-pink-100 text-xs font-bold uppercase"
                                                title="Marquer comme lu"
                                            >
                                                Lu
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => {
                                                if(window.confirm('Supprimer ce message définitivement ?')) {
                                                    deleteMessage(msg.id);
                                                }
                                            }}
                                            className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded"
                                            title="Supprimer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <p className="text-gray-700 font-serif whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
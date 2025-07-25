import React, { useState } from 'react';
import api from '../api/axios';

export default function CommentForm({ ticketId, onCommentAdded }) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      await api.post(`/tickets/${ticketId}/comments`, {
        ticket_id: ticketId,  
        content: message     
      });
      setMessage('');
      onCommentAdded();
    } catch (err) {
      console.error('Erreur ajout commentaire:', err);
    }
  };

  return (
    <form className="Edit-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Ajouter un commentaire..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={2}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-1 bg-blue-500 text-white px-3 py-1 rounded">
        Envoyer
      </button>
    </form>
  );
}

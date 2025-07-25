// ce composant affiche les commentaires liés à un ticket

import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function CommentList({ ticketId }) {
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const res = await api.get(`/tickets/${ticketId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error('Erreur chargement commentaires:', err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold">Commentaires</h4>
      {comments.map((c) => (
        <div key={c.id} className="border p-2 my-1 rounded">
          <p className="text-sm text-gray-700">{c.message}</p>
          <small className="text-xs text-gray-500">
            par {c.user?.name} ({c.user?.role}) - {new Date(c.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

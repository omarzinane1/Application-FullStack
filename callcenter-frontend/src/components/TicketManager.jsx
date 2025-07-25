// Composant qui gère un ticket en détail
// Permet de modifier le statut via TicketEditForm
// Permet d’ajouter un commentaire via CommentForm
// Affiche la liste des commentaires via CommentList
// Utilise refreshKey pour forcer le rechargement des commentaires à chaque ajout

import React, { useState } from 'react';
import TicketEditForm from './TicketEditForm';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function TicketManager({ ticket, onUpdated }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1); // force le rechargement des commentaires
  };

  if (!ticket) return null;

  return (
    <div className="mt-4 p-3 border rounded shadow">
      <h3 className="text-lg font-bold">Gestion du Ticket</h3>
      <TicketEditForm ticket={ticket} onUpdated={onUpdated} />
      <CommentForm ticketId={ticket.id} onCommentAdded={handleCommentAdded} />
      <CommentList ticketId={ticket.id} key={refreshKey} />
    </div>
  );
}

// Composant pour éditer le statut d’un ticket
// Permet de changer le statut (en_cours / resolu) et sauvegarder via API
// Après sauvegarde, prévient le parent avec onUpdated

import React, { useState } from 'react';
import api from '../api/axios';

export default function TicketEditForm({ ticket, onUpdated }) {
  const [status, setStatus] = useState(ticket.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tickets/${ticket.id}`, { status });
      onUpdated(res.data.ticket);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du ticket', error);
    }
  };

  return (
    <form className="Edit-form" onSubmit={handleSubmit}>
      <label>Statut :</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="en_cours">En cours</option>
        <option value="resolu">Résolu</option>
      </select>
      <button className="edit-btn" type="submit">Mettre à jour</button>
    </form>
  );
}

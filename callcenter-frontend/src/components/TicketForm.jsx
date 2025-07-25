// Formulaire pour créer ou modifier un ticket
// Charge la liste des appels pour sélectionner un appel lié au ticket
// Envoie la requête POST ou PUT selon si c’est création ou édition
// Préviens le parent via onSaved pour rafraîchir la liste

import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function TicketForm({ ticket, onSaved }) {
  const [description, setDescription] = useState(ticket ? ticket.description : '');
  const [callId, setCallId] = useState(ticket ? ticket.call_id : '');
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const res = await api.get('/calls');
        setCalls(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des appels :", err);
      }
    };
    fetchCalls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { description, call_id: callId };
    try {
      if (ticket) {
        await api.put(`/tickets/${ticket.id}`, payload);
      } else {
        await api.post('/tickets', payload);
      }
      onSaved();
    } catch (error) {
      alert("Erreur lors de l'enregistrement du ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <select
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        required
      >
        <option value="">-- Sélectionner un appel --</option>
        {calls.map((call) => (
          <option key={call.id} value={call.id}>
            {call.caller_name || `Appel #${call.id}`}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description du ticket"
        required
      />

      <button type="submit">Créer</button>
    </form>

  );
}

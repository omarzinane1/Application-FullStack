// Composant qui affiche la liste des tickets
// Affiche appel, description, statut de chaque ticket
// Bouton "Modifier" appelle onEdit pour éditer le ticket sélectionné

import React from 'react';

export default function TicketList({ tickets, onEdit }) {
  return (
    <ul className="ticket-list">
      {tickets.map(t => (
        <li key={t.id}>
          <strong>Appel :</strong> {t.call_id} <br />
          <strong>Description :</strong> {t.description} <br />
          <strong>Statut :</strong> {t.status}
          <br />
          <button onClick={() => onEdit(t)}>Modifier</button>
        </li>
      ))}
    </ul>
  );
}

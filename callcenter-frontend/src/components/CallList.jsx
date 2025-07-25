// ce composant affiche la liste des appels avec date, sujet et durée
// il utilise `calls.map` pour générer chaque ligne

import React from 'react';

export default function CallList({ calls }) {
  return (
    <ul className="call-list">
      {calls.map(c => (
        <li key={c.id}>
          <span className="call-date">{new Date(c.start_time).toLocaleString()}</span>
          <span className="call-subject">{c.subject}</span>
          <span className="call-duration">{c.duration} min</span>
        </li>
      ))}
    </ul>
  );
}

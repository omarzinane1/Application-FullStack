
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Page non trouvée</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    </div>
  );
}

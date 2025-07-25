// ce formulaire permet d’ajouter un appel (sujet, durée, heure) avec post vers /calls
// quand on valide, il vide les champs et affiche "Appel enregistrés"

import React, { useState } from 'react';
import api from '../api/axios';

export default function CallForm({ onAdd }) {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !duration || !time) return alert('Remplissez tous les champs');

    try {
      const today = new Date().toISOString().split('T')[0];
      const startTime = new Date(`${today}T${time}:00`).toISOString();

      await api.post('/calls', {
        start_time: startTime,
        duration: parseInt(duration),
        subject,
      });

      setSubject('');
      setDuration('');
      setTime('');
      onAdd();
      alert('Appel enregistrés');
    } catch (error) {
      alert("Erreur lors de l'ajout de l'appel");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="call-form">
      <input
        type="text"
        placeholder="Sujet de l'appel"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        className="call-input"
        required
      />
      <input
        type="number"
        placeholder="Durée (minutes)"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        className="call-input small"
        required
      />
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        className="call-input small"
        required
      />
      <button type="submit" className="call-button">Ajouter Appel</button>
    </form>
  );
}

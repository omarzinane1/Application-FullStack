/** DashboardSuperviseur : affiche tableaux appels, tickets, gestion agents (création, liste) */
/** Utilise useAuth pour logout, axios pour charger appels, tickets et gérer agents */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function DashboardSupervisor() {
  const { logout } = useAuth();
  const [calls, setCalls] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showCreateAgentForm, setShowCreateAgentForm] = useState(false);

  // Form state pour création agent
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPassword, setAgentPassword] = useState('');

  useEffect(() => {
    loadCalls();
    loadTickets();
    loadAgents();
  }, []);

  const loadCalls = async () => {
    try {
      const res = await api.get('/calls');
      setCalls(res.data);
    } catch (error) {
      console.error("Erreur chargement appels:", error);
    }
  };

  const loadTickets = async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data);
    } catch (error) {
      console.error("Erreur chargement tickets:", error);
    }
  };

  const loadAgents = async () => {
    try {
      const res = await api.get('/users?role=agent');
      setAgents(res.data);
    } catch (error) {
      console.error("Erreur chargement agents:", error);
    }
  };

    const handleCreateAgent = async (e) => {
    e.preventDefault();
    if (!agentName || !agentEmail || !agentPassword) {
      alert("Remplissez tous les champs");
      return;
    }

    if (agentPassword.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      await api.post('/register', {
        name: agentName,
        email: agentEmail,
        password: agentPassword,
        role: 'agent',
      });
      alert("Agent créé avec succès");
      setAgentName('');
      setAgentEmail('');
      setAgentPassword('');
      setShowCreateAgentForm(false);
      loadAgents();
    } catch (error) {
      alert("Erreur lors de la création de l'agent");
      console.error(error.response?.data || error.message);
    }
  };


  const handleDeleteAgent = async (id) => {
    if (!window.confirm("Supprimer cet agent ?")) return;
    try {
      await api.delete(`/users/${id}`);
      loadAgents();
    } catch (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-supervisor">
      <button className="logout-button" onClick={logout}>Déconnexion</button>
      <h1>Dashboard Superviseur</h1>

      <section>
        <h2>Appels</h2>
        <table className="calls-table">
          <thead>
            <tr>
              <th>Date & Heure</th>
              <th>Sujet</th>
              <th>Durée (min)</th>
            </tr>
          </thead>
          <tbody>
            {calls.map(c => (
              <tr key={c.id}>
                <td>{new Date(c.start_time).toLocaleString()}</td>
                <td>{c.subject}</td>
                <td>{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Tickets</h2>
        <ul className="list-simple">
          {tickets.map(t => (
            <li key={t.id}>
              <span>{t.description}</span>
              <span className="status">{t.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Agents</h2>
        <button onClick={() => setShowCreateAgentForm(!showCreateAgentForm)}>
          {showCreateAgentForm ? "Annuler" : "Créer Agent"}
        </button>

        {showCreateAgentForm && (
          <form className="fromAgent" onSubmit={handleCreateAgent} style={{ marginTop: '1em' }}>
            <input
              type="text"
              placeholder="Nom complet"
              value={agentName}
              onChange={e => setAgentName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={agentEmail}
              onChange={e => setAgentEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={agentPassword}
              onChange={e => setAgentPassword(e.target.value)}
              required
            />
            <button type="submit">Créer</button>
          </form>
        )}

        <ul className="agents-list">
          {agents.map(agent => (
            <li key={agent.id}>
              <div className="agent-info">
                <strong>{agent.name}</strong> <br />
                <span>{agent.email}</span>
              </div>
              <button
                className="agent-delete-button"
                onClick={() => handleDeleteAgent(agent.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>


      </section>
    </div>
  );
}

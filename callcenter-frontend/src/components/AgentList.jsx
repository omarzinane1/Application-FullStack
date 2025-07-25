import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger la liste des agents depuis le backend
  const loadAgents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users?role=agent');
      setAgents(res.data);
    } catch (error) {
      alert("Erreur lors du chargement des agents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un agent
  const handleDeleteAgent = async (id) => {
    if (!window.confirm('Confirmez-vous la suppression de cet agent ?')) return;

    try {
      await api.delete(`/users/${id}`);
      alert('Agent supprimé avec succès');
      loadAgents(); // Recharge la liste
    } catch (error) {
      alert('Erreur lors de la suppression de l\'agent');
      console.error(error);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  if (loading) return <p>Chargement des agents...</p>;

  return (
    <div className="agent-list-container">
      <h2>Liste des Agents</h2>
      {agents.length === 0 ? (
        <p>Aucun agent trouvé.</p>
      ) : (
        <ul className="agent-list">
          {agents.map(agent => (
            <li key={agent.id} className="agent-item">
              <span>{agent.name} ({agent.email})</span>
              <button
                className="btn-delete"
                onClick={() => handleDeleteAgent(agent.id)}
                style={{
                  marginLeft: '1em',
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

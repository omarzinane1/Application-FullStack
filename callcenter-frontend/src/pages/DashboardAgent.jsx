/** Page DashboardAgent : affiche appels + tickets pour agent, gestion création et modification des tickets avec commentaires */
/** Utilise useAuth pour déconnexion, axios pour charger données et composants enfants pour formulaire et liste */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import CallForm from '../components/CallForm';
import CallList from '../components/CallList';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import TicketEditForm from '../components/TicketEditForm';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

export default function DashboardAgent() {
  const { logout } = useAuth();
  const [calls, setCalls] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  const loadCalls = async () => {
    try {
      const res = await api.get('/calls');
      setCalls(res.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des appels :", error);
    }
  };

  const loadTickets = async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des tickets :", error);
    }
  };

  useEffect(() => {
    loadCalls();
    loadTickets();
  }, []);

  const refreshTickets = () => {
    setEditingTicket(null);
    loadTickets();
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  return (
    <div className="dashboard-agent">
      <div className="header">
        <h1>Dashboard Agent</h1>
        <button className="logout-button" onClick={logout}>Déconnexion</button>
      </div>

      <section className="section">
        <h2>Appels</h2>
        <CallForm onAdd={loadCalls} />
        <CallList calls={calls} />
      </section>

      <section className="section">
        <h2>Tickets</h2>
        <TicketForm ticket={null} onSaved={refreshTickets} />
        <TicketList tickets={tickets} onEdit={handleEditTicket} />

        {editingTicket && (
          <div className="ticket-edit-section">
            <h3>Modifier le Ticket</h3>
            <TicketEditForm ticket={editingTicket} onUpdated={refreshTickets} />
            <CommentForm ticketId={editingTicket.id} onCommentAdded={refreshTickets} />
            <CommentList ticketId={editingTicket.id} />
          </div>
        )}
      </section>
    </div>
  );
}

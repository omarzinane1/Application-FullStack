<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Créer un ticket pour un appel
     * Accessible par un agent après un appel
     */
    public function store(Request $request)
    {
        $request->validate([
            'call_id'     => 'required|exists:calls,id',
            'description' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'call_id'     => $request->call_id,
            'description' => $request->description,
            'status'      => 'en_cours', // par défaut
        ]);

        return response()->json([
            'message' => 'Ticket créé avec succès',
            'ticket'  => $ticket
        ], 201);
    }

    /**
     * Mettre à jour le statut d’un ticket
     * Exemple : passer de 'en_cours' à 'resolu'
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:en_cours,resolu'
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->status = $request->status;
        $ticket->save();

        return response()->json([
            'message' => 'Statut du ticket mis à jour',
            'ticket'  => $ticket
        ]);
    }

    /**
     * la liste complète des tickets
     * Pour tableau de bord des superviseurs
     */
    public function index()
    {
        $tickets = Ticket::with(['call.user', 'comments.user'])->latest()->get();

        return response()->json($tickets);
    }
}

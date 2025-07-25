<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Ajouter un commentaire à un ticket
     * Accessible par tous les utilisateurs connectés
     */
    public function store(Request $request)
    {
        $request->validate([
            'ticket_id' => 'required|exists:tickets,id',
            'message'   => 'required|string',
        ]);

        $comment = Comment::create([
            'ticket_id' => $request->ticket_id,
            'user_id'   => auth()->id(),
            'message'   => $request->message,
        ]);

        return response()->json([
            'message' => 'Commentaire ajouté avec succès',
            'comment' => $comment
        ], 201);
    }

    /**
     * Lister tous les commentaires d’un ticket
     */
    public function index($ticketId)
    {
        $comments = Comment::where('ticket_id', $ticketId)
            ->with('user:id,name,role') 
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($comments);
    }
}

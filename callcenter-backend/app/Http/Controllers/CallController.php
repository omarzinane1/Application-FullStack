<?php

namespace App\Http\Controllers;

use App\Models\Call;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CallController extends Controller
{
    // Enregistrement d’un appel (agent uniquement)
    public function store(Request $request)
    {
        $request->validate([
            'start_time' => 'required|date',
            'duration'   => 'required|integer|min:1',
            'subject'    => 'required|string|max:255',
        ]);

        $call = Call::create([
            'user_id'    => Auth::id(),
            'start_time' => $request->start_time,
            'duration'   => $request->duration,
            'subject'    => $request->subject,
        ]);

        return response()->json(['message' => 'Appel enregistré', 'call' => $call], 201);
    }

    // Visualisation de tous les appels (superviseur uniquement)
    public function index()
    {
        // Tous les appels avec nom de l'agent
        $calls = Call::with('user:id,name,email')->latest()->get();

        return response()->json($calls);
    }
}

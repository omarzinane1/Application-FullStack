<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    // Inscription (réservée au superviseur pour créer des comptes agents)
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role'     => 'in:agent,superviseur'
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role ?? 'agent',
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Identifiants invalides'], 401);
        }

        return response()->json([
            'token'   => $token,
            'user'    => auth()->user()
        ]);
    }

    // Récupérer l'utilisateur connecté
    public function me()
    {
        return response()->json(auth()->user());
    }
    // Liste agents seulement
    public function allUser(Request $request)
    {
        $role = $request->query('role', null);

        $query = User::query();
        if ($role) {
            $query->where('role', $role);
        }

        $users = $query->get();

        return response()->json($users);
    }
     // Supprimer un user par id
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    // Déconnexion
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}

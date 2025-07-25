<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
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
}

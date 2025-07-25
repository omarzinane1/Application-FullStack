<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsSupervisor
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->role === 'superviseur') {
            return $next($request);
        }

        return response()->json(['message' => 'Accès refusé. Superviseur uniquement.'], 403);
    }
}

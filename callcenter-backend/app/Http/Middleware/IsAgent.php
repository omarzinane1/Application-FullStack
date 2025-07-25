<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAgent
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->role === 'agent') {
            return $next($request);
        }

        return response()->json(['message' => 'Accès refusé. Agent uniquement.'], 403);
    }
}

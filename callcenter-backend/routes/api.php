<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:api'])->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Appels (uniquement agents)
    Route::middleware('agent')->group(function () {
        Route::post('/calls', [CallController::class, 'store']);
    });

    // Appels (superviseurs peuvent voir tout)
    Route::middleware('superviseur')->group(function () {
        Route::get('/calls', [CallController::class, 'index']);
        Route::delete('/users/{id}', [AuthController::class, 'destroy']);
        Route::get('/users', [AuthController::class, 'allUser']);
    });

    // Tickets
    Route::middleware('agent')->group(function () {
        Route::post('/tickets', [TicketController::class, 'store']);
        Route::get('/calls', [CallController::class, 'index']);
        Route::put('/tickets/{id}', [TicketController::class, 'update']);
    });

    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/calls', [CallController::class, 'index']);

    // Commentaires
    Route::post('/tickets/{id}/comments', [CommentController::class, 'store']);
    Route::get('/tickets/{id}/comments', [CommentController::class, 'index']);
});

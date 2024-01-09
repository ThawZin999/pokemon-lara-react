<?php

use App\Http\Controllers\CardController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/register', [UserController::class,'register']);
Route::post('/login', [UserController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/create-card', [CardController::class, 'store']);
    Route::get('/index-card', [CardController::class, 'index']);
    Route::put('/update-status/{cardId}', [CardController::class, 'updateStatus']);
    Route::get('/edit-card/{cardId}', [CardController::class, 'edit']);
    Route::put('/update-card/{cardId}', [CardController::class, 'update']);
    Route::delete('/delete-card/{cardId}', [CardController::class, 'destroy']);
});

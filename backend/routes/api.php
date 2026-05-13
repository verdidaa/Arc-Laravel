<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function (): void {
    Route::get('/me', [AuthController::class, 'auth']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

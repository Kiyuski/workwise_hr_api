<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PositionController;



Route::middleware('auth:sanctum')->group(function () {
 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::apiResource('position', PositionController::class);

});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\GithubAuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\EmployeeController;



Route::middleware('auth:sanctum')->group(function () {
 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('position', PositionController::class);
    Route::apiResource('department', DepartmentController::class);
    Route::apiResource('employee', EmployeeController::class);

    
});

Route::post('/upload', [ImageController::class, 'upload']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/oauth/github/token', [GithubAuthController::class, 'exchangeToken']);
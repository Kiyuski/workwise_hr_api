<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    //

    public function register(RegisterRequest $request){
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function logout(Request $request){
    
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'User logged out successfully'], 200);
    }

    public function login(LoginRequest $request){

        $credentials =  $request->validated();

        if(!Auth::attempt($credentials)){
            return response()->json([
                'message' => 'Invalid credentials',
            ], 422);  
        }

        $token = auth()->user()->createToken('workwiseHR')->plainTextToken;
        return response()->json([
            'user' => auth()->user(),
            'token' => $token,
        ], 201);

    
    }

}

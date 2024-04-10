<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;



class AuthController extends Controller
{
    //

    public function register(RegisterRequest $request){
        $data = $request->validated();
        $existingUser = User::where('email', $data['email'])->first();
  
        if ($existingUser) {
            $token = $existingUser->createToken('main')->plainTextToken;
            return response()->json([
                'user' => $existingUser,
                'token' => $token,
            ], 201);
        }
       
        if ($data['provider'] === "GOOGLE") {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'image' => $data['image'], 
                'provider' => 'GOOGLE',
                'password' => null,
                'email_verified_at' =>  now(),
            ]);

        } else {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'provider' => $data['provider'],
            ]);
        }
      
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
                'message' => 'Invalid credentials or the email is already use as GOOGLE login',
            ], 422);  
        }

        $token = auth()->user()->createToken('workwiseHR')->plainTextToken;
        return response()->json([
            'user' => auth()->user(),
            'token' => $token,
        ], 201);


      

    
    }

}

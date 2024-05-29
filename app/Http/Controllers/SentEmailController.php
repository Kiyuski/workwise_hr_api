<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SentVerificationEmail;
use App\Mail\ResetPasswordEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class SentEmailController extends Controller
{
    //
    public function sendEmail(Request $request)
    {
        $user = $request->user(); 
          
        $verificationLink = url("/verify-email/{$user->id}/{$user->verification_hash}");
    
        Mail::to($user->email)->send(new SentVerificationEmail($user->name,$verificationLink));

  
        return response()->json(['message' => 'Verification email sent']);
    }

    public function verifyEmail($userId, $verificationHash)
    {
 
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->verification_hash === $verificationHash) {
          
            $user->email_verified_at = now();
            $user->save();

            $homepageUrl = 'http://192.168.1.32:3000/';

            return view('verify', compact('homepageUrl'));
        } else {
            return response()->json(['message' => 'Invalid verification link'], 400);
        }
    }

    public function sendPasswordResetEmail(Request $request)
    {
        $request->validate([
            'email' => [
                'required',
                'email',
                Rule::exists('users', 'email')->where(function ($query) {
                    $query->where('provider', '!=', 'GOOGLE');
                }),
            ],
        ], [
            'email.exists' => 'The selected email is invalid or associated with a Google account.',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
        
            return response()->json(['message' => 'Password reset link sent to your email.']);
        } else {
            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }
    }
}

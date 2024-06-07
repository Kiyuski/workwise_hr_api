<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;


class PasswordController extends Controller
{
    //

    public function changePassword(Request $request){
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
            'new_password_confirmation' => 'required',
        ]);
    
        $user = Auth::user();
    
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'The current password is incorrect.'], 422);
        }
    
        if ($request->new_password !== $request->new_password_confirmation) {
            return response()->json(['message' => 'The new password confirmation does not match.'], 422);
        }
        
 
        $user->password = Hash::make($request->new_password);
        $user->save();
    
        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function update_password(Request $request)
    {

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed', 
        ]);
        


        // Attempt to reset the password
        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                // Update the user's password
                $user->password = bcrypt($password);
                $user->save();
            }
        );
        

        // Check if the password was successfully reset
        if ($status === Password::PASSWORD_RESET) {
            // Password was reset successfully
            $homepageUrl = 'https://workwise-hr-front-end.vercel.app/';

            return view('password_reset_success', compact('homepageUrl'));
        } else {
            // Password reset failed
            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }
    }
}

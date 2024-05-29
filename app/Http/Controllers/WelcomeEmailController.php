<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;

class WelcomeEmailController extends Controller
{
    //
    public function sendWelcomeEmail(Request $request)
    {

        $user = User::find($request->user_id);

        Mail::to($user->email)->send(new WelcomeEmail($user, $request->url));

        return response()->json(['message' => 'Welcome email sent successfully'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GithubAuthController extends Controller
{
    //
    public function exchangeToken(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'code' => 'required|string',
        ]);

        $code = $request->input('code');
     
        // Your GitHub OAuth App client ID and client secret
        $clientId = '90eb27a225cf5828072f';
        $clientSecret = 'f095e4fc018a64553228d589ff9a022cacfeeb46';

     

        // Make a POST request to GitHub's token endpoint to exchange the code for an access token
        $httpClient = new Client();
        $response = $httpClient->post('https://github.com/login/oauth/access_token?client_id=' . $clientId . '&client_secret=' . $clientSecret . '&code=' . $code, [
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);
        
      
        // Decode the JSON response from GitHub
        $data = json_decode($response->getBody(), true);
     
        // Extract the access token from the response
        $accessToken = $data['access_token'] ?? null;

        if ($accessToken) {
            // Return the access token to the client
            return response()->json(['access_token' => $accessToken]);
        } else {
            // Handle the case where the access token is not present in the response
            return response()->json(['error' => 'Access token not found in response'], 400);
        }
    }
}

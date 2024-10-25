<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RegisterUserController extends Controller
{
    public function connectToMercadoPago()
    {
        $redirectUri = 'https://auth.mercadopago.com.ar/authorization';
        $clientId = env('MERCADOPAGO_CLIENT_ID');
        $responseType = 'code';
        $redirectAfterAuth = 'http://localhost:8000/mp-callback';

        return redirect("$redirectUri?client_id=$clientId&response_type=$responseType&redirect_uri=$redirectAfterAuth");
    }

    public function handleOAuthCallback(Request $request)
    {
        $code = $request->query('code');

        $response = Http::post('https://api.mercadopago.com/oauth/token', [
            'client_id' => env('MERCADOPAGO_CLIENT_ID'),
            'client_secret' => env('MERCADOPAGO_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => 'http://localhost:8000/mp-callback',
        ]);

        $workerAccessToken = $response->json()['access_token'];

        dd($workerAccessToken);
        // Guarda este token en la base de datos para usarlo en los pagos futuros.
        // Auth::user()->update(['mp_access_token' => $workerAccessToken]);
    }

}

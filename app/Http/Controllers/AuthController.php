<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Credentials are not valid'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        $isAdmin = $user->role === 'admin'; // Check if the user's role is 'admin'

        return response(compact('user', 'token', 'isAdmin'));
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    // TODO: Sign Up aka. register method
}

<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Token;

class JWTAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // Get raw token from cookie
        $rawToken = $request->cookie(AuthController::TOKEN_COOKIE_NAME);

        if (!$rawToken) return $this->unauthenticatedResponse();

        try {
            $this->loginByToken($rawToken);
        } catch (\Exception $e) {
            if ($e instanceof TokenExpiredException) {
                /* JWT package dont see token in request, need to set it manually */
                $request->headers->set('Authorization', 'Bearer ' . $rawToken);
                return $this->refresh($request, $next);
            }
            return $this->unauthenticatedResponse();
        }
        return $next($request);
    }

    /**
     * @param $request
     * @param $next
     * @return mixed
     */
    protected function refresh($request, $next)
    {
        try {
            // Generate cookie
            $refreshedToken = auth()->refresh();
            $this->loginByToken($refreshedToken);

            $cookie = cookie()->forever(AuthController::TOKEN_COOKIE_NAME, $refreshedToken);
            /** @var Response $response */
            $response = $next($request);

            return $response->withCookie($cookie);
        } catch (\Exception $e) {
            return $this->unauthenticatedResponse();
        }
    }

    /**
     * @param string $token
     */
    protected function loginByToken(string $token): void
    {
        // decode token
        $tokenInstance = new Token($token);
        $payload = JWTAuth::decode($tokenInstance);

        // If token decoded - login user
        $user = User::find($payload['sub']);
        Auth::login($user);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    protected function unauthenticatedResponse(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => 'Unauthenticated'
        ], 401);
    }
}

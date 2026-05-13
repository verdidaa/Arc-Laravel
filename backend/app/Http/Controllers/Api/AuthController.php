<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = $request->user();

        $token = $user->createToken('frontend-login')->accessToken;

        return response()->json([
            'token' => $token,
            'user' => $this->transformUser($user),
            'dashboard' => $this->buildDashboard($user),
        ]);
    }

    public function auth(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return response()->json([
            'user' => $this->transformUser($user),
            'dashboard' => $this->buildDashboard($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->user()?->token();

        if ($token) {
            $token->revoke();
        }

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * @return array<string, int|string>
     */
    private function transformUser(User $user): array
    {
        return [
            'id' => $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'role' => $user->role,
            'accessLevel' => $user->access_level,
            'completion' => $user->completion,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function buildDashboard(User $user): array
    {
        $users = User::query()
            ->orderBy('name')
            ->get();

        return [
            'stats' => $this->buildStats($users),
            'roles' => $this->buildRoles($users),
            'products' => [],
            'orders' => [],
            'notices' => [
                'products' => 'No products table exists yet in the backend database.',
                'orders' => 'No orders table exists yet in the backend database.',
            ],
            'profile' => $this->transformUser($user),
        ];
    }

    /**
     * @param  Collection<int, User>  $users
     * @return array<int, array<string, string>>
     */
    private function buildStats(Collection $users): array
    {
        $totalUsers = $users->count();
        $adminUsers = $users->where('access_level', 'admin')->count();
        $averageCompletion = $totalUsers > 0
            ? (int) round($users->avg('completion'))
            : 0;

        return [
            [
                'label' => 'Total Users',
                'value' => (string) $totalUsers,
                'detail' => "{$adminUsers} admin account(s)",
                'color' => '#0f766e',
            ],
            [
                'label' => 'Customers',
                'value' => (string) $users->where('access_level', 'user')->count(),
                'detail' => 'Database-backed user accounts',
                'color' => '#1d4ed8',
            ],
            [
                'label' => 'Profile Completion',
                'value' => "{$averageCompletion}%",
                'detail' => 'Average completion across users',
                'color' => '#c2410c',
            ],
        ];
    }

    /**
     * @param  Collection<int, User>  $users
     * @return array<int, array<string, string>>
     */
    private function buildRoles(Collection $users): array
    {
        return $users
            ->map(fn (User $user): array => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->email_verified_at ? 'Active' : 'Pending',
            ])
            ->values()
            ->all();
    }
}

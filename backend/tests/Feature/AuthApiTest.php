<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        app(ClientRepository::class)->createPersonalAccessGrantClient(
            'Test Personal Access Client',
            'users'
        );
    }

    public function test_user_can_log_in_and_receive_expected_payload(): void
    {
        User::create([
            'name' => 'Olivia',
            'email' => 'admin@northlane.shop',
            'password' => Hash::make('admin123'),
            'role' => 'Store Administrator',
            'access_level' => 'admin',
            'completion' => 9999,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@northlane.shop',
            'password' => 'admin123',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'token',
                'user' => [
                    'id',
                    'email',
                    'name',
                    'role',
                    'accessLevel',
                    'completion',
                ],
                'dashboard' => [
                    'stats',
                    'roles',
                    'products',
                    'orders',
                    'notices',
                    'profile',
                ],
            ])
            ->assertJsonPath('user.email', 'admin@northlane.shop')
            ->assertJsonPath('user.accessLevel', 'admin')
            ->assertJsonPath('dashboard.roles.0.email', 'admin@northlane.shop');
    }

    public function test_authenticated_user_can_log_out(): void
    {
        $user = User::create([
            'name' => 'Marco',
            'email' => 'user@northlane.shop',
            'password' => Hash::make('user123'),
            'role' => 'Customer',
            'access_level' => 'user',
            'completion' => 64,
        ]);

        $token = $user->createToken('test-token')->accessToken;

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logged out successfully.');
    }

    public function test_authenticated_user_can_fetch_their_profile(): void
    {
        $user = User::create([
            'name' => 'Marco',
            'email' => 'user@northlane.shop',
            'password' => Hash::make('user123'),
            'role' => 'Customer',
            'access_level' => 'user',
            'completion' => 64,
        ]);

        $token = $user->createToken('test-token')->accessToken;

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'user@northlane.shop')
            ->assertJsonPath('user.accessLevel', 'user')
            ->assertJsonPath('dashboard.profile.email', 'user@northlane.shop');
    }
}

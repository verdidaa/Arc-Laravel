<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $personalAccessClient = Passport::client()
            ->newQuery()
            ->where('revoked', false)
            ->where(function (Builder $query): void {
                $query->whereNull('provider')->orWhere('provider', 'users');
            })
            ->get()
            ->first(fn ($client): bool => $client->hasGrantType('personal_access'));

        if (! $personalAccessClient) {
            app(ClientRepository::class)->createPersonalAccessGrantClient(
                'Frontend Personal Access Client',
                'users'
            );
        }

        User::updateOrCreate(
            ['email' => 'admin@northlane.shop'],
            [
                'name' => 'Olivia',
                'password' => Hash::make('admin123'),
                'role' => 'Store Administrator',
                'access_level' => 'admin',
                'completion' => 9999,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@northlane.shop'],
            [
                'name' => 'Marco',
                'password' => Hash::make('user123'),
                'role' => 'Customer',
                'access_level' => 'user',
                'completion' => 64,
                'email_verified_at' => now(),
            ]
        );
    }
}

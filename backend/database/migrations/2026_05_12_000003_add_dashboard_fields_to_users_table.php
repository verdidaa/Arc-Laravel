<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role')->default('Customer')->after('password');
            $table->string('access_level')->default('user')->after('role');
            $table->unsignedInteger('completion')->default(0)->after('access_level');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['role', 'access_level', 'completion']);
        });
    }
};

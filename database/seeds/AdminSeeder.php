<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = Role::create(['name' => 'Admin', 'guard_name' => 'api']);
        $user = User::create([
            'first_name' => 'Administrator',
            'last_name' => 'Account',
            'email' => 'admin@example.com,',
            'email_verified_at' => now(),
            'password' => '$2y$10$Ot86RqgS068zvC2ZSHUnH.S42xlvDG9MlKn88DY9.EWBqUCVpEA62',
        ]);

        $user->assignRole($role);
    }
}

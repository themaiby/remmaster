<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $guard = 'api';

        /* Vendors */
        Permission::create(['name' => 'vendors.show', 'guard_name' => $guard]);
        Permission::create(['name' => 'vendors.store', 'guard_name' => $guard]);
        Permission::create(['name' => 'vendors.update', 'guard_name' => $guard]);
        Permission::create(['name' => 'vendors.destroy', 'guard_name' => $guard]);
    }
}

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

        /* Components */
        Permission::create(['name' => 'component.show', 'guard_name' => $guard]);
        Permission::create(['name' => 'component.store', 'guard_name' => $guard]);
        Permission::create(['name' => 'component.update', 'guard_name' => $guard]);
        Permission::create(['name' => 'component.destroy', 'guard_name' => $guard]);

        /* Orders */
        Permission::create(['name' => 'orders.show', 'guard_name' => $guard]);
        Permission::create(['name' => 'orders.store', 'guard_name' => $guard]);
        Permission::create(['name' => 'orders.update', 'guard_name' => $guard]);
        Permission::create(['name' => 'orders.destroy', 'guard_name' => $guard]);
    }
}

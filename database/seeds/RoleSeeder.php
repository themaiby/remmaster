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

        /* Vendor contacts */
        Permission::create(['name' => 'see.vendor_contacts', 'guard_name' => $guard]);
        Permission::create(['name' => 'create.vendor_contacts', 'guard_name' => $guard]);
        Permission::create(['name' => 'edit.vendor_contacts', 'guard_name' => $guard]);
        Permission::create(['name' => 'delete.vendor_contacts', 'guard_name' => $guard]);

        /* Vendors */
        Permission::create(['name' => 'see.vendors', 'guard_name' => $guard]);
        Permission::create(['name' => 'create.vendors', 'guard_name' => $guard]);
        Permission::create(['name' => 'edit.vendors', 'guard_name' => $guard]);
        Permission::create(['name' => 'delete.vendors', 'guard_name' => $guard]);
    }
}

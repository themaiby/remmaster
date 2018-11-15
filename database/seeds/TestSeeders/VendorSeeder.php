<?php

use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $vendor1 = Vendor::create([
            'name' => 'Test Vendor',
            'note' => 'Testing only',
        ]);

        $vendor2 = Vendor::create([
            'name' => 'Second test Vendor',
            'note' => 'Testing only',
        ]);


        $contactSkype = [
            'title' => 'Skype',
            'value' => 'Test skype',
        ];

        $contactTelegram = [
            'title' => 'Telegram',
            'value' => 'Test telegram'
        ];

        $vendor1->contacts()->create($contactSkype);
        $vendor1->contacts()->create($contactTelegram);

        $vendor2->contacts()->create($contactSkype);
        $vendor2->contacts()->create($contactTelegram);
    }
}

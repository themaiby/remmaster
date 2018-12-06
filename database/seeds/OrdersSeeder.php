<?php

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::create([
            'order_type_id' => 1,
            'status_id' => 1,
            'urgent' => true,
            'breakage' => 'Testing',
            'complete_date' => now()->addDay(3),
            'comment' => 'Its only demo order',
            'user_id' => 1,

            'client_name' => 'Tester Man',
            'client_number' => '+1234567890',
            'client_email' => 'test@example.com',
            'client_note' => 'Nice tester!',

            'device_name' => 'Samsung',
            'device_imei' => '1234321',
            'device_visual' => 'OK',
            'device_note' => 'Tester\'s Device',

            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class OrderTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\OrderType::insert([
            ['title' => 'Платный'],
            ['title' => 'Гарантийный'],
        ]);
    }
}

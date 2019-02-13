<?php

use Illuminate\Database\Seeder;

class StatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Status::insert([
            [
                'title' => 'Принят',
                'opener' => true,
                'finisher' => false,
                'color' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Ожидает запчасть',
                'opener' => false,
                'finisher' => false,
                'color' => 'amber accent-1',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Передан партнёру',
                'opener' => false,
                'finisher' => false,
                'color' => 'amber accent-1',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Отказ в ремонте',
                'opener' => false,
                'finisher' => true,
                'color' => 'red lighten-4',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Отказ в гарантийном обслуживании',
                'opener' => false,
                'finisher' => true,
                'color' => 'red lighten-4',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Готов',
                'opener' => false,
                'finisher' => false,
                'color' => 'light-green lighten-4',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Выдан',
                'opener' => false,
                'finisher' => true,
                'color' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}

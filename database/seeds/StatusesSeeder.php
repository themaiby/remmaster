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
                'color' => 'primary',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Ожидает запчасть',
                'opener' => false,
                'finisher' => false,
                'color' => 'warning',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Передан партнёру',
                'opener' => false,
                'finisher' => false,
                'color' => 'warning',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Отказ в ремонте',
                'opener' => false,
                'finisher' => true,
                'color' => 'error',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Отказ в гарантийном обслуживании',
                'opener' => false,
                'finisher' => true,
                'color' => 'error',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Готов',
                'opener' => false,
                'finisher' => false,
                'color' => 'success',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Выдан',
                'opener' => false,
                'finisher' => true,
                'color' => 'secondary',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}

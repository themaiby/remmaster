<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCategoriesToComponents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->unsignedInteger('parent_id')->nullable()->index();
            $table->timestamps();
        });

        Schema::table('component_categories', function (Blueprint $table) {
            $table->foreign('parent_id')
                ->references('id')
                ->on('component_categories')
                ->onDelete('cascade');
        });
        \Illuminate\Support\Facades\DB::table('component_categories')
            ->insert(['title' => 'Root', 'created_at' => now(), 'updated_at' => now()]);

        Schema::table('components', function (Blueprint $table) {
            $table->unsignedInteger('category_id')->default(1)->index();
        });
        Schema::table('components', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('component_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('components', function (Blueprint $table) {
            //
        });
    }
}

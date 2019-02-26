<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderStatusHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_status_history', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('order_id')->index();
            $table->unsignedInteger('status_id_old')->index();
            $table->unsignedInteger('status_id_new')->index();
            $table->unsignedInteger('user_id')->index();
            $table->timestamps();
        });

        Schema::table('order_status_history', function (Blueprint $table) {
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade');
            $table->foreign('status_id_old')
                ->references('id')
                ->on('order_statuses')
                ->onDelete('cascade');
            $table->foreign('status_id_new')
                ->references('id')
                ->on('order_statuses')
                ->onDelete('cascade');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('order_status_history');
    }
}

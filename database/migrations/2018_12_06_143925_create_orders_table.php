<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /* Paid, warranty, etc */
        Schema::create('order_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('order_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');

            /* Status types */
            $table->boolean('opener')->default(false);
            $table->boolean('finisher')->default(false);
            $table->string('color')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        /* Order table */
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');

            /* Order info */
            $table->unsignedInteger('order_type_id')->index();
            $table->unsignedInteger('status_id')->index();
            $table->unsignedInteger('user_id')->index();

            $table->boolean('urgent')->default(false);
            $table->string('breakage');
            $table->timestamp('complete_date');
            $table->text('comment')->nullable();

            /* Contacts */
            $table->string('client_name');
            $table->string('client_number');
            $table->string('client_email')->nullable();
            $table->string('client_note')->nullable();

            /* Device */
            $table->string('device_name');
            $table->string('device_imei');
            $table->string('device_visual')->nullable();
            $table->string('device_note')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        /* Order foreign */
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('order_type_id')
                ->references('id')
                ->on('order_types')
                ->onDelete('cascade');
            $table->foreign('status_id')
                ->references('id')
                ->on('order_statuses')
                ->onDelete('cascade');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });

        /* Works attached to order */
        Schema::create('order_works', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->float('cost');
            $table->unsignedInteger('order_id')->index();
            $table->timestamps();
        });

        /* Works foreign */
        Schema::table('order_works', function (Blueprint $table) {
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade');
        });

        /* Components attached to order */
        Schema::create('order_components', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('component_id')->index();
            $table->unsignedInteger('order_id')->index();
            $table->unsignedInteger('count');

            $table->timestamps();
        });

        /* Components foreign */
        Schema::table('order_components', function (Blueprint $table) {
            $table->foreign('component_id')
                ->references('id')
                ->on('components')
                ->onDelete('cascade');
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
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
    }
}

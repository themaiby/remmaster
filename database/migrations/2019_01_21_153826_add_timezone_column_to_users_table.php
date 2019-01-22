<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimezoneColumnToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tzlist = DateTimeZone::listIdentifiers(DateTimeZone::ALL);
        Schema::table('users', function (Blueprint $table) use ($tzlist) {
            $table->enum('timezone', $tzlist)->default('UTC');
            $table->removeColumn('remember_token');
        });

        Schema::table('vendor_contacts', function (Blueprint $table) {
            $table->string('icon')->default(null)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}

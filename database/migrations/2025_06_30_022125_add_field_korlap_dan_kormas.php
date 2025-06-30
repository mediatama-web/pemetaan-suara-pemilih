<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('kor_lap_mas', function (Blueprint $table) {
            $table->string('alamat')->after('status')->nullable();
            $table->string('no_hp')->after('alamat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kor_lap_mas', function (Blueprint $table) {
            //
        });
    }
};

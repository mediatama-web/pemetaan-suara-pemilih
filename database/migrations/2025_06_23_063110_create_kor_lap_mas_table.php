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
        Schema::create('kor_lap_mas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('status', ['korlap', 'kormas'])->default('kormas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kor_lap_mas');
    }
};

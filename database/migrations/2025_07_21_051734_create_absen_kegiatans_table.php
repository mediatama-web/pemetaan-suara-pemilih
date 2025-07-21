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
        Schema::create('absen_kegiatans', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('kegiatan_id')->constrained('kegiatans')->onDelete('cascade');
            $table->string('nik');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Penanggung jawab yang mencatat absen

            $table->timestamps();

            $table->foreign('nik')->references('nik')->on('data_pemilihs')->onDelete('cascade');
            $table->unique(['kegiatan_id', 'nik']); // Mencegah duplikasi absen untuk kegiatan yang sama
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absen_kegiatans');
    }
};

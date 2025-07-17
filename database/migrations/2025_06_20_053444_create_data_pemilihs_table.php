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
        Schema::create('data_pemilihs', function (Blueprint $table) {
            $table->id();
            $table->string("no_kk");
            $table->string("nik");
            $table->string("nama");
            $table->text("alamat")->nullable();
            $table->string("rt")->nullable();
            $table->string("rw")->nullable();
            $table->integer("kelurahan_id")->nullable();
            $table->integer("kecamatan_id")->nullable();
            $table->integer('korlap_id')->nullable();
            $table->integer('kormas_id')->nullable();
            $table->string('tps')->nullable();
            $table->string("no_hp")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_pemilihs');
    }
};

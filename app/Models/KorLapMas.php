<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KorLapMas extends Model
{
    protected $table = 'kor_lap_mas';
    protected $fillable = ['nama', 'status', 'alamat', 'no_hp'];
}

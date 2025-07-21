<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenKegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kegiatan_id',
        'nik',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function pemilih()
    {
        return $this->belongsTo(DataPemilih::class, 'nik', 'nik');
    }
}

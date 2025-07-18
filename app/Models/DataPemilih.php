<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataPemilih extends Model
{
    protected $table = 'data_pemilihs';
    protected $fillable = [
        'no_kk',
        'nik',
        'nama',
        'alamat',
        'kelurahan_id',
        'kecamatan_id',
        'rt',
        'rw',
        'korlap_id',
        'kormas_id',
        'tps',
        'no_hp',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class, 'kelurahan_id');
    }

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class, 'kecamatan_id');
    }
}

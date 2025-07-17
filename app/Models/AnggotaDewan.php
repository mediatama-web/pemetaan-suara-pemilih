<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnggotaDewan extends Model
{
    protected $table = 'anggota_dewans';
    protected $fillable = ['nama'];

    public function users()
    {
        return $this->hasMany(User::class, 'anggota_dewan_id');
    }
}

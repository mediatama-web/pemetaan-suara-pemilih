<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    protected $table = 'proposals';
    protected $fillable = [
        'user_id',
        'nama_penanggung_jawab',
        'tanggal_masuk',
        'judul_proposal',
        'file_proposal',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

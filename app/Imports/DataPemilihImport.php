<?php

namespace App\Imports;

use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\KorLapMas;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;

class DataPemilihImport implements ToCollection, WithStartRow
{
    public function collection(Collection $collection)
    {
        foreach ($collection as $i => $a) {

            if (empty($a[1]) || empty($a[3])) {
                // Skip jika NIK kosong atau TPS kosong
                continue;
            }

            // Cek apakah NIK sudah ada di tabel
            if (DataPemilih::where('nik', $a[1])->exists()) {
                continue; // Skip jika NIK sudah ada
            }

            $kecamatan = Kecamatan::firstOrCreate([
                'nama_kecamatan' => strtolower(trim($a[7])),
            ]);

            $kelurahan = Kelurahan::firstOrCreate([
                'nama_kelurahan' => strtolower(trim($a[8])),
            ]);

            $korlap = KorLapMas::firstOrCreate([
                'nama' => $a[9],
                'status' => 'korlap',
            ]);

            $kormas = KorLapMas::firstOrCreate([
                'nama' => $a[10],
                'status' => 'kormas',
            ]);

            DataPemilih::create([
                'no_kk'         => $a[0],
                'nik'           => $a[1],
                'nama'          => $a[2],
                'tps'           => $a[3],
                'alamat'        => $a[4],
                'rw'            => $a[5],
                'rt'            => $a[6],
                'kecamatan_id'  => $kecamatan->id,
                'kelurahan_id'  => $kelurahan->id,
                'korlap_id'     => $korlap->id,
                'kormas_id'     => $kormas->id,
                'no_hp'         => $a[11],
                'user_id'       => Auth::id(),
            ]);
        }
    }

    public function startRow(): int
    {
        return 2; // Mulai dari baris kedua (lewati header)
    }
}

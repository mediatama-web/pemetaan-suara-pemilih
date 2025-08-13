<?php

namespace App\Imports;

use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\KorLapMas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class DataPemilihImport implements OnEachRow, WithStartRow, WithChunkReading
{
    public function onRow(Row $row)
    {
        $r = $row->toArray();

        try {
            if (empty($r[1]) || empty($r[3])) {
                return;
            }

            // Skip duplikat
            if (DataPemilih::where('nik', $r[1])->exists()) {
                return;
            }

            $kecamatan = Kecamatan::firstOrCreate([
                'nama_kecamatan' => strtolower(trim($r[7])),
            ]);

            $kelurahan = Kelurahan::firstOrCreate([
                'kecamatan_id' => $kecamatan->id,
                'nama_kelurahan' => strtolower(trim($r[8])),
            ]);

            $korlap = KorLapMas::firstOrCreate([
                'nama' => $r[9],
                'status' => 'korlap',
            ]);

            $kormas = KorLapMas::firstOrCreate([
                'nama' => $r[10],
                'status' => 'kormas',
            ]);

            DataPemilih::create([
                'no_kk'         => $r[0],
                'nik'           => $r[1],
                'nama'          => $r[2],
                'tps'           => $r[3],
                'alamat'        => $r[4],
                'rw'            => $r[5],
                'rt'            => $r[6],
                'kecamatan_id'  => $kecamatan->id,
                'kelurahan_id'  => $kelurahan->id,
                'korlap_id'     => $korlap->id,
                'kormas_id'     => $kormas->id,
                'no_hp'         => $r[11] ?? null,
                'user_id'       => Auth::id(),
            ]);
        } catch (\Exception $e) {
            // Log jika ada error
            Log::warning("Baris {$row->getIndex()} gagal: " . $e->getMessage(), ['data' => $r]);
        }
    }

    public function startRow(): int
    {
        return 2;
    }

    public function chunkSize(): int
    {
        return 500;
    }
}

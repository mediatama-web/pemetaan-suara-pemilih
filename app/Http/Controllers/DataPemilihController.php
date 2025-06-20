<?php

namespace App\Http\Controllers;

use App\Models\DataPemilih;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPemilihController extends Controller
{
    public function index()
    {
        $data['datapemilih'] = DataPemilih::leftJoin('kelurahans', 'data_pemilihs.kelurahan_id', '=', 'kelurahans.id')
            ->leftJoin('kecamatans', 'data_pemilihs.kecamatan_id', '=', 'kecamatans.id')
            ->leftJoin('users as korlap', 'data_pemilihs.korlap_id', '=', 'korlap.id')
            ->leftJoin('users as kormas', 'data_pemilihs.kormas_id', '=', 'kormas.id')
            ->select(
                'data_pemilihs.*',
                'kelurahans.nama_kelurahan as nama_kelurahan',
                'kecamatans.nama_kecamatan as nama_kecamatan',
                'korlap.name as nama_korlap',
                'kormas.name as nama_kormas'
            )
            ->get();
        return Inertia::render("Datapemilih/Index", $data);
    }
}

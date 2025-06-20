<?php

namespace App\Http\Controllers;

use App\Models\Kelurahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelurahanController extends Controller
{
    public function index()
    {
        $data['kelurahans'] = Kelurahan::leftJoin('kecamatans', 'kelurahans.kecamatan_id', '=', 'kecamatans.id')
            ->select('kelurahans.*', 'kecamatans.nama_kecamatan')
            ->orderBy('kelurahans.nama_kelurahan', 'asc')
            ->get();
        return Inertia::render('Kelurahan/Index', $data);
    }
}

<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\AbsenKegiatan;
use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kegiatan;
use App\Models\Kelurahan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanKegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Kegiatan::query()
            ->with(['kecamatan', 'kelurahan'])
            ->withCount([
                'absens as jumlah_hadir' => function ($q) {
                    $q->select(DB::raw("COUNT(DISTINCT nik)"));
                }
            ]);

        // Filter berdasarkan role
        if ($user->role !== 'super_admin') {
            $query->whereHas(
                'user',
                fn($q) =>
                $q->where('anggota_dewan_id', $user->anggota_dewan_id)
            );
        }

        // Filter tambahan
        if ($request->filled('kecamatan_id')) {
            $query->where('kecamatan_id', $request->kecamatan_id);
        }

        if ($request->filled('kelurahan_id')) {
            $query->where('kelurahan_id', $request->kelurahan_id);
        }

        $kegiatanList = $query->get(['id', 'nama_kegiatan', 'tanggal_mulai', 'tanggal_akhir', 'kecamatan_id', 'kelurahan_id']);

        // Hitung jumlah tidak hadir berdasarkan data_pemilih yang match kecamatan & kelurahan
        $kegiatanList->transform(function ($kegiatan) {
            $jumlahPemilih = DataPemilih::where('kecamatan_id', $kegiatan->kecamatan_id)
                ->where('kelurahan_id', $kegiatan->kelurahan_id)
                ->count();

            $kegiatan->jumlah_tidak_hadir = max($jumlahPemilih - $kegiatan->jumlah_hadir, 0);
            return $kegiatan;
        });

        return Inertia::render('LaporanKegiatan/Index', [
            'kegiatanList' => $kegiatanList,
            'kecamatans' => Kecamatan::all(['id', 'nama_kecamatan']),
            'kelurahans' => Kelurahan::all(['id', 'nama_kelurahan', 'kecamatan_id']),
            'filters' => [
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

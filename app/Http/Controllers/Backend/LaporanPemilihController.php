<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\AnggotaDewan;
use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanPemilihController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['anggota_dewan_id', 'kecamatan_id', 'kelurahan_id', 'rt', 'rw']);

        // Query utama dengan relasi
        $query = DataPemilih::query()
            ->with(['user.anggotaDewan', 'kecamatan', 'kelurahan']);

        // Terapkan filter jika tersedia
        if (!empty($filters['anggota_dewan_id'])) {
            $query->whereHas('user', function ($q) use ($filters) {
                $q->where('anggota_dewan_id', $filters['anggota_dewan_id']);
            });
        }

        if (!empty($filters['kecamatan_id'])) {
            $query->where('kecamatan_id', $filters['kecamatan_id']);
        }

        if (!empty($filters['kelurahan_id'])) {
            $query->where('kelurahan_id', $filters['kelurahan_id']);
        }

        if (!empty($filters['rt'])) {
            $query->where('rt', $filters['rt']);
        }

        if (!empty($filters['rw'])) {
            $query->where('rw', $filters['rw']);
        }

        // Data utama
        $data = $query->get();

        // Statistik total berdasarkan query yang sama
        $totalKecamatan = (clone $query)->select('kecamatan_id')->distinct()->count('kecamatan_id');
        $totalKelurahan = (clone $query)->select('kelurahan_id')->distinct()->count('kelurahan_id');
        $totalPemilih = (clone $query)->count();

        // Chart berdasarkan filter juga
        $statByKecamatan = (clone $query)
            ->select('kecamatan_id', DB::raw('COUNT(*) as total'))
            ->groupBy('kecamatan_id')
            ->with('kecamatan:id,nama_kecamatan')
            ->get()
            ->map(fn($item) => [
                'label' => $item->kecamatan->nama_kecamatan ?? 'Tidak diketahui',
                'total' => $item->total,
            ]);

        $statByKelurahan = (clone $query)
            ->select('kelurahan_id', DB::raw('COUNT(*) as total'))
            ->groupBy('kelurahan_id')
            ->with('kelurahan:id,nama_kelurahan')
            ->get()
            ->map(fn($item) => [
                'label' => $item->kelurahan->nama_kelurahan ?? 'Tidak diketahui',
                'total' => $item->total,
            ]);

        return Inertia::render('Laporanpemilih/Index', [
            'data' => $data,
            'filters' => $filters,
            'anggotaDewans' => AnggotaDewan::all(['id', 'nama']),
            'kecamatans' => Kecamatan::all(['id', 'nama_kecamatan']),
            'kelurahans' => Kelurahan::all(['id', 'nama_kelurahan']),
            'statistik' => [
                'total_pemilih' => $totalPemilih,
                'total_kecamatan' => $totalKecamatan,
                'total_kelurahan' => $totalKelurahan,
            ],
            'chart' => [
                'kecamatan' => $statByKecamatan,
                'kelurahan' => $statByKelurahan,
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

<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Kecamatan;
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

    public function create()
    {
        $kecamatan = Kecamatan::all();
        return Inertia::render('Kelurahan/Create/Index', [
            'kecamatan' => $kecamatan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kelurahan' => 'required|string|max:255',
            'kecamatan_id' => 'required|exists:kecamatans,id',
        ], [
            'nama_kelurahan.required' => 'Nama Kelurahan tidak boleh kosong.',
            'nama_kelurahan.string' => 'Nama Kelurahan harus string.',
            'nama_kelurahan.max' => 'Nama Kelurahan tidak boleh lebih dari 255 karakter.',
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'kecamatan_id.exists' => 'Kecamatan yang dipilih tidak ada dalam database.',
        ]);

        Kelurahan::create($request->all());

        return redirect()->route('kelurahan.index')->with('success', 'Kelurahan created successfully.');
    }

    public function edit(Kelurahan $kelurahan)
    {
        $kecamatan = Kecamatan::all();
        return Inertia::render('Kelurahan/Edit/Index', [
            'kelurahan' => $kelurahan,
            'kecamatan' => $kecamatan,
        ]);
    }

    public function update(Request $request, Kelurahan $kelurahan)
    {
        $request->validate([
            'nama_kelurahan' => 'required|string|max:255',
            'kecamatan_id' => 'required|exists:kecamatans,id',
        ], [
            'nama_kelurahan.required' => 'Nama Kelurahan tidak boleh kosong.',
            'nama_kelurahan.string' => 'Nama Kelurahan harus string.',
            'nama_kelurahan.max' => 'Nama Kelurahan tidak boleh lebih dari 255 karakter.',
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'kecamatan_id.exists' => 'Kecamatan yang dipilih tidak ada dalam database.',
        ]);

        $kelurahan->update($request->all());

        return redirect()->route('kelurahan.index')->with('success', 'Kelurahan updated successfully.');
    }

    public function destroy(Kelurahan $kelurahan)
    {
        $kelurahan->delete();
        return redirect()->route('kelurahan.index')->with('success', 'Kelurahan deleted successfully.');
    }

    // API
    public function getByKecamatan($kecamatanId)
    {
        $kelurahans = Kelurahan::where('kecamatan_id', $kecamatanId)
            ->select('id', 'nama_kelurahan')
            ->orderBy('nama_kelurahan')
            ->get();

        return response()->json($kelurahans);
    }
}

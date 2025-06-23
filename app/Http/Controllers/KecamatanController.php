<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KecamatanController extends Controller
{
    public function index()
    {
        $data['kecamatans'] = Kecamatan::with('kelurahans')->get();
        return Inertia::render('Kecamatan/Index', $data);
    }

    public function create()
    {
        return Inertia::render('Kecamatan/Create/Index');
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'nama_kecamatan' => 'required|string|max:255',
            ],
            [
                'nama_kecamatan.required' => 'Nama Kecamatan tidak boleh kosong.',
                'nama_kecamatan.string' => 'Nama Kecamatan harus string.',
                'nama_kecamatan.max' => 'Nama Kecamatan tidak boleh lebih dari 255 karakter.',
            ]
        );

        Kecamatan::create($request->all());

        return redirect()->route('kecamatan.index')->with('success', 'Kecamatan created successfully.');
    }

    public function edit(Kecamatan $kecamatan)
    {
        return Inertia::render('Kecamatan/Edit/Index', [
            'kecamatan' => $kecamatan,
        ]);
    }

    public function update(Request $request, Kecamatan $kecamatan)
    {
        $request->validate(
            [
                'nama_kecamatan' => 'required|string|max:255',
            ],
            [
                'nama_kecamatan.required' => 'Nama Kecamatan tidak boleh kosong.',
                'nama_kecamatan.string' => 'Nama Kecamatan harus string.',
                'nama_kecamatan.max' => 'Nama Kecamatan tidak boleh lebih dari 255 karakter.',
            ]
        );

        $kecamatan->update($request->all());

        return redirect()->route('kecamatan.index')->with('success', 'Kecamatan updated successfully.');
    }

    public function destroy(Kecamatan $kecamatan)
    {
        $kecamatan->delete();
        return redirect()->route('kecamatan.index')->with('success', 'Kecamatan deleted successfully.');
    }
}

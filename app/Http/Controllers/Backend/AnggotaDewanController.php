<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\AnggotaDewan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AnggotaDewanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['anggota_dewans'] = AnggotaDewan::get();
        return Inertia::render('AnggotaDewan/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AnggotaDewan/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $check = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'posisi' => 'required|string|max:255',
        ], [
            'nama.required' => 'Nama tidak boleh kosong.',
            'nama.string' => 'Nama harus string.',
            'nama.max' => 'Nama tidak boleh lebih dari 255 karakter.',
            'posisi.required' => 'Posisi tidak boleh kosong.',
            'posisi.string' => 'Posisi harus string.',
            'posisi.max' => 'Posisi tidak boleh lebih dari 255 karakter.',
        ]);

        if ($check->fails()) {
            return back()->withErrors($check)->withInput();
        }
        DB::beginTransaction();

        try {
            AnggotaDewan::create([
                'nama' => $request->nama,
                'posisi' => $request->posisi
            ]);
            DB::commit();
            return redirect()->route('anggotadewan.index')->with('success', 'Data Berhasil Ditambahkan');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()])->withInput();
        }
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
    public function edit(AnggotaDewan $anggotadewan)
    {
        return Inertia::render('AnggotaDewan/Edit/Index', [
            'anggota_dewans' => $anggotadewan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnggotaDewan $anggotadewan)
    {
        $check = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'posisi' => 'required|string|max:255',
        ], [
            'nama.required' => 'Nama tidak boleh kosong.',
            'nama.string' => 'Nama harus string.',
            'nama.max' => 'Nama tidak boleh lebih dari 255 karakter.',
            'posisi.required' => 'Posisi tidak boleh kosong.',
            'posisi.string' => 'Posisi harus string.',
            'posisi.max' => 'Posisi tidak boleh lebih dari 255 karakter.',
        ]);

        if ($check->fails()) {
            return back()->withErrors($check)->withInput();
        }
        DB::beginTransaction();

        try {
            $anggotadewan->update([
                'nama' => $request->nama,
                'posisi' => $request->posisi
            ]);
            DB::commit();
            return redirect()->route('anggotadewan.index')->with('success', 'Data Berhasil Diubah');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors(['error' => $th->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnggotaDewan $anggotadewan)
    {
        $anggotadewan->delete();
        return redirect()->route('anggotadewan.index')->with('success', 'Data Berhasil Dihapus');
    }
}

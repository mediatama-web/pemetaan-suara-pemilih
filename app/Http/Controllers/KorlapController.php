<?php

namespace App\Http\Controllers;

use App\Models\KorLapMas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KorlapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['korlap'] = KorLapMas::where('status', 'korlap')->get();
        return Inertia::render('Korlap/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Korlap/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cek = Validator::make($request->all(), [
            'nama' => 'required',
            'status' => 'required',
            'alamat' => 'required',
            'no_hp' => 'required|numeric|min:11',
        ]);

        if ($cek->fails()) {
            return redirect()->back()->withErrors($cek)->withInput();
        }

        DB::beginTransaction();

        try {
            KorLapMas::create([
                'nama' => $request->nama,
                'status' => $request->status,
                'alamat' => $request->alamat,
                'no_hp' => $request->no_hp
            ]);

            DB::commit();
            return redirect()->route('korlap.index')->with('success', 'Data Berhasil Ditambahkan');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('korlap.index')->with('error', 'Data Gagal Ditambahkan');
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
    public function edit(string $id)
    {
        $data['korlap'] = KorLapMas::findOrFail($id);
        return Inertia::render('Korlap/Edit/Index', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cek = Validator::make($request->all(), [
            'nama' => 'required',
            'status' => 'required',
            'alamat' => 'required',
            'no_hp' => 'required|numeric|min:11',
        ]);

        if ($cek->fails()) {
            return redirect()->back()->withErrors($cek)->withInput();
        }

        DB::beginTransaction();

        try {
            KorLapMas::where('id', $id)->update([
                'nama' => $request->nama,
                'status' => $request->status,
                'alamat' => $request->alamat,
                'no_hp' => $request->no_hp
            ]);
            DB::commit();

            return redirect()->route('korlap.index')->with('success', 'Data Berhasil Diubah');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('korlap.index')->with('error', 'Data Gagal Diubah');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $data = KorLapMas::findOrFail($id);
            $data->delete();

            return redirect()->route('korlap.index')->with('success', 'Data Pemilih berhasil dihapus.');
        } catch (\Throwable $th) {
            return redirect()->route('korlap.index')->with('error', 'Data Pemilih gagal dihapus.');
        }
    }
}

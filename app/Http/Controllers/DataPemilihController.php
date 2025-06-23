<?php

namespace App\Http\Controllers;

use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\KorLapMas;
use App\Models\User;
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

    public function create()
    {
        $data['kecamatans'] = Kecamatan::select('id', 'nama_kecamatan')->get();
        $data['kelurahans'] = Kelurahan::select('id', 'kecamatan_id', 'nama_kelurahan')->get();
        $data['korlaps'] = KorLapMas::where('status', 'korlap')->get();
        $data['kormas'] = KorLapMas::where('status', 'kormas')->get();
        return Inertia::render("Datapemilih/Create/Index", $data);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'no_kk' => 'required|numeric',
            'nik' => 'required|unique:data_pemilihs,nik',
            'nama' => 'required',
            'alamat' => 'required',
            'rw' => 'required',
            'rt' => 'required',
            'tps' => 'required',
            'no_hp' => 'required|numeric|min:11',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'korlap_id' => 'nullable|exists:users,id',
            'kormas_id' => 'nullable|exists:users,id',
            'anggota' => 'required|array',
            'anggota.*.nik' => 'required|numeric|unique:data_pemilihs,nik',
            'anggota.*.nama' => 'required|string',
        ], [
            'no_kk.required' => 'Nomor KK harus diisi.',
            'no_kk.numeric' => 'Nomor KK harus berupa angka.',
            'nik.required' => 'NIK harus diisi.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'nama.required' => 'Nama harus diisi.',
            'kelurahan_id.exists' => 'Kelurahan tidak ditemukan.',
            'kelurahan_id.required' => 'Kelurahan harus dipilih.',
            'kecamatan_id.exists' => 'Kecamatan tidak ditemukan.',
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'korlap_id.exists' => 'Koordinator Lapangan tidak ditemukan.',
            'kormas_id.exists' => 'Koordinator Masyarakat tidak ditemukan.',
            'no_hp.min' => 'Nomor HP harus minimal 11 digit.',
            'rw.required' => 'RW harus diisi.',
            'rt.required' => 'RT harus diisi.',
            'tps.required' => 'TPS harus diisi.',
            'no_hp.required' => 'Nomor HP harus diisi.',
            'no_hp.numeric' => 'Nomor HP harus berupa angka.',
            'alamat.required' => 'Alamat harus diisi.',
            'anggota.required' => 'Anggota harus diisi.',
            'anggota.array' => 'Anggota harus berupa array.',
            'anggota.*.nik.required' => 'NIK anggota harus diisi.',
            'anggota.*.nik.numeric' => 'NIK anggota harus berupa angka.',
            'anggota.*.nik.unique' => 'NIK anggota sudah terdaftar.',
            'anggota.*.nama.required' => 'Nama anggota harus diisi.',
        ]);

        DataPemilih::create($data);

        return redirect()->route('datapemilih.index')->with('success', 'Data Pemilih berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $data['datapemilih'] = DataPemilih::findOrFail($id);
        return Inertia::render("Datapemilih/Edit/Index", $data);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'no_kk' => 'required|numeric',
            'nik' => 'required|unique:data_pemilihs,nik,' . $id,
            'nama' => 'required',
            'alamat' => 'required',
            'rw' => 'required',
            'rt' => 'required',
            'tps' => 'required',
            'no_hp' => 'required|numeric|min:11',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'korlap_id' => 'nullable|exists:users,id',
            'kormas_id' => 'nullable|exists:users,id',
        ], [
            'no_kk.required' => 'Nomor KK harus diisi.',
            'no_kk.numeric' => 'Nomor KK harus berupa angka.',
            'nik.required' => 'NIK harus diisi.',
            'nik.unique' => 'NIK sudah terdaftar.',
            'nama.required' => 'Nama harus diisi.',
            'kelurahan_id.exists' => 'Kelurahan tidak ditemukan.',
            'kelurahan_id.required' => 'Kelurahan harus dipilih.',
            'kecamatan_id.exists' => 'Kecamatan tidak ditemukan.',
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'korlap_id.exists' => 'Koordinator Lapangan tidak ditemukan.',
            'kormas_id.exists' => 'Koordinator Masyarakat tidak ditemukan.',
            'no_hp.min' => 'Nomor HP harus minimal 11 digit.',
            'rw.required' => 'RW harus diisi.',
            'rt.required' => 'RT harus diisi.',
            'tps.required' => 'TPS harus diisi.',
            'no_hp.required' => 'Nomor HP harus diisi.',
            'no_hp.numeric' => 'Nomor HP harus berupa angka.',
            'alamat.required' => 'Alamat harus diisi.',
        ]);

        $datapemilih = DataPemilih::findOrFail($id);
        $datapemilih->update($data);

        return redirect()->route('datapemilih.index')->with('success', 'Data Pemilih berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $datapemilih = DataPemilih::findOrFail($id);
        $datapemilih->delete();

        return redirect()->route('datapemilih.index')->with('success', 'Data Pemilih berhasil dihapus.');
    }
}

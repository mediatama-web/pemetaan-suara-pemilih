<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Imports\DataPemilihImport;
use App\Models\DataPemilih;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\KorLapMas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DataPemilihController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $query = DataPemilih::leftJoin('kelurahans', 'data_pemilihs.kelurahan_id', '=', 'kelurahans.id')
            ->leftJoin('kecamatans', 'data_pemilihs.kecamatan_id', '=', 'kecamatans.id')
            ->leftJoin('kor_lap_mas as korlap', 'data_pemilihs.korlap_id', '=', 'korlap.id')
            ->leftJoin('kor_lap_mas as kormas', 'data_pemilihs.kormas_id', '=', 'kormas.id')
            ->select(
                'data_pemilihs.*',
                'kelurahans.nama_kelurahan as nama_kelurahan',
                'kecamatans.nama_kecamatan as nama_kecamatan',
                'korlap.nama as nama_korlap',
                'kormas.nama as nama_kormas'
            );

        if ($user->role == 'admin') {
            $query->where('data_pemilihs.user_id', $user->id);
        }

        $data['datapemilih'] = $query->get();
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
            'no_kk' => 'nullable|numeric',
            'alamat' => 'required',
            'rw' => 'required',
            'rt' => 'required',
            'tps' => 'required',
            'no_hp' => 'nullable|numeric|min:11',
            'kelurahan_id' => 'required|exists:kelurahans,id',
            'kecamatan_id' => 'required|exists:kecamatans,id',
            'korlap_id' => 'required',
            'kormas_id' => 'required',
            'anggota' => 'required|array',
            'anggota.*.nik' => 'required|numeric|unique:data_pemilihs,nik',
            'anggota.*.nama' => 'required|string',
        ], [
            'no_kk.numeric' => 'Nomor KK harus berupa angka.',
            'kelurahan_id.exists' => 'Kelurahan tidak ditemukan.',
            'kelurahan_id.required' => 'Kelurahan harus dipilih.',
            'kecamatan_id.exists' => 'Kecamatan tidak ditemukan.',
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'korlap_id.required' => 'Koordinator Lapangan tidak boleh kosong.',
            'kormas_id.required' => 'Koordinator Masyarakat tidak boleh kosong.',
            'no_hp.min' => 'Nomor HP harus minimal 11 digit.',
            'rw.required' => 'RW harus diisi.',
            'rt.required' => 'RT harus diisi.',
            'tps.required' => 'TPS harus diisi.',
            'no_hp.numeric' => 'Nomor HP harus berupa angka.',
            'alamat.required' => 'Alamat harus diisi.',
            'anggota.required' => 'Anggota harus diisi.',
            'anggota.array' => 'Anggota harus berupa array.',
            'anggota.*.nik.required' => 'NIK anggota harus diisi.',
            'anggota.*.nik.numeric' => 'NIK anggota harus berupa angka.',
            'anggota.*.nik.unique' => 'NIK anggota sudah terdaftar.',
            'anggota.*.nama.required' => 'Nama anggota harus diisi.',
        ]);

        foreach ($data['anggota'] as $anggota) {
            $anggota['no_kk'] = $data['no_kk'];
            $anggota['alamat'] = $data['alamat'];
            $anggota['rw'] = $data['rw'];
            $anggota['rt'] = $data['rt'];
            $anggota['tps'] = $data['tps'];
            $anggota['no_hp'] = $data['no_hp'];
            $anggota['kelurahan_id'] = $data['kelurahan_id'];
            $anggota['kecamatan_id'] = $data['kecamatan_id'];
            $anggota['korlap_id'] = $data['korlap_id'];
            $anggota['kormas_id'] = $data['kormas_id'];
            $anggota['user_id'] = Auth::user()->id;

            DataPemilih::create($anggota);
        }

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
            'no_kk' => 'nullable|numeric',
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
        try {
            $datapemilih = DataPemilih::findOrFail($id);
            $datapemilih->delete();

            return redirect()->route('datapemilih.index')->with('success', 'Data Pemilih berhasil dihapus.');
        } catch (\Throwable $th) {
            return redirect()->route('datapemilih.index')->with('error', 'Data Pemilih gagal dihapus.');
        }
    }

    public function show()
    {
        $file = public_path('assets/template/template.xlsx');

        if (!file_exists($file)) {
            abort(404);
        }

        return response()->download($file);
    }

    public function importExcel(Request $request)
    {
        $file = $request->file('file');
        $import = Excel::import(new DataPemilihImport, $file, \Maatwebsite\Excel\Excel::XLSX);

        if (!$import) {
            return redirect()->route('datapemilih.index')->with('error', 'Data Pemilih gagal diimport.');
        }

        return redirect()->route('datapemilih.index')->with('success', 'Data Pemilih berhasil diimport.');
    }
}

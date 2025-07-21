<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\AbsenKegiatan;
use App\Models\Kecamatan;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'superadmin') {
            // Super Admin lihat semua
            $data['kegiatan'] = Kegiatan::with(['kecamatan', 'kelurahan', 'user'])->get();
        } else {
            // Filter berdasarkan anggota_dewan_id yang diambil dari relasi user pada kegiatan
            $data['kegiatan'] = Kegiatan::with(['kecamatan', 'kelurahan', 'user'])
                ->whereHas('user', function ($query) use ($user) {
                    $query->where('anggota_dewan_id', $user->anggota_dewan_id);
                })
                ->get();
        }
        return Inertia::render('Kegiatan/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['kecamatans'] = Kecamatan::all();
        return Inertia::render('Kegiatan/Create/Index', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kecamatan_id' => 'required',
            'kelurahan_id' => 'required',
            'nama_kegiatan' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_akhir' => 'required',
            'rt' => 'required',
            'rw' => 'required',
        ], [
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'kelurahan_id.required' => 'Kelurahan harus dipilih.',
            'nama_kegiatan.required' => 'Kegiatan harus diisi.',
            'tanggal_mulai.required' => 'Tanggal mulai harus diisi.',
            'tanggal_akhir.required' => 'Tanggal selesai harus diisi.',
            'rt.required' => 'RT harus diisi.',
            'rw.required' => 'RW harus diisi.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            Kegiatan::create([
                'user_id' => Auth::user()->id,
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
                'nama_kegiatan' => $request->nama_kegiatan,
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_akhir' => $request->tanggal_akhir,
                'rt' => $request->rt,
                'rw' => $request->rw,
            ]);

            DB::commit();
            return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil ditambahkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menambahkan kegiatan.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function edit(Kegiatan $kegiatan)
    {
        $data['kecamatans'] = Kecamatan::all();
        $data['kegiatan'] = $kegiatan;
        return Inertia::render('Kegiatan/Edit/Index', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kegiatan $kegiatan)
    {
        $validator = Validator::make($request->all(), [
            'kecamatan_id' => 'required',
            'kelurahan_id' => 'required',
            'nama_kegiatan' => 'required',
            'tanggal_mulai' => 'required',
            'tanggal_akhir' => 'required',
            'rt' => 'required',
            'rw' => 'required',
        ], [
            'kecamatan_id.required' => 'Kecamatan harus dipilih.',
            'kelurahan_id.required' => 'Kelurahan harus dipilih.',
            'nama_kegiatan.required' => 'Kegiatan harus diisi.',
            'tanggal_mulai.required' => 'Tanggal mulai harus diisi.',
            'tanggal_akhir.required' => 'Tanggal selesai harus diisi.',
            'rt.required' => 'RT harus diisi.',
            'rw.required' => 'RW harus diisi.',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $kegiatan->update([
                'kecamatan_id' => $request->kecamatan_id,
                'kelurahan_id' => $request->kelurahan_id,
                'nama_kegiatan' => $request->nama_kegiatan,
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_akhir' => $request->tanggal_akhir,
                'rt' => $request->rt,
                'rw' => $request->rw,
            ]);

            DB::commit();
            return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil diubah.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengubah kegiatan.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        $kegiatan->delete();
        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil dihapus.');
    }

    public function createAbsen(Kegiatan $kegiatan)
    {
        $absenList = AbsenKegiatan::with('pemilih')
            ->where('kegiatan_id', $kegiatan->id)
            ->latest()
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'nik' => $item->nik,
                'nama' => $item->pemilih->nama ?? '-',
                'waktu' => $item->created_at->format('d M Y H:i'),
            ]);

        return Inertia::render('Kegiatan/Entry/Index', [
            'kegiatan' => [
                'id' => $kegiatan->id,
                'nama_kegiatan' => $kegiatan->nama_kegiatan,
            ],
            'absenList' => $absenList,
        ]);
    }

    public function storeAbsen(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|exists:data_pemilihs,nik',
            'kegiatan_id' => 'required|exists:kegiatans,id',
        ]);

        $exists = AbsenKegiatan::where('nik', $validated['nik'])
            ->where('kegiatan_id', $validated['kegiatan_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['nik' => 'Pemilih ini sudah absen.']);
        }

        DB::beginTransaction();

        try {

            AbsenKegiatan::create([
                'kegiatan_id' => $validated['kegiatan_id'],
                'nik' => $validated['nik'],
                'user_id' => Auth::user()->id,
            ]);

            DB::commit();
            return back()->with('success', 'Absen berhasil disimpan.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat menyimpan absen.');
        }
    }
}

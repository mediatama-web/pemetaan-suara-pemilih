<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user(); // user yang login

        if ($user->role === 'superadmin') {
            // Superadmin: ambil semua proposal dengan user-nya
            $data['proposal'] = Proposal::with('user')->get();
        } elseif ($user->role === 'admin') {
            // Admin: ambil proposal yang user-nya punya anggota_dewan_id yang sama
            $data['proposal'] = Proposal::with('user')
                ->whereHas('user', function ($query) use ($user) {
                    $query->where('anggota_dewan_id', $user->anggota_dewan_id);
                })
                ->get();
        } else {
            // Role lainnya, tidak dapat data
            $data['proposal'] = collect();
        }

        return Inertia::render('Proposal/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Proposal/Create/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'nama_penanggung_jawab' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'judul_proposal' => 'required|string|max:255',
            'file_proposal' => 'required'
        ], [
            'nama_penanggung_jawab.required' => 'Nama penanggung jawab harus diisi',
            'tanggal_masuk.required' => 'Tanggal masuk harus diisi',
            'judul_proposal.required' => 'Judul proposal harus diisi',
            'file_proposal.required' => 'File proposal harus diisi',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }

        DB::beginTransaction();

        try {
            Proposal::create([
                'user_id' => Auth::user()->id,
                'nama_penanggung_jawab' => $request->nama_penanggung_jawab,
                'tanggal_masuk' => $request->tanggal_masuk,
                'judul_proposal' => $request->judul_proposal,
                'file_proposal' => $request->file_proposal
            ]);

            DB::commit();
            return redirect()->route('proposal.index')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data');
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
    public function edit(Proposal $proposal)
    {
        return Inertia::render('Proposal/Edit/Index', [
            'proposal' => $proposal
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Proposal $proposal)
    {
        $validate = Validator::make($request->all(), [
            'nama_penanggung_jawab' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'judul_proposal' => 'required|string|max:255',
            'file_proposal' => 'required'
        ], [
            'nama_penanggung_jawab.required' => 'Nama penanggung jawab harus diisi',
            'tanggal_masuk.required' => 'Tanggal masuk harus diisi',
            'judul_proposal.required' => 'Judul proposal harus diisi',
            'file_proposal.required' => 'File proposal harus diisi',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }

        DB::beginTransaction();

        try {
            $proposal->update([
                'user_id' => Auth::user()->id,
                'nama_penanggung_jawab' => $request->nama_penanggung_jawab,
                'tanggal_masuk' => $request->tanggal_masuk,
                'judul_proposal' => $request->judul_proposal,
                'file_proposal' => $request->file_proposal
            ]);

            DB::commit();
            return redirect()->route('proposal.index')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proposal $proposal)
    {
        $proposal->delete();
        return redirect()->route('proposal.index')->with('success', 'Data berhasil dihapus');
    }

    public function updateStatus(Request $request, Proposal $proposal)
    {
        $request->validate([
            'status' => 'required|in:menunggu,diterima,ditolak',
        ]);

        $proposal->status = $request->status;
        $proposal->save();

        return redirect()->back()->with('success', 'Status proposal berhasil diperbarui.');
    }
}

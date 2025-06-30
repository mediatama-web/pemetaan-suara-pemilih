<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        $data['users'] = User::all();
        return Inertia::render('Team/Index', $data);
    }

    public function create()
    {
        return Inertia::render('Team/Create/Index');
    }

    public function store(Request $request)
    {
        $cek = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed|',
            'alamat' => 'nullable|string',
            'role' => 'required'
        ], [
            'name.required' => 'Nama tidak boleh kosong.',
            'name.string' => 'Nama harus string.',
            'name.max' => 'Nama tidak boleh lebih dari 255 karakter.',
            'email.required' => 'Email tidak boleh kosong.',
            'email.string' => 'Email harus string.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
            'email.unique' => 'Email sudah terdaftar.',
            'password.required' => 'Password tidak boleh kosong.',
            'password.string' => 'Password harus string.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Password tidak cocok.',
            'alamat.string' => 'Alamat harus string.',
            'role.required' => 'Role tidak boleh kosong.',
        ]);

        if ($cek->fails()) {
            return back()->withErrors($cek)->withInput();
        }

        DB::beginTransaction();

        try {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'alamat' => $request->alamat,
                'role' => $request->role
            ]);

            DB::commit();
            return redirect()->route('team.index')->with('success', 'Pengguna berhasil dibuat.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('team.index')->with('error', 'Pengguna gagal dibuat.');
        }
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Team/Edit/Index', [
            'team' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $cek = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed|',
            'alamat' => 'nullable|string',
            'role' => 'required'
        ], [
            'name.required' => 'Nama tidak boleh kosong.',
            'name.string' => 'Nama harus string.',
            'name.max' => 'Nama tidak boleh lebih dari 255 karakter.',
            'email.required' => 'Email tidak boleh kosong.',
            'email.string' => 'Email harus string.',
            'email.max' => 'Email tidak boleh lebih dari 255 karakter.',
            'email.unique' => 'Email sudah terdaftar.',
            'password.string' => 'Password harus string.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Password tidak cocok.',
            'alamat.string' => 'Alamat harus string.',
            'role.required' => 'Role tidak boleh kosong.',
        ]);

        if ($cek->fails()) {
            return back()->withErrors($cek)->withInput();
        }

        try {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->alamat = $request->alamat;

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return redirect()->route('team.index')->with('success', 'User updated successfully.');
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('team.index')->with('success', 'User deleted successfully.');
    }
}

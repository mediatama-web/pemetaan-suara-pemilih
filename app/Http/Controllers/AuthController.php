<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $r)
    {
        $cek = Validator::make($r->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8'
        ], [
            'email.required' => '* Email diperlukan',
            'email.email' => '* Email tidak valid',
            'email.exists' => '* Email tidak terdaftar',
            'password.required' => '* Password diperlukan',
            'password.min' => '* Password minimal 8 karakter'
        ]);

        if ($cek->fails()) {
            return Redirect::back()->withErrors($cek);
        }

        $user = User::whereEmail($r->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'Pastikan email Telah Terdaftar']);
        }

        if (Auth::guard('web')->attempt(['email' => $r->email, 'password' => $r->password])) {
            $userAuth = Auth::user();

            switch ($userAuth->role) {
                case 'superadmin':
                    return redirect('dashboard')->with('success', 'Selamat Datang ' . $userAuth->name);
                    break;
                case 'korlap':
                    return redirect('dashboard')->with('success', 'Selamat Datang ' . $userAuth->name);
                    break;
                case 'kormas':
                    return redirect('dashboard')->with('success', 'Selamat Datang ' . $userAuth->name);
                    break;
                default:
                    return back()->withErrors("Maaf Anda Belum Terdaftar!");
            }
        } else {
            return Redirect::back()->withErrors(['password' => 'Password Salah!']);
        }
    }

    public function logout(Request $r)
    {
        Auth::logout();

        $r->session()->invalidate();
        $r->session()->regenerateToken();
        return redirect('/');
    }
}

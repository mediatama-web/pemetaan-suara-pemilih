<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    AuthController,
    DataPemilihController,
    KecamatanController,
    KelurahanController,
    UserController,
};

Route::get('/', [AuthController::class, 'index'])->name('/')->middleware('guest');
Route::post('/auth.login', [AuthController::class, 'login'])->name('auth.login')->middleware('guest');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

// kecamatan
Route::get('kecamatan', [KecamatanController::class, 'index'])->name('kecamatan.index')->middleware('auth');

// kelurahan
Route::get('kelurahan', [KelurahanController::class, 'index'])->name('kelurahan.index')->middleware('auth');

// team
Route::get('team', [UserController::class, 'index'])->name('team.index')->middleware('auth');

// data pemilih
Route::get('datapemilih', [DataPemilihController::class, 'index'])->name('datapemilih.index')->middleware('auth');

require __DIR__ . '/auth.php';

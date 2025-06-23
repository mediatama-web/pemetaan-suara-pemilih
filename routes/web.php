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

Route::group(['middleware' => 'guest'], function () {
    Route::get('/', [AuthController::class, 'index'])->name('login');
    Route::post('/auth.login', [AuthController::class, 'login'])->name('auth.login');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->middleware(['auth', 'verified'])->name('dashboard');

    // kecamatan
    Route::resource('kecamatan', KecamatanController::class);

    // kelurahan
    Route::resource('kelurahan', KelurahanController::class);

    // team
    Route::resource('team', UserController::class);

    // data pemilih
    Route::resource('datapemilih', DataPemilihController::class);

    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

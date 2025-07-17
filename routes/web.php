<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AnggotaDewanController,
    AuthController,
    DashboardController,
    DataPemilihController,
    KecamatanController,
    KelurahanController,
    KorlapController,
    KormasController,
    UserController,
};

Route::group(['middleware' => 'guest'], function () {
    Route::get('/', [AuthController::class, 'index'])->name('login');
    Route::post('/auth.login', [AuthController::class, 'login'])->name('auth.login');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::resource('dashboard', DashboardController::class);
    // kecamatan
    Route::resource('kecamatan', KecamatanController::class);
    // kelurahan
    Route::resource('kelurahan', KelurahanController::class);
    // team
    Route::resource('team', UserController::class);
    // anggota dewan
    Route::resource('anggotadewan', AnggotaDewanController::class);
    // data pemilih
    Route::resource('datapemilih', DataPemilihController::class);
    Route::post('datapemilih.import', [DataPemilihController::class, 'importExcel'])->name('datapemilih.import');
    // data kormas
    Route::resource('kormas', KormasController::class);
    // data korlap
    Route::resource('korlap', KorlapController::class);
    // logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

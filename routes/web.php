<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backend\{
    AnggotaDewanController,
    DashboardController,
    DataPemilihController,
    KecamatanController,
    KegiatanController,
    KelurahanController,
    KorlapController,
    KormasController,
    LaporanKegiatanController,
    LaporanPemilihController,
    ProposalController,
    UserController,
};

Route::group(['middleware' => 'guest'], function () {
    Route::get('/', [AuthController::class, 'index'])->name('login');
    Route::post('/auth.login', [AuthController::class, 'login'])->name('auth.login');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::resource('dashboard', DashboardController::class);
    // kegiatan
    Route::resource('kegiatan', KegiatanController::class);
    Route::get('kegiatan/{kegiatan}/absen', [KegiatanController::class, 'createAbsen'])->name('kegiatan.absen');
    Route::post('kegiatan.absen', [KegiatanController::class, 'storeAbsen'])->name('kegiatan.absen.store');
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
    // laporan pemilih
    Route::resource('laporanpemilih', LaporanPemilihController::class);
    // laporan kegiatan
    Route::resource('laporankegiatan', LaporanKegiatanController::class);
    // proposal masuk
    Route::resource('proposal', ProposalController::class);
    Route::patch('/proposal/{proposal}/status', [ProposalController::class, 'updateStatus'])
        ->name('proposal.update-status');
    // data kormas
    Route::resource('kormas', KormasController::class);
    // data korlap
    Route::resource('korlap', KorlapController::class);
    // logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/kelurahan', function (Request $request) {
    return \App\Models\Kelurahan::where('kecamatan_id', $request->kecamatan_id)
        ->get(['id', 'nama_kelurahan']);
})->name('api.kelurahan');

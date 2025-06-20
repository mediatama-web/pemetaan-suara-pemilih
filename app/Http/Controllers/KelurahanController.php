<?php

namespace App\Http\Controllers;

use App\Models\Kelurahan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelurahanController extends Controller
{
    public function index()
    {
        $data['kelurahans'] = Kelurahan::with('kecamatan')->get();
        return Inertia::render('Kelurahan/Index', $data);
    }
}

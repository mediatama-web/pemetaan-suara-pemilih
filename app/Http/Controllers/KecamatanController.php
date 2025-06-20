<?php

namespace App\Http\Controllers;

use App\Models\Kecamatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KecamatanController extends Controller
{
    public function index()
    {
        $data['kecamatans'] = Kecamatan::with('kelurahans')->get();
        return Inertia::render('Kecamatan/Index', $data);
    }
}

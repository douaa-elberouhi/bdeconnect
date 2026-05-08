<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use Illuminate\Http\Request;
use App\Services\InscriptionService;
use App\Models\Inscription;

class InscriptionController extends Controller
{
    public function __construct(private InscriptionService $service) {}

    public function store(Evenement $evenement)
{
    try {
        $inscription = $this->service->inscrire(auth()->user(), $evenement);

        return back()->with('success', 'Inscription : ' . $inscription);

    } catch (\Exception $e) {

        return back()->withErrors([
            'inscription' => $e->getMessage()
        ]);
    }
}

 public function destroy(Inscription $inscription)
{
    $this->service->annuler($inscription);

    return back()->with('success', 'Inscription annulée.');
}
}
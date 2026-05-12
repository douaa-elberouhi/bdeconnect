<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvenementController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.dashboard');
    }

    public function create()
    {
        return Inertia::render('Admin/Evenements/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'capacite_max' => 'required|integer|min:1',
            'prix' => 'nullable|numeric|min:0',
        ]);

        Evenement::create($request->all());

        return redirect()->route('admin.dashboard')->with('success', 'Événement créé.');
    }

    public function show($id)
    {
        $evenement = Evenement::findOrFail($id);
        $confirmes = Inscription::with('user')
            ->where('evenement_id', $id)
            ->where('statut', 'confirmee')
            ->get();
        $attente = Inscription::with('user')
            ->where('evenement_id', $id)
            ->where('statut', 'liste_attente')
            ->orderBy('date_inscription')
            ->get();

        return Inertia::render('Admin/Evenements/Show', [
            'evenement' => $evenement,
            'confirmes' => $confirmes,
            'attente' => $attente,
        ]);
    }

    public function edit($id)
    {
        $evenement = Evenement::findOrFail($id);
        return Inertia::render('Admin/Evenements/Edit', [
            'evenement' => $evenement
        ]);
    }

    public function update(Request $request, $id)
    {
        $evenement = Evenement::findOrFail($id);

        if (now() > $evenement->date_fin) {
            return back()->withErrors(['error' => 'Événement passé']);
        }

        $request->validate([
            'titre' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'capacite_max' => 'required|integer|min:1',
            'prix' => 'nullable|numeric|min:0',
        ]);

        $evenement->update($request->all());

        return redirect()->route('admin.dashboard')->with('success', 'Événement mis à jour.');
    }

    public function destroy($id)
    {
        Evenement::findOrFail($id)->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Événement supprimé.');
    }
}
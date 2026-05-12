<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Inscription;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EtudiantController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        $inscriptionsActives = Inscription::where('user_id', $user->id)
            ->whereIn('statut', ['confirmee', 'liste_attente'])
            ->count();

        $prochainsEvenements = Evenement::where('statut', 'actif')
            ->where('date_fin', '>=', now())
            ->orderBy('date_debut')
            ->take(5)
            ->get()
            ->map(function (Evenement $e) {
                return [
                    'id' => $e->id,
                    'titre' => $e->titre,
                    'date_debut' => $e->date_debut->toIso8601String(),
                    'prix' => (float) $e->prix,
                ];
            });

        return Inertia::render('Etudiant/Dashboard', [
            'inscriptionsActives' => $inscriptionsActives,
            'prochainsEvenements' => $prochainsEvenements,
        ]);
    }

    // Calendrier public des événements futurs
    public function calendrier()
    {
        $user = Auth::user();

        $evenements = Evenement::where('date_fin', '>=', now())
            ->where('statut', 'actif')
            ->withCount([
                'inscriptions as inscriptions_confirmees_count' => function ($query) {
                    $query->where('statut', 'confirmee');
                }
            ])
            ->get()

            ->map(function ($event) use ($user) {

                $dejaInscrit = false;

                if ($user) {
                    $dejaInscrit = Inscription::where('user_id', $user->id)
                        ->where('evenement_id', $event->id)
                        ->exists();
                }

                return [
                    'id' => $event->id,
                    'titre' => $event->titre,
                    'description' => $event->description,
                    'date_debut' => $event->date_debut,
                    'date_fin' => $event->date_fin,
                    'prix' => $event->prix,
                    'capacite_max' => $event->capacite_max,
                    'places_restantes' => $event->capacite_max - $event->inscriptions_confirmees_count,
                    'complet' => $event->inscriptions_confirmees_count >= $event->capacite_max,
                    'dejaInscrit' => $dejaInscrit,
                ];
            });

        return Inertia::render('Etudiant/Calendrier', [
            'evenements' => $evenements
        ]);
    }

    // Mes inscriptions
    public function mesInscriptions()
    {
        $inscriptions = Inscription::with('evenement')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Etudiant/MesInscriptions', [
            'inscriptions' => $inscriptions
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Inscription;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEvenements = Evenement::count();

        $totalInscrits = Inscription::where('statut', 'confirmee')->count();

        $tousLesEvenements = Evenement::where('statut', 'actif')->get();
        $placesLibres = 0;
        foreach ($tousLesEvenements as $evenement) {
            $inscritsConfirmes = Inscription::where('evenement_id', $evenement->id)
                ->where('statut', 'confirmee')
                ->count();
            $placesLibres += max(0, $evenement->capacite_max - $inscritsConfirmes);
        }

        $plusPopulaire = Evenement::withCount([
            'inscriptions as confirmes_count' => function ($q) {
                $q->where('statut', 'confirmee');
            },
        ])->orderByDesc('confirmes_count')->first();

        $graphique = Evenement::withCount([
            'inscriptions as confirmes_count' => function ($q) {
                $q->where('statut', 'confirmee');
            },
        ])->get()->map(function ($e) {
            return [
                'evenement' => $e->titre,
                'inscrits' => $e->confirmes_count,
            ];
        });

        $evenementsAVenir = Evenement::where('statut', 'actif')
            ->where('date_fin', '>=', now())
            ->count();

        $inscriptionsToutes = Inscription::whereIn('statut', ['confirmee', 'liste_attente'])->count();

        $listeAttente = Inscription::where('statut', 'liste_attente')->count();

        $evenements = Evenement::withCount([
            'inscriptions as inscrits_confirmes' => function ($q) {
                $q->where('statut', 'confirmee');
            },
        ])
            ->orderByDesc('date_debut')
            ->get()
            ->map(function (Evenement $e) {
                return [
                    'id' => $e->id,
                    'titre' => $e->titre,
                    'description' => $e->description,
                    'date_debut' => $e->date_debut->toIso8601String(),
                    'date_fin' => $e->date_fin->toIso8601String(),
                    'capacite_max' => $e->capacite_max,
                    'prix' => (float) $e->prix,
                    'statut' => $e->statut,
                    'inscrits_confirmes' => $e->inscrits_confirmes,
                    'est_passe' => $e->date_fin->isPast(),
                ];
            });

        $inscriptions = Inscription::with(['user', 'evenement'])
            ->latest('date_inscription')
            ->limit(200)
            ->get()
            ->map(function (Inscription $i) {
                return [
                    'id' => $i->id,
                    'statut' => $i->statut,
                    'date_inscription' => $i->date_inscription?->toIso8601String(),
                    'user' => [
                        'name' => $i->user?->name,
                        'email' => $i->user?->email,
                    ],
                    'evenement' => [
                        'titre' => $i->evenement?->titre,
                    ],
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalEvenements' => $totalEvenements,
                'evenementsAVenir' => $evenementsAVenir,
                'totalInscrits' => $totalInscrits,
                'inscriptionsToutes' => $inscriptionsToutes,
                'placesLibres' => $placesLibres,
                'plusPopulaire' => $plusPopulaire ? $plusPopulaire->titre : 'Aucun',
                'listeAttente' => $listeAttente,
            ],
            'graphique' => $graphique,
            'evenements' => $evenements,
            'inscriptions' => $inscriptions,
        ]);
    }

    public function exportCsv()
    {
        $inscriptions = Inscription::with(['user', 'evenement'])->get();

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="inscriptions.csv"',
        ];

        $callback = function () use ($inscriptions) {
            $file = fopen('php://output', 'w');
            fputcsv($file, [
                'Nom étudiant',
                'Email',
                'Événement',
                'Date inscription',
                'Statut'
            ]);
            foreach ($inscriptions as $ins) {
                fputcsv($file, [
                    $ins->user->name,
                    $ins->user->email,
                    $ins->evenement->titre,
                    $ins->date_inscription,
                    $ins->statut,
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
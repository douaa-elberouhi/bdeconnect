<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEvenements = Evenement::count();

        $totalInscrits = Inscription::where('statut', 'confirmée')->count();

        $tousLesEvenements = Evenement::where('statut', 'actif')->get();
        $placesLibres = 0;
        foreach ($tousLesEvenements as $evenement) {
            $inscritsConfirmes = Inscription::where('evenement_id', $evenement->id)
                                            ->where('statut', 'confirmée')
                                            ->count();
            $placesLibres += max(0, $evenement->capacite_max - $inscritsConfirmes);
        }

        $plusPopulaire = Evenement::withCount([
            'inscriptions as confirmes_count' => function ($q) {
                $q->where('statut', 'confirmée');
            }
        ])->orderByDesc('confirmes_count')->first();

        $graphique = Evenement::withCount([
            'inscriptions as confirmes_count' => function ($q) {
                $q->where('statut', 'confirmée');
            }
        ])->get()->map(function ($e) {
            return [
                'evenement' => $e->titre,
                'inscrits'  => $e->confirmes_count,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalEvenements' => $totalEvenements,
                'totalInscrits'   => $totalInscrits,
                'placesLibres'    => $placesLibres,
                'plusPopulaire'   => $plusPopulaire ? $plusPopulaire->titre : 'Aucun',
            ],
            'graphique' => $graphique,
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
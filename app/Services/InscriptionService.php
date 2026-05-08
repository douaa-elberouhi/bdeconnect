<?php

namespace App\Services;

use App\Models\User;
use App\Models\Evenement;
use App\Models\Inscription;

class InscriptionService
{
    // Inscription étudiant
    public function inscrire(User $user, Evenement $event)
    {
        // RG2 : déjà inscrit
        $exist = Inscription::where('user_id', $user->id)
            ->where('evenement_id', $event->id)
            ->first();

        if ($exist) {
            throw new \Exception("Vous êtes déjà inscrit");
        }

        // RG1 : vérifier capacité
        $countConfirmed = Inscription::where('evenement_id', $event->id)
            ->where('statut', 'confirmee')
            ->count();

        $status = ($countConfirmed < $event->capacite_max)
            ? 'confirmee'
            : 'liste_attente';

        // création inscription
        $inscription = Inscription::create([
            'user_id' => $user->id,
            'evenement_id' => $event->id,
            'statut' => $status,
            'date_inscription' => now(),
        ]);

        return $inscription;
    }

    // Annulation inscription
    public function annuler(Inscription $inscription)
{
    // Annuler inscription actuelle
    $inscription->update([
        'statut' => 'annulee'
    ]);

    // Chercher premier en liste d'attente
    $next = Inscription::where('evenement_id', $inscription->evenement_id)
        ->where('statut', 'liste_attente')
        ->orderBy('date_inscription', 'asc')
        ->first();

    // Promotion automatique
    if ($next) {
        $next->update([
            'statut' => 'confirmee'
        ]);
    }

    return true;
}
}
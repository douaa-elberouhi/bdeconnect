<?php

namespace App\Services;

use App\Models\User;
use App\Models\Evenement;
use App\Models\Inscription;

class InscriptionService
{
    public function inscrire(User $user, Evenement $event)
{
    // RG2: check deja inscrit
    $exist = Inscription::where('user_id', $user->id)
        ->where('evenement_id', $event->id)
        ->first();

    if ($exist) {
        return "Deja inscrit";
    }

    // RG1: capacity check
    $countConfirmed = Inscription::where('evenement_id', $event->id)
        ->where('statut', 'confirmee')
        ->count();

    $status = ($countConfirmed < $event->capacite_max)
        ? "confirmee"
        : "liste_attente";

    Inscription::create([
        'user_id' => $user->id,
        'evenement_id' => $event->id,
        'statut' => $status
    ]);

    return $status;
}
    public function annuler($id)
    {
        $inscription = Inscription::findOrFail($id);

        $inscription->statut = "annulee";
        $inscription->save();

        $next = Inscription::where('evenement_id', $inscription->evenement_id)
            ->where('statut', 'liste_attente')
            ->first();

        if ($next) {
            $next->statut = "confirmee";
            $next->save();
        }

        return "Annulation effectuée";
    }
}
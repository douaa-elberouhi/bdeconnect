<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'description', 'date_debut',
        'date_fin', 'capacite_max', 'prix', 'statut'
    ];

    protected function casts(): array
    {
        return [
            'date_debut'   => 'datetime',
            'date_fin'     => 'datetime',
            'capacite_max' => 'integer',
            'prix'         => 'decimal:2',
        ];
    }

    public function inscriptions(): HasMany
    {
        return $this->hasMany(Inscription::class);
    }

    public function inscriptionsConfirmees(): HasMany
    {
        return $this->hasMany(Inscription::class)
                    ->where('statut', 'confirmée');
    }

    public function estPasse(): bool
    {
        return $this->date_fin->isPast();
    }

    public function scopeAVenir($query)
    {
        return $query->where('date_debut', '>', now())
                     ->where('statut', 'actif');
    }

    public function placesRestantes(): int
    {
        return $this->capacite_max - $this->inscriptionsConfirmees()->count();
    }
}
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'evenement_id', 'statut', 'date_inscription'
    ];

    protected function casts(): array
    {
        return ['date_inscription' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function evenement(): BelongsTo
    {
        return $this->belongsTo(Evenement::class);
    }
}
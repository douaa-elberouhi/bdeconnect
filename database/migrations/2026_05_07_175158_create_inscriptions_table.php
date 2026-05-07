<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->foreignId('evenement_id')
                  ->constrained('evenements')
                  ->onDelete('cascade');
            $table->enum('statut', ['confirmée', 'liste_attente', 'annulée'])
                  ->default('confirmée');
            $table->timestamp('date_inscription')->useCurrent();
            $table->timestamps();
            $table->unique(['user_id', 'evenement_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
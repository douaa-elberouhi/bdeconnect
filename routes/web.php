<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\EtudiantController;
use App\Services\InscriptionService;
use App\Models\Inscription;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Welcome
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | Étudiant
    |--------------------------------------------------------------------------
    */

    Route::get('/calendrier', [EtudiantController::class, 'calendrier'])
        ->name('etudiant.calendrier');

    Route::get('/mes-inscriptions', [EtudiantController::class, 'mesInscriptions'])
        ->name('etudiant.inscriptions');

    /*
    |--------------------------------------------------------------------------
    | Inscriptions
    |--------------------------------------------------------------------------
    */

    Route::post('/inscriptions/{evenement}', [InscriptionController::class, 'store'])
        ->name('inscriptions.store');

    Route::delete('/inscriptions/{inscription}', [InscriptionController::class, 'destroy'])
    ->name('inscriptions.destroy');
});

/*
|--------------------------------------------------------------------------
| TEST ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/voir-inscriptions', function () {
    return Inscription::all();
});

Route::get('/test-annulation/{id}', function ($id) {

    $service = new InscriptionService();

    $service->annuler($id);

    return "Annulation effectuée";
});

Route::get('/test-inscription/{eventId}/{userId}', function ($eventId, $userId) {

    try {

        $service = new InscriptionService();

        $user = \App\Models\User::findOrFail($userId);
        $event = \App\Models\Evenement::findOrFail($eventId);

        return $service->inscrire($user, $event);

    } catch (\Throwable $e) {

        return $e->getMessage();
    }
});

Route::get('/create-event-test', function () {

    \App\Models\Evenement::create([
        'titre' => 'Soirée BDE',
        'description' => 'Grande soirée étudiante',
        'date_debut' => '2026-05-10 18:00:00',
        'date_fin' => '2026-05-10 23:00:00',
        'capacite_max' => 50,
        'prix' => 100,
        'statut' => 'actif'
    ]);

    return "Événement créé avec succès";
});

require __DIR__.'/auth.php';
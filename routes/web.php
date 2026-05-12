<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\EvenementController;
use App\Services\InscriptionService;
use App\Models\Inscription;
use App\Models\Evenement;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        return app(EtudiantController::class)->dashboard();
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/calendrier', [EtudiantController::class, 'calendrier'])->name('etudiant.calendrier');
    Route::get('/mes-inscriptions', [EtudiantController::class, 'mesInscriptions'])->name('etudiant.inscriptions');

    Route::post('/inscriptions/{evenement}', [InscriptionController::class, 'store'])->name('inscriptions.store');
    Route::delete('/inscriptions/{inscription}', [InscriptionController::class, 'destroy'])->name('inscriptions.destroy');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/export-csv', [DashboardController::class, 'exportCsv'])->name('export');
    Route::resource('evenements', EvenementController::class);
});

Route::get('/voir-inscriptions', function () {
    return Inscription::all();
});

Route::get('/test-annulation/{id}', function ($id) {
    $service = new InscriptionService();
    $service->annuler(\App\Models\Inscription::findOrFail($id));

    return 'Annulation effectuée';
});

Route::get('/test-inscription/{eventId}/{userId}', function ($eventId, $userId) {
    try {
        $service = new InscriptionService();
        $user = User::findOrFail($userId);
        $event = Evenement::findOrFail($eventId);

        return $service->inscrire($user, $event);
    } catch (\Throwable $e) {
        return $e->getMessage();
    }
});

Route::get('/create-event-test', function () {
    Evenement::create([
        'titre' => 'Test RG3',
        'description' => 'Test liste attente',
        'date_debut' => '2026-05-15 18:00:00',
        'date_fin' => '2026-05-15 23:00:00',
        'capacite_max' => 1,
        'prix' => 0,
        'statut' => 'actif',
    ]);

    return 'Event test créé';
});

require __DIR__.'/auth.php';

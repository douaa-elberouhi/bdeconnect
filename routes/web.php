<?php

use App\Http\Controllers\ProfileController;
use App\Services\InscriptionService;
use App\Models\Inscription;
use App\Models\Evenement;
use App\Models\User;
use App\Http\Controllers\InscriptionController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::post('/inscription/{eventId}', [InscriptionController::class, 'store']);
Route::delete('/inscription/{id}', [InscriptionController::class, 'destroy']);
Route::get('/test-annulation/{id}', function ($id) {

    $service = new InscriptionService();

    $service->annuler($id);

    return "Annulation effectuée";
});

Route::get('/voir-inscriptions', function () {

    return Inscription::all();
});
Route::get('/test-inscription/{eventId}/{userId}', function ($eventId, $userId) {

    $service = new \App\Services\InscriptionService();

    $user = \App\Models\User::findOrFail($userId);
    $event = \App\Models\Evenement::findOrFail($eventId);

    return $service->inscrire($user, $event);
});
Route::get('/test-inscription/{eventId}/{userId}', function ($eventId, $userId) {

    try {
        $service = new \App\Services\InscriptionService();

        $user = \App\Models\User::findOrFail($userId);
        $event = \App\Models\Evenement::findOrFail($eventId);

        return $service->inscrire($user, $event);

    } catch (\Throwable $e) {
        return $e->getMessage();
    }
});
Route::get('/test-inscription/{eventId}/{userId}', function ($eventId, $userId) {

    $service = new \App\Services\InscriptionService();

    $user = \App\Models\User::findOrFail($userId);
    $event = \App\Models\Evenement::findOrFail($eventId);

    return $service->inscrire($user, $event);
});

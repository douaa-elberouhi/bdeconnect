<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return view('welcome');
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])
     ->name('admin.dashboard');
Route::get('/admin/export-csv', [DashboardController::class, 'exportCsv'])
     ->name('admin.export');
});

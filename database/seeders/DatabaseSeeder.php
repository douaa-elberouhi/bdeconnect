<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin BDE',
            'email'    => 'admin@bde.ma',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        $etudiants = [
            ['name' => 'Étudiant 1', 'email' => 'etudiant1@test.ma'],
            ['name' => 'Étudiant 2', 'email' => 'etudiant2@test.ma'],
            ['name' => 'Étudiant 3', 'email' => 'etudiant3@test.ma'],
        ];

        foreach ($etudiants as $etudiant) {
            User::create([
                'name'     => $etudiant['name'],
                'email'    => $etudiant['email'],
                'password' => Hash::make('password'),
                'role'     => 'etudiant',
            ]);
        }
    }
}
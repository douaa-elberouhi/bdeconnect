import React from 'react';
import { Head, router } from '@inertiajs/react';

export default function Show({ evenement, confirmes, attente }) {
    const placesRestantes = evenement.capacite_max - confirmes.length;

    const handleAnnuler = (inscriptionId) => {
        if (confirm('Annuler cette inscription ?')) {
            router.delete(`/admin/inscriptions/${inscriptionId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title={evenement.titre} />
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Info événement */}
                <div className="bg-white rounded shadow p-6">
                    <h1 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                        {evenement.titre}
                    </h1>
                    <p className="text-gray-600 mb-4">{evenement.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded text-center">
                            <div className="font-bold text-[#1e3a5f] text-xl">
                                {confirmes.length}
                            </div>
                            <div>Confirmés</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded text-center">
                            <div className="font-bold text-orange-500 text-xl">
                                {attente.length}
                            </div>
                            <div>Liste d'attente</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded text-center">
                            <div className="font-bold text-green-600 text-xl">
                                {placesRestantes}
                            </div>
                            <div>Places restantes</div>
                        </div>
                    </div>
                </div>

                {/* Inscrits confirmés */}
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">
                        ✅ Inscrits Confirmés
                    </h2>
                    <table className="w-full text-sm">
                        <thead className="bg-[#1e3a5f] text-white">
                            <tr>
                                <th className="p-2 text-left">Nom</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Date inscription</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmes.map(ins => (
                                <tr key={ins.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{ins.user.name}</td>
                                    <td className="p-2">{ins.user.email}</td>
                                    <td className="p-2">{ins.date_inscription}</td>
                                    <td className="p-2">
                                        <button onClick={() => handleAnnuler(ins.id)}
                                            className="bg-[#dc2626] text-white px-2 py-1 rounded text-xs">
                                            Annuler
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Liste d'attente */}
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-lg font-bold text-orange-500 mb-4">
                        ⏳ Liste d'attente
                    </h2>
                    <table className="w-full text-sm">
                        <thead className="bg-orange-400 text-white">
                            <tr>
                                <th className="p-2 text-left">Nom</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Date inscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attente.map(ins => (
                                <tr key={ins.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{ins.user.name}</td>
                                    <td className="p-2">{ins.user.email}</td>
                                    <td className="p-2">{ins.date_inscription}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <a href="/admin/evenements"
                    className="inline-block bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
                    ← Retour
                </a>
            </div>
        </div>
    );
}
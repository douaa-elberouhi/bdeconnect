import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ evenements }) {
    const handleDelete = (id) => {
        if (confirm('هل أنت متأكد من الحذف؟')) {
            router.delete(`/admin/evenements/${id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title="Événements" />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#1e3a5f]">
                        Gestion des Événements
                    </h1>
                    <Link href="/admin/evenements/create"
                        className="bg-[#1e3a5f] text-white px-4 py-2 rounded hover:bg-blue-800">
                        + Créer
                    </Link>
                </div>
                <div className="bg-white rounded shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#1e3a5f] text-white">
                            <tr>
                                <th className="p-3 text-left">Titre</th>
                                <th className="p-3 text-left">Date début</th>
                                <th className="p-3 text-left">Date fin</th>
                                <th className="p-3 text-left">Capacité</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evenements.map(ev => (
                                <tr key={ev.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{ev.titre}</td>
                                    <td className="p-3">{ev.date_debut}</td>
                                    <td className="p-3">{ev.date_fin}</td>
                                    <td className="p-3">{ev.capacite_max}</td>
                                    <td className="p-3 flex gap-2">
                                        <Link href={`/admin/evenements/${ev.id}`}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                            Voir
                                        </Link>
                                        <Link href={`/admin/evenements/${ev.id}/edit`}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                                            Modifier
                                        </Link>
                                        <button onClick={() => handleDelete(ev.id)}
                                            className="bg-[#dc2626] text-white px-2 py-1 rounded text-xs">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
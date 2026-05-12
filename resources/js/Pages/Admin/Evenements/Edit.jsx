import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function Edit({ evenement }) {
    const [form, setForm] = useState({
        titre: evenement.titre,
        description: evenement.description || '',
        date_debut: evenement.date_debut,
        date_fin: evenement.date_fin,
        capacite_max: evenement.capacite_max,
        prix: evenement.prix || '',
    });

    const isPassed = new Date(evenement.date_fin) < new Date();

    const handleSubmit = () => {
        if (isPassed) {
            alert('Événement passé, modification impossible');
            return;
        }
        router.put(`/admin/evenements/${evenement.id}`, form);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title="Modifier Événement" />
            <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">
                    Modifier Événement
                </h1>
                {isPassed && (
                    <div className="bg-red-100 text-[#dc2626] p-3 rounded mb-4">
                        ⚠️ Cet événement est passé, modification désactivée.
                    </div>
                )}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Titre *</label>
                        <input type="text"
                            className="w-full border rounded p-2 disabled:bg-gray-100"
                            disabled={isPassed}
                            value={form.titre}
                            onChange={e => setForm({...form, titre: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded p-2 disabled:bg-gray-100"
                            rows="3"
                            disabled={isPassed}
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date début *</label>
                            <input type="datetime-local"
                                className="w-full border rounded p-2 disabled:bg-gray-100"
                                disabled={isPassed}
                                value={form.date_debut}
                                onChange={e => setForm({...form, date_debut: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date fin *</label>
                            <input type="datetime-local"
                                className="w-full border rounded p-2 disabled:bg-gray-100"
                                disabled={isPassed}
                                value={form.date_fin}
                                onChange={e => setForm({...form, date_fin: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Capacité max *</label>
                            <input type="number"
                                className="w-full border rounded p-2 disabled:bg-gray-100"
                                disabled={isPassed}
                                value={form.capacite_max}
                                onChange={e => setForm({...form, capacite_max: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Prix (MAD)</label>
                            <input type="number"
                                className="w-full border rounded p-2 disabled:bg-gray-100"
                                disabled={isPassed}
                                value={form.prix}
                                onChange={e => setForm({...form, prix: e.target.value})} />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSubmit}
                            disabled={isPassed}
                            className="bg-[#1e3a5f] text-white px-6 py-2 rounded hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Enregistrer
                        </button>
                        <a href="/admin/evenements"
                            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
                            Annuler
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
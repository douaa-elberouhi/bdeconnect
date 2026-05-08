import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function Create() {
    const [form, setForm] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        capacite_max: '',
        prix: '',
    });

    const handleSubmit = () => {
        if (!form.titre || !form.date_debut || !form.date_fin || !form.capacite_max) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        router.post('/admin/evenements', form);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title="Créer Événement" />
            <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
                <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">
                    Créer un Événement
                </h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Titre *</label>
                        <input type="text"
                            className="w-full border rounded p-2"
                            value={form.titre}
                            onChange={e => setForm({...form, titre: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea className="w-full border rounded p-2" rows="3"
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date début *</label>
                            <input type="datetime-local"
                                className="w-full border rounded p-2"
                                value={form.date_debut}
                                onChange={e => setForm({...form, date_debut: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date fin *</label>
                            <input type="datetime-local"
                                className="w-full border rounded p-2"
                                value={form.date_fin}
                                onChange={e => setForm({...form, date_fin: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Capacité max *</label>
                            <input type="number"
                                className="w-full border rounded p-2"
                                value={form.capacite_max}
                                onChange={e => setForm({...form, capacite_max: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Prix (MAD)</label>
                            <input type="number"
                                className="w-full border rounded p-2"
                                value={form.prix}
                                onChange={e => setForm({...form, prix: e.target.value})} />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button onClick={handleSubmit}
                            className="bg-[#1e3a5f] text-white px-6 py-2 rounded hover:bg-blue-800">
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
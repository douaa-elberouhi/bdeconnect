import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

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
        router.post(route('admin.evenements.store'), form);
    };

    return (
        <BdeConnectLayout>
            <Head title="Créer un événement" />
            <div className="mx-auto max-w-2xl rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-semibold text-stone-900">Créer un événement</h1>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">Titre *</label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            value={form.titre}
                            onChange={(e) => setForm({ ...form, titre: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">Description</label>
                        <textarea
                            className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            rows="3"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Date début *</label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                value={form.date_debut}
                                onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Date fin *</label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                value={form.date_fin}
                                onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Capacité max *</label>
                            <input
                                type="number"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                value={form.capacite_max}
                                onChange={(e) => setForm({ ...form, capacite_max: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Prix (MAD)</label>
                            <input
                                type="number"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                value={form.prix}
                                onChange={(e) => setForm({ ...form, prix: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                            Enregistrer
                        </button>
                        <Link
                            href={route('admin.dashboard')}
                            className="rounded-full border border-stone-200 px-6 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                        >
                            Annuler
                        </Link>
                    </div>
                </div>
            </div>
        </BdeConnectLayout>
    );
}

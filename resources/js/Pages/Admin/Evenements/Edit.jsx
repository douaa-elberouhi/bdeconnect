import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

function toDatetimeLocal(value) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Edit({ evenement }) {
    const [form, setForm] = useState({
        titre: evenement.titre,
        description: evenement.description || '',
        date_debut: toDatetimeLocal(evenement.date_debut),
        date_fin: toDatetimeLocal(evenement.date_fin),
        capacite_max: evenement.capacite_max,
        prix: evenement.prix ?? '',
    });

    const isPassed = new Date(evenement.date_fin) < new Date();

    const handleSubmit = () => {
        if (isPassed) {
            alert('Événement passé, modification impossible');
            return;
        }
        router.put(route('admin.evenements.update', evenement.id), form);
    };

    return (
        <BdeConnectLayout>
            <Head title="Modifier un événement" />
            <div className="mx-auto max-w-2xl rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-semibold text-stone-900">Modifier l&apos;événement</h1>
                {isPassed && (
                    <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                        Cet événement est passé, modification désactivée.
                    </div>
                )}
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">Titre *</label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                            disabled={isPassed}
                            value={form.titre}
                            onChange={(e) => setForm({ ...form, titre: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-stone-700">Description</label>
                        <textarea
                            className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                            rows="3"
                            disabled={isPassed}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Date début *</label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                                disabled={isPassed}
                                value={form.date_debut}
                                onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Date fin *</label>
                            <input
                                type="datetime-local"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                                disabled={isPassed}
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
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                                disabled={isPassed}
                                value={form.capacite_max}
                                onChange={(e) => setForm({ ...form, capacite_max: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-stone-700">Prix (MAD)</label>
                            <input
                                type="number"
                                className="w-full rounded-xl border border-stone-200 px-3 py-2 disabled:bg-stone-50"
                                disabled={isPassed}
                                value={form.prix}
                                onChange={(e) => setForm({ ...form, prix: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isPassed}
                            className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-300"
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

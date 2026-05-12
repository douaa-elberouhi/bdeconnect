import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

export default function Show({ evenement, confirmes, attente }) {
    const placesRestantes = evenement.capacite_max - confirmes.length;

    const handleAnnuler = (inscriptionId) => {
        if (confirm('Annuler cette inscription ?')) {
            router.delete(route('inscriptions.destroy', inscriptionId));
        }
    };

    return (
        <BdeConnectLayout>
            <Head title={evenement.titre} />
            <div className="mx-auto max-w-4xl space-y-6">
                <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-stone-900">{evenement.titre}</h1>
                    <p className="mt-2 text-stone-600">{evenement.description}</p>
                    <div className="mt-6 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                        <div className="rounded-xl bg-emerald-50 p-4">
                            <div className="text-2xl font-bold text-emerald-700">{confirmes.length}</div>
                            <div className="text-sm text-stone-600">Confirmés</div>
                        </div>
                        <div className="rounded-xl bg-orange-50 p-4">
                            <div className="text-2xl font-bold text-orange-600">{attente.length}</div>
                            <div className="text-sm text-stone-600">Liste d&apos;attente</div>
                        </div>
                        <div className="rounded-xl bg-stone-100 p-4">
                            <div className="text-2xl font-bold text-stone-800">{placesRestantes}</div>
                            <div className="text-sm text-stone-600">Places restantes</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-stone-900">Inscrits confirmés</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px] text-sm">
                            <thead className="border-b border-stone-100 bg-stone-50 text-left text-stone-600">
                                <tr>
                                    <th className="px-3 py-2 font-medium">Nom</th>
                                    <th className="px-3 py-2 font-medium">Email</th>
                                    <th className="px-3 py-2 font-medium">Date inscription</th>
                                    <th className="px-3 py-2 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {confirmes.map((ins) => (
                                    <tr key={ins.id}>
                                        <td className="px-3 py-2">{ins.user.name}</td>
                                        <td className="px-3 py-2 text-stone-500">{ins.user.email}</td>
                                        <td className="px-3 py-2 text-stone-500">
                                            {ins.date_inscription
                                                ? new Date(ins.date_inscription).toLocaleString('fr-FR')
                                                : '—'}
                                        </td>
                                        <td className="px-3 py-2">
                                            <button
                                                type="button"
                                                onClick={() => handleAnnuler(ins.id)}
                                                className="rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-orange-700">Liste d&apos;attente</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px] text-sm">
                            <thead className="border-b border-stone-100 bg-orange-50 text-left text-stone-700">
                                <tr>
                                    <th className="px-3 py-2 font-medium">Nom</th>
                                    <th className="px-3 py-2 font-medium">Email</th>
                                    <th className="px-3 py-2 font-medium">Date inscription</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {attente.map((ins) => (
                                    <tr key={ins.id}>
                                        <td className="px-3 py-2">{ins.user.name}</td>
                                        <td className="px-3 py-2 text-stone-500">{ins.user.email}</td>
                                        <td className="px-3 py-2 text-stone-500">
                                            {ins.date_inscription
                                                ? new Date(ins.date_inscription).toLocaleString('fr-FR')
                                                : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Link
                    href={route('admin.dashboard')}
                    className="inline-block rounded-full border border-stone-200 px-6 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                    ← Retour au tableau de bord
                </Link>
            </div>
        </BdeConnectLayout>
    );
}

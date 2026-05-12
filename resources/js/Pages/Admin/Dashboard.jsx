import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatCard({ label, value, hint, icon }) {
    return (
        <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-stone-500">{label}</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">{value}</p>
                    {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg text-orange-600">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function formatEventDay(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('fr-FR', { day: '2-digit' }).toUpperCase();
}

function formatEventMonth(iso) {
    return new Date(iso)
        .toLocaleDateString('fr-FR', { month: 'short' })
        .replace('.', '')
        .toUpperCase();
}

function EventRow({ ev }) {
    const handleDelete = () => {
        if (confirm('Supprimer cet événement ?')) {
            router.delete(route('admin.evenements.destroy', ev.id));
        }
    };

    return (
        <div className="flex flex-col gap-3 border-b border-stone-100 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-stone-50 text-center leading-tight">
                    <span className="text-lg font-bold text-stone-900">{formatEventDay(ev.date_debut)}</span>
                    <span className="text-[10px] font-semibold uppercase text-orange-600">
                        {formatEventMonth(ev.date_debut)}
                    </span>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <Link
                            href={route('admin.evenements.show', ev.id)}
                            className="font-semibold text-stone-900 hover:text-orange-700"
                        >
                            {ev.titre}
                        </Link>
                        {ev.est_passe && (
                            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                passé
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
                        <span className="inline-flex items-center gap-1">
                            <span className="text-stone-400">📍</span>
                            {ev.description
                                ? ev.description.slice(0, 48) + (ev.description.length > 48 ? '…' : '')
                                : '—'}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span className="text-stone-400">👥</span>
                            {ev.inscrits_confirmes}/{ev.capacite_max}
                        </span>
                        <span className="font-medium text-stone-700">
                            {Number(ev.prix) > 0 ? `${Number(ev.prix)} MAD` : 'Gratuit'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex shrink-0 gap-2 self-end sm:self-center">
                <Link
                    href={route('admin.evenements.edit', ev.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 shadow-sm hover:bg-stone-50"
                    title="Modifier"
                >
                    ✏️
                </Link>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-red-600 shadow-sm hover:bg-red-50"
                    title="Supprimer"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

function statutLabel(s) {
    const m = {
        confirmee: 'Confirmée',
        liste_attente: "Liste d'attente",
        annulee: 'Annulée',
    };
    return m[s] || s;
}

export default function Dashboard({ stats, graphique = [], evenements = [], inscriptions = [] }) {
    const [tab, setTab] = useState('evenements');

    const chartData = {
        labels: graphique.map((item) => item.evenement),
        datasets: [
            {
                label: 'Inscrits confirmés',
                data: graphique.map((item) => item.inscrits),
                backgroundColor: '#fb923c',
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Inscriptions par événement', color: '#44403c' },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
    };

    return (
        <BdeConnectLayout>
            <Head title="Tableau de bord" />
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Tableau de bord</h1>
                <Link
                    href={route('admin.evenements.create')}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                    + Nouvel événement
                </Link>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Événements"
                    value={stats.totalEvenements ?? 0}
                    hint={`${stats.evenementsAVenir ?? 0} à venir`}
                    icon="📅"
                />
                <StatCard
                    label="Inscriptions"
                    value={stats.inscriptionsToutes ?? 0}
                    hint="toutes confondues"
                    icon="👥"
                />
                <StatCard
                    label="En attente"
                    value={stats.listeAttente ?? 0}
                    hint="liste d'attente"
                    icon="⏱"
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
                <div className="flex border-b border-stone-100">
                    {[
                        { id: 'evenements', label: 'Événements' },
                        { id: 'inscriptions', label: 'Inscriptions' },
                        { id: 'stats', label: 'Statistiques' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setTab(t.id)}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition sm:flex-none sm:px-8 ${
                                tab === t.id
                                    ? 'border-b-2 border-orange-500 text-orange-700'
                                    : 'text-stone-500 hover:text-stone-800'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="p-5 sm:p-6">
                    {tab === 'evenements' && (
                        <div>
                            {evenements.length === 0 ? (
                                <p className="py-12 text-center text-stone-500">Aucun événement pour le moment.</p>
                            ) : (
                                evenements.map((ev) => <EventRow key={ev.id} ev={ev} />)
                            )}
                        </div>
                    )}

                    {tab === 'inscriptions' && (
                        <div className="overflow-x-auto">
                            {inscriptions.length === 0 ? (
                                <p className="py-12 text-center text-stone-500">Aucune inscription.</p>
                            ) : (
                                <table className="w-full min-w-[520px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-stone-100 text-stone-500">
                                            <th className="pb-3 font-medium">Étudiant</th>
                                            <th className="pb-3 font-medium">Événement</th>
                                            <th className="pb-3 font-medium">Statut</th>
                                            <th className="pb-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {inscriptions.map((ins) => (
                                            <tr key={ins.id} className="text-stone-800">
                                                <td className="py-3">
                                                    <div className="font-medium">{ins.user?.name}</div>
                                                    <div className="text-xs text-stone-500">{ins.user?.email}</div>
                                                </td>
                                                <td className="py-3">{ins.evenement?.titre}</td>
                                                <td className="py-3">
                                                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs">
                                                        {statutLabel(ins.statut)}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-stone-500">
                                                    {ins.date_inscription
                                                        ? new Date(ins.date_inscription).toLocaleString('fr-FR')
                                                        : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a
                                    href={route('admin.export')}
                                    className="text-sm font-medium text-orange-600 hover:text-orange-700"
                                >
                                    Exporter les inscriptions (CSV) →
                                </a>
                            </div>
                        </div>
                    )}

                    {tab === 'stats' && (
                        <div className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard
                                    label="Inscrits confirmés"
                                    value={stats.totalInscrits ?? 0}
                                    hint="total"
                                    icon="✅"
                                />
                                <StatCard
                                    label="Places libres"
                                    value={stats.placesLibres ?? 0}
                                    hint="sur événements actifs"
                                    icon="🪑"
                                />
                                <StatCard
                                    label="Événement le plus populaire"
                                    value={stats.plusPopulaire ?? '—'}
                                    hint={"Plus d'inscrits confirmés"}
                                    icon="🏆"
                                />
                                <StatCard
                                    label="Événements à venir"
                                    value={stats.evenementsAVenir ?? 0}
                                    hint="non terminés"
                                    icon="📆"
                                />
                            </div>
                            <div className="rounded-xl border border-stone-100 bg-[#faf7f2] p-4">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BdeConnectLayout>
    );
}

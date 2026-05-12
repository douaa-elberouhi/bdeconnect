import { Head, Link, router } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

function StatutBadge({ statut }) {
    const styles = {
        confirmee: 'bg-emerald-100 text-emerald-800',
        liste_attente: 'bg-orange-100 text-orange-800',
        annulee: 'bg-red-100 text-red-700',
    };

    const labels = {
        confirmee: '✅ Confirmée',
        liste_attente: "⏳ Liste d'attente",
        annulee: '❌ Annulée',
    };

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[statut] || 'bg-stone-100'}`}>
            {labels[statut] || statut}
        </span>
    );
}

export default function MesInscriptions({ inscriptions }) {
    const handleAnnuler = (id) => {
        if (confirm('Voulez-vous vraiment annuler ?')) {
            router.delete(route('inscriptions.destroy', id), {
                preserveScroll: true,
                onSuccess: () => router.reload(),
                onError: (errors) => console.log(errors),
            });
        }
    };

    return (
        <BdeConnectLayout>
            <Head title="Mes inscriptions" />
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Mes inscriptions</h1>
            <p className="mt-2 text-stone-600">Suivez le statut de vos participations aux événements.</p>

            <div className="mt-8">
                {inscriptions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-stone-200 bg-white py-20 text-center text-stone-400">
                        <p className="mb-4 text-5xl">📭</p>
                        <p>Aucune inscription.</p>
                        <Link
                            href={route('etudiant.calendrier')}
                            className="mt-4 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
                        >
                            Voir les événements →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="border-b border-stone-100 bg-stone-50 text-left text-stone-600">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Événement</th>
                                    <th className="px-6 py-3 font-medium">Date inscription</th>
                                    <th className="px-6 py-3 font-medium">Statut</th>
                                    <th className="px-6 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {inscriptions.map((ins) => (
                                    <tr key={ins.id} className="hover:bg-stone-50/80">
                                        <td className="px-6 py-4 font-medium text-stone-900">{ins.evenement?.titre}</td>
                                        <td className="px-6 py-4 text-stone-500">
                                            {ins.date_inscription
                                                ? new Date(ins.date_inscription).toLocaleDateString('fr-FR')
                                                : new Date(ins.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatutBadge statut={ins.statut} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {ins.statut !== 'annulee' ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleAnnuler(ins.id)}
                                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                                                >
                                                    Annuler
                                                </button>
                                            ) : (
                                                <span className="text-stone-300">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </BdeConnectLayout>
    );
}

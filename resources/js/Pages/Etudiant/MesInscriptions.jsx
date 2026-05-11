import { Head, router } from '@inertiajs/react';

function StatutBadge({ statut }) {

    const styles = {
        'confirmee': 'bg-green-100 text-green-700',
        'liste_attente': 'bg-orange-100 text-orange-700',
        'annulee': 'bg-red-100 text-red-600',
    };

    const labels = {
        'confirmee': '✅ Confirmée',
        'liste_attente': "⏳ Liste d'attente",
        'annulee': '❌ Annulée',
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[statut]}`}
        >
            {labels[statut]}
        </span>
    );
}

export default function MesInscriptions({ inscriptions }) {
    const handleAnnuler = (id) => {
        if (confirm('Voulez-vous vraiment annuler ?')) {
          router.delete(`/inscriptions/${id}`, {
    preserveScroll: true,

    onSuccess: () => {
        router.reload();
    },

    onError: (errors) => {
        console.log(errors);
    }
});
        }
    };

    return (
        <>
            <Head title="Mes inscriptions" />
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-[#1e3a5f] text-white px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">🎓 BDEConnect</h1>
                    <div className="flex gap-4 text-sm">
                        <a href="/calendrier" className="hover:underline">Calendrier</a>
                        <a href="/mes-inscriptions" className="font-semibold underline">Mes inscriptions</a>
                    </div>
                </nav>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">📋 Mes inscriptions</h2>

                    {inscriptions.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-5xl mb-4">📭</p>
                            <p>Aucune inscription.</p>
                            <a href="/calendrier" className="mt-4 inline-block text-[#1e3a5f] underline">Voir les événements →</a>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-[#1e3a5f] text-white">
                                    <tr>
                                        <th className="text-left px-6 py-3">Événement</th>
                                        <th className="text-left px-6 py-3">Date inscription</th>
                                        <th className="text-left px-6 py-3">Statut</th>
                                        <th className="text-left px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
    {inscriptions.map(ins => (
        <tr key={ins.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">
                {ins.evenement?.titre}
            </td>

            <td className="px-6 py-4 text-gray-500">
                {new Date(ins.created_at).toLocaleDateString('fr-FR')}
            </td>

            <td className="px-6 py-4">
                <StatutBadge statut={ins.statut} />
            </td>

            <td className="px-6 py-4">
                {ins.statut !== 'annulee' ? (
                    <button
                        onClick={() => handleAnnuler(ins.id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium"
                    >
                        Annuler
                    </button>
                ) : (
                    <span className="text-gray-300">—</span>
                )}
            </td>
        </tr>
    ))}
</tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
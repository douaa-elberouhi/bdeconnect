import { Head, router, Link } from '@inertiajs/react';

function EvenementCard({ evenement }) {
    const handleInscrire = () => {
    router.post(`/inscriptions/${evenement.id}`, {}, {
        preserveScroll: true,

        onSuccess: () => {
            router.reload();
        },

        onError: (errors) => {
            console.log(errors);
        }
    });
};
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="bg-[#1e3a5f] px-5 py-4">
                <h2 className="text-white font-bold text-lg">{evenement.titre}</h2>
            </div>
            <div className="p-5 space-y-3">
                <p className="text-gray-600 text-sm">{evenement.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <span>📅 {new Date(evenement.date_debut).toLocaleDateString('fr-FR')}</span>
                    <span>💰 {Number(evenement.prix) > 0 ? `${evenement.prix} DH` : 'Gratuit'}</span>
                </div>
                <div className={`text-sm font-semibold ${evenement.complet ? 'text-red-600' : 'text-green-600'}`}>
                    {evenement.complet ? '⛔ Complet' : `✅ ${evenement.places_restantes} place(s) disponible(s)`}
                </div>

                {evenement.dejaInscrit ? (
                    <button disabled className="w-full py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed text-sm font-medium">
                        ✓ Déjà inscrit
                    </button>
                ) : evenement.complet ? (
                    <button onClick={handleInscrire} className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                        ⏳ Liste d'attente
                    </button>
                ) : (
                    <button onClick={handleInscrire} className="w-full py-2 rounded-lg bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-sm font-medium transition-colors">
                        S'inscrire
                    </button>
                )}
            </div>
        </div>
    );
}

export default function Calendrier({ evenements }) {

    return (
        <>
            <Head title="Calendrier des événements" />
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-[#1e3a5f] text-white px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">🎓 BDEConnect</h1>
                    <div className="flex gap-4 text-sm">
                       <Link href="/calendrier" className="font-semibold underline">
                              Calendrier
                            </Link>
                               <Link href="/mes-inscriptions" className="hover:underline">
                                      Mes inscriptions
                             </Link>
                    </div>
                </nav>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">📅 Événements à venir</h2>
                    {evenements.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-5xl mb-4">📭</p>
                            <p>Aucun événement disponible.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {evenements.map(ev => <EvenementCard key={ev.id} evenement={ev} />)}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
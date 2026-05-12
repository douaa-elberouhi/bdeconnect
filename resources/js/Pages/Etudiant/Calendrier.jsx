import { Head, router } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

function EvenementCard({ evenement }) {
    const handleInscrire = () => {
        router.post(
            route('inscriptions.store', evenement.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => router.reload(),
                onError: (errors) => console.log(errors),
            },
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-4">
                <h2 className="text-lg font-bold text-white">{evenement.titre}</h2>
            </div>
            <div className="space-y-3 p-5">
                <p className="text-sm text-stone-600">{evenement.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-stone-500">
                    <span>📅 {new Date(evenement.date_debut).toLocaleDateString('fr-FR')}</span>
                    <span>💰 {Number(evenement.prix) > 0 ? `${evenement.prix} MAD` : 'Gratuit'}</span>
                </div>
                <div
                    className={`text-sm font-semibold ${evenement.complet ? 'text-red-600' : 'text-emerald-600'}`}
                >
                    {evenement.complet ? '⛔ Complet' : `✅ ${evenement.places_restantes} place(s) disponible(s)`}
                </div>

                {evenement.dejaInscrit ? (
                    <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed rounded-xl bg-stone-100 py-2.5 text-sm font-medium text-stone-500"
                    >
                        ✓ Déjà inscrit
                    </button>
                ) : evenement.complet ? (
                    <button
                        type="button"
                        onClick={handleInscrire}
                        className="w-full rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
                    >
                        ⏳ Liste d&apos;attente
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleInscrire}
                        className="w-full rounded-xl bg-stone-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
                    >
                        S&apos;inscrire
                    </button>
                )}
            </div>
        </div>
    );
}

export default function Calendrier({ evenements }) {
    return (
        <BdeConnectLayout>
            <Head title="Calendrier des événements" />
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Événements à venir</h1>
            <p className="mt-2 text-stone-600">Inscrivez-vous aux activités du BDE.</p>

            <div className="mt-8">
                {evenements.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-stone-200 bg-white py-20 text-center text-stone-400">
                        <p className="mb-4 text-5xl">📭</p>
                        <p>Aucun événement disponible.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {evenements.map((ev) => (
                            <EvenementCard key={ev.id} evenement={ev} />
                        ))}
                    </div>
                )}
            </div>
        </BdeConnectLayout>
    );
}

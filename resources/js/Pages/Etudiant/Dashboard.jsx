import { Head, Link } from '@inertiajs/react';
import BdeConnectLayout from '@/Layouts/BdeConnectLayout';

export default function Dashboard({ inscriptionsActives, prochainsEvenements }) {
    return (
        <BdeConnectLayout>
            <Head title="Accueil" />
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Bienvenue</h1>
            <p className="mt-2 text-stone-600">Retrouvez les événements du BDE et gérez vos inscriptions.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                    href={route('etudiant.calendrier')}
                    className="group rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                    <div className="text-3xl">📅</div>
                    <h2 className="mt-3 text-lg font-semibold text-stone-900">Calendrier</h2>
                    <p className="mt-1 text-sm text-stone-500">Parcourir et s&apos;inscrire aux événements</p>
                    <span className="mt-4 inline-block text-sm font-medium text-orange-600 group-hover:text-orange-700">
                        Ouvrir →
                    </span>
                </Link>
                <Link
                    href={route('etudiant.inscriptions')}
                    className="group rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
                    <div className="text-3xl">📋</div>
                    <h2 className="mt-3 text-lg font-semibold text-stone-900">Mes inscriptions</h2>
                    <p className="mt-1 text-sm text-stone-500">
                        {inscriptionsActives === 0
                            ? 'Aucune inscription en cours'
                            : `${inscriptionsActives} inscription${inscriptionsActives > 1 ? 's' : ''} active${
                                  inscriptionsActives > 1 ? 's' : ''
                              }`}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-orange-600 group-hover:text-orange-700">
                        Voir →
                    </span>
                </Link>
            </div>

            {prochainsEvenements.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-lg font-semibold text-stone-900">Prochains événements</h2>
                    <ul className="mt-4 divide-y divide-stone-100 rounded-2xl border border-stone-100 bg-white">
                        {prochainsEvenements.map((ev) => (
                            <li key={ev.id} className="flex items-center justify-between gap-4 px-4 py-3">
                                <div>
                                    <p className="font-medium text-stone-900">{ev.titre}</p>
                                    <p className="text-sm text-stone-500">
                                        {new Date(ev.date_debut).toLocaleString('fr-FR', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-medium text-stone-700">
                                    {Number(ev.prix) > 0 ? `${ev.prix} MAD` : 'Gratuit'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </BdeConnectLayout>
    );
}

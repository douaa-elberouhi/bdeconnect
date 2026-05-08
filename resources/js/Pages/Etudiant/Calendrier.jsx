import React from "react";
import { Head, router } from "@inertiajs/react";

export default function Calendrier({ evenements }) {

    const inscrire = (id) => {
        router.post(`/inscriptions/${id}`);
    };

    return (
        <>
            <Head title="Calendrier" />

            <div className="min-h-screen bg-gray-100 p-6">
                
                <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">
                    Calendrier des événements
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {evenements.map((event) => (

                        <div
                            key={event.id}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >

                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">
                                {event.titre}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {event.description}
                            </p>

                            <div className="space-y-2 mb-5">

                                <p>
                                    <span className="font-semibold">
                                        Début :
                                    </span>{" "}
                                    {event.date_debut}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Fin :
                                    </span>{" "}
                                    {event.date_fin}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Prix :
                                    </span>{" "}
                                    {event.prix} DH
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Places restantes :
                                    </span>{" "}
                                    {event.places_restantes}
                                </p>

                            </div>

                            {/* BUTTONS */}

                            {event.dejaInscrit ? (

                                <button
                                    disabled
                                    className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                                >
                                    Déjà inscrit
                                </button>

                            ) : event.complet ? (

                                <button
                                    onClick={() => inscrire(event.id)}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
                                >
                                    Liste d'attente
                                </button>

                            ) : (

                                <button
                                    onClick={() => inscrire(event.id)}
                                    className="w-full bg-[#1e3a5f] hover:bg-blue-900 text-white py-2 rounded-lg transition"
                                >
                                    S'inscrire
                                </button>

                            )}

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
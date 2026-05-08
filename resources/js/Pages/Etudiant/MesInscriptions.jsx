import React from "react";
import { Head, router } from "@inertiajs/react";

export default function MesInscriptions({ inscriptions }) {

    const annuler = (id) => {

        if (confirm("Voulez-vous annuler cette inscription ?")) {
            router.delete(`/inscriptions/${id}`);
        }
    };

    const badgeColor = (statut) => {

        switch (statut) {

            case "confirmée":
                return "bg-green-500";

            case "liste_attente":
                return "bg-orange-500";

            case "annulée":
                return "bg-red-500";

            default:
                return "bg-gray-500";
        }
    };

    return (
        <>
            <Head title="Mes Inscriptions" />

            <div className="min-h-screen bg-gray-100 p-6">

                <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">
                    Mes inscriptions
                </h1>

                <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

                    <table className="w-full">

                        <thead className="bg-[#1e3a5f] text-white">

                            <tr>
                                <th className="p-4 text-left">Événement</th>
                                <th className="p-4 text-left">Date inscription</th>
                                <th className="p-4 text-left">Statut</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {inscriptions.map((inscription) => (

                                <tr
                                    key={inscription.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {inscription.evenement.titre}
                                    </td>

                                    <td className="p-4">
                                        {inscription.date_inscription}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`${badgeColor(inscription.statut)} text-white px-3 py-1 rounded-full text-sm`}
                                        >
                                            {inscription.statut}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {(inscription.statut === "confirmée" ||
                                            inscription.statut === "liste_attente") && (

                                            <button
                                                onClick={() => annuler(inscription.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                            >
                                                Annuler
                                            </button>

                                        )}

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}
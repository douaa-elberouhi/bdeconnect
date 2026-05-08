import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ stats, graphique }) {

    const chartData = {
        labels: graphique.map(item => item.evenement),
        datasets: [{
            label: 'Inscrits confirmés',
            data: graphique.map(item => item.inscrits),
            backgroundColor: '#1e3a5f',
            borderRadius: 6,
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Inscriptions par événement'
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#1e3a5f]">
                    Tableau de bord
                </h1>
                
                    <a href="/admin/export-csv"
                    className="bg-[#dc2626] text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                    📥 Exporter CSV
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <CarteStats
                    icone="📅"
                    titre="Total événements"
                    valeur={stats.totalEvenements}
                    couleur="bg-blue-100"
                />
                <CarteStats
                    icone="👥"
                    titre="Total inscrits"
                    valeur={stats.totalInscrits}
                    couleur="bg-green-100"
                />
                <CarteStats
                    icone="🪑"
                    titre="Places libres"
                    valeur={stats.placesLibres}
                    couleur="bg-yellow-100"
                />
                <CarteStats
                    icone="🏆"
                    titre="Événement populaire"
                    valeur={stats.plusPopulaire}
                    couleur="bg-purple-100"
                    petit={true}
                />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <Bar data={chartData} options={chartOptions} />
            </div>

        </div>
    );
}

function CarteStats({ icone, titre, valeur, couleur, petit = false }) {
    return (
        <div className={`${couleur} rounded-xl shadow p-5 flex flex-col items-center`}>
            <span className="text-4xl mb-2">{icone}</span>
            <p className="text-gray-500 text-sm text-center">{titre}</p>
            <p className={`font-bold text-[#1e3a5f] text-center mt-1 ${petit ? 'text-base' : 'text-3xl'}`}>
                {valeur}
            </p>
        </div>
    );
}
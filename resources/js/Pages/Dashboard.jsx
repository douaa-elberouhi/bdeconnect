import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ stats = {}, graphique = [] }) {
    const chartData = {
        labels: graphique.map(item => item.evenement),
        datasets: [{
            label: 'Inscrits confirmes',
            data: graphique.map(item => item.inscrits),
            backgroundColor: '#1e3a5f',
            borderRadius: 6,
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Inscriptions par evenement' }
        }
    };

    return (
        <div style={{padding: '20px', background: '#f3f4f6', minHeight: '100vh'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <h1 style={{color: '#1e3a5f', fontSize: '28px', fontWeight: 'bold'}}>
                    Tableau de bord
                </h1>
                <a href="/admin/export-csv" style={{background: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none'}}>
                    Exporter CSV
                </a>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px'}}>
                <CarteStats titre="Total evenements" valeur={stats.totalEvenements ?? 0} couleur="#dbeafe" />
                <CarteStats titre="Total inscrits" valeur={stats.totalInscrits ?? 0} couleur="#dcfce7" />
                <CarteStats titre="Places libres" valeur={stats.placesLibres ?? 0} couleur="#fef9c3" />
                <CarteStats titre="Evenement populaire" valeur={stats.plusPopulaire ?? 'Aucun'} couleur="#f3e8ff" />
            </div>
            <div style={{background: 'white', borderRadius: '12px', padding: '20px'}}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

function CarteStats({ titre, valeur, couleur }) {
    return (
        <div style={{background: couleur, borderRadius: '12px', padding: '20px', textAlign: 'center'}}>
            <p style={{color: '#6b7280', fontSize: '14px'}}>{titre}</p>
            <p style={{color: '#1e3a5f', fontSize: '24px', fontWeight: 'bold'}}>{valeur}</p>
        </div>
    );
}
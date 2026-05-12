import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from '@inertiajs/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ stats, graphique }) {
    const data = {
        labels: graphique.map(item => item.evenement),
        datasets: [{
            label: 'Inscrits confirmes',
            data: graphique.map(item => item.inscrits),
            backgroundColor: '#1e3a5f',
            borderRadius: 6,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Inscriptions par evenement' }
        }
    };

    return (
        <div style={{fontFamily:'Arial', minHeight:'100vh', background:'#f3f4f6'}}>

            {/* Navigation Bar */}
            <nav style={{background:'#1e3a5f', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{color:'white', fontSize:'20px', fontWeight:'bold'}}>
                    BDEConnect
                </span>
                <div style={{display:'flex', gap:'20px'}}>
                    <a href="/admin/dashboard" style={{color:'white', textDecoration:'none', fontWeight:'bold'}}>
                        Dashboard
                    </a>
                    <a href="/admin/evenements" style={{color:'white', textDecoration:'none'}}>
                        Evenements
                    </a>
                    <a href="/calendrier" style={{color:'white', textDecoration:'none'}}>
                        Calendrier
                    </a>
                    <a href="/mes-inscriptions" style={{color:'white', textDecoration:'none'}}>
                        Mes Inscriptions
                    </a>
                    <a href="/admin/export-csv" style={{color:'#fbbf24', textDecoration:'none', fontWeight:'bold'}}>
                        Exporter CSV
                    </a>
                </div>
            </nav>

            {/* Contenu */}
            <div style={{padding:'30px'}}>
                <h1 style={{color:'#1e3a5f', fontSize:'32px', fontWeight:'bold', marginBottom:'30px'}}>
                    Tableau de bord
                </h1>

                {/* 4 Cartes */}
                <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px', marginBottom:'30px'}}>
                    <Carte titre="Total evenements" valeur={stats.totalEvenements} couleur="#dbeafe" icone="📅" />
                    <Carte titre="Total inscrits" valeur={stats.totalInscrits} couleur="#dcfce7" icone="👥" />
                    <Carte titre="Places libres" valeur={stats.placesLibres} couleur="#fef9c3" icone="🪑" />
                    <Carte titre="Evenement populaire" valeur={stats.plusPopulaire} couleur="#f3e8ff" icone="🏆" petit={true} />
                </div>

                {/* Graphique */}
                <div style={{background:'white', borderRadius:'12px', padding:'25px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

function Carte({ titre, valeur, couleur, icone, petit }) {
    return (
        <div style={{background:couleur, borderRadius:'12px', padding:'20px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'36px', marginBottom:'8px'}}>{icone}</div>
            <p style={{color:'#6b7280', fontSize:'13px', margin:'0 0 8px 0'}}>{titre}</p>
            <p style={{color:'#1e3a5f', fontSize: petit ? '16px' : '28px', fontWeight:'bold', margin:0}}>{valeur}</p>
        </div>
    );
}
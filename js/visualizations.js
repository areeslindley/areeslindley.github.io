const VisualizationManager = {
    initSkillsRadar() {
        const ctx = document.getElementById('skills-chart');
        if (!ctx || typeof Chart === 'undefined' || typeof DummyData === 'undefined') return;

        const canvas = ctx.getContext('2d');
        const skillsData = DummyData.skills;

        new Chart(canvas, {
            type: 'radar',
            data: {
                labels: skillsData.labels,
                datasets: [{
                    label: 'Proficiency Level',
                    data: skillsData.values,
                    backgroundColor: 'rgba(9, 132, 227, 0.2)',
                    borderColor: '#0984e3',
                    borderWidth: 2,
                    pointBackgroundColor: '#0984e3',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#0984e3'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            display: false,
                            stepSize: 2
                        },
                        grid: {
                            color: '#dfe6e9',
                            lineWidth: 1
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                family: 'Inter, sans-serif'
                            },
                            color: '#636e72'
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    },

    initAll() {
        if (document.getElementById('skills-chart')) {
            this.initSkillsRadar();
        }
    }
};

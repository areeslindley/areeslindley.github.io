const VisualizationManager = {
    // Skills radar chart for about page
    initSkillsRadar() {
        const ctx = document.getElementById('skills-chart');
        if (!ctx) return;
        
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
                    borderColor: 'var(--accent-color)',
                    borderWidth: 2,
                    pointBackgroundColor: 'var(--accent-color)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'var(--accent-color)'
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
                            color: 'var(--border-color)',
                            lineWidth: 1
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                family: 'Inter, sans-serif'
                            },
                            color: 'var(--secondary-color)'
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(45, 52, 54, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'var(--accent-color)',
                        borderWidth: 1
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    },
    
    // Project impact metrics with animated counters
    initProjectMetrics() {
        const metrics = document.querySelectorAll('.metric-value');
        if (metrics.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        metrics.forEach(metric => observer.observe(metric));
    },
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * this.easeOutQuart(progress));
            
            // Format numbers with appropriate suffixes
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    },
    
    // Interactive project showcase
    initProjectShowcase(projectId) {
        const container = document.getElementById(`project-${projectId}`);
        if (!container) return;
        
        const projectData = DummyData.projects[projectId];
        if (!projectData) return;
        
        // Create interactive elements based on project type
        if (projectData.type === 'ml-model') {
            this.createMLModelViz(container, projectData);
        } else if (projectData.type === 'data-analysis') {
            this.createDataAnalysisViz(container, projectData);
        }
    },
    
    createMLModelViz(container, data) {
        const vizContainer = container.querySelector('.project-visualization');
        if (!vizContainer) return;
        
        // Create confusion matrix visualization
        const confusionMatrix = data.visualizations.confusionMatrix;
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 200;
        vizContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        this.drawConfusionMatrix(ctx, confusionMatrix);
    },
    
    createDataAnalysisViz(container, data) {
        const vizContainer = container.querySelector('.project-visualization');
        if (!vizContainer) return;
        
        // Create appropriate visualization based on data type
        if (data.visualizations.priceTrends) {
            this.createPriceTrendsChart(vizContainer, data.visualizations.priceTrends);
        } else if (data.visualizations.predictionAccuracy) {
            this.createPredictionAccuracyChart(vizContainer, data.visualizations.predictionAccuracy);
        }
    },
    
    createPriceTrendsChart(container, data) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 250;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.year),
                datasets: [{
                    label: 'Average House Price (£)',
                    data: data.map(d => d.average),
                    borderColor: 'var(--accent-color)',
                    backgroundColor: 'rgba(9, 132, 227, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '£' + (value / 1000) + 'K';
                            }
                        }
                    }
                }
            }
        });
    },
    
    createPredictionAccuracyChart(container, data) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 250;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.league),
                datasets: [{
                    label: 'Prediction Accuracy (%)',
                    data: data.map(d => d.accuracy),
                    backgroundColor: 'rgba(9, 132, 227, 0.8)',
                    borderColor: 'var(--accent-color)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    },
    
    drawConfusionMatrix(ctx, matrix) {
        const cellWidth = 100;
        const cellHeight = 80;
        const startX = 50;
        const startY = 20;
        
        // Draw grid
        ctx.strokeStyle = 'var(--border-color)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i <= 2; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(startX + i * cellWidth, startY);
            ctx.lineTo(startX + i * cellWidth, startY + 2 * cellHeight);
            ctx.stroke();
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(startX, startY + i * cellHeight);
            ctx.lineTo(startX + 2 * cellWidth, startY + i * cellHeight);
            ctx.stroke();
        }
        
        // Fill cells with data
        ctx.font = '16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const x = startX + j * cellWidth + cellWidth / 2;
                const y = startY + i * cellHeight + cellHeight / 2;
                
                // Color intensity based on value
                const value = matrix[i][j];
                const intensity = value / 1000; // Normalize
                ctx.fillStyle = `rgba(9, 132, 227, ${0.2 + intensity * 0.6})`;
                ctx.fillRect(startX + j * cellWidth + 2, startY + i * cellHeight + 2, cellWidth - 4, cellHeight - 4);
                
                // Text
                ctx.fillStyle = 'var(--text-color)';
                ctx.fillText(value.toString(), x, y);
            }
        }
        
        // Labels
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = 'var(--secondary-color)';
        ctx.fillText('Predicted', startX + cellWidth, startY - 10);
        ctx.fillText('Actual', startX - 30, startY + cellHeight);
    },
    
    // Initialize all visualizations on page load
    initAll() {
        // Skills radar chart
        if (document.getElementById('skills-chart')) {
            this.initSkillsRadar();
        }
        
        // Project metrics
        this.initProjectMetrics();
        
        // Project-specific visualizations
        Object.keys(DummyData.projects).forEach(projectId => {
            this.initProjectShowcase(projectId);
        });
    }
};

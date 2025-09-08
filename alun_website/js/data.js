const DummyData = {
    skills: {
        labels: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Viz', 'Web Dev', 'Cloud Platforms'],
        values: [9, 8, 9, 8, 9, 8, 7, 7]
    },
    
    projects: {
        'predictive-analytics': {
            title: 'Predictive Analytics Platform',
            type: 'ml-model',
            metrics: {
                accuracy: 94.2,
                dataPoints: 2500000,
                modelsSaved: 847,
                processingTime: 23
            },
            technologies: ['Python', 'scikit-learn', 'PostgreSQL', 'Docker'],
            description: 'End-to-end ML pipeline for customer behavior prediction',
            visualizations: {
                confusionMatrix: [[850, 45], [32, 923]],
                featureImportance: [
                    {feature: 'Purchase History', importance: 0.34},
                    {feature: 'Session Duration', importance: 0.28},
                    {feature: 'Demographics', importance: 0.23},
                    {feature: 'Seasonal Factors', importance: 0.15}
                ]
            }
        },
        
        'financial-modeling': {
            title: 'Financial Risk Assessment',
            type: 'data-analysis',
            metrics: {
                portfolios: 1250,
                riskReduction: 32,
                roi: 187,
                clients: 45
            },
            technologies: ['R', 'Shiny', 'Monte Carlo', 'AWS'],
            description: 'Monte Carlo simulation for portfolio risk optimization',
            visualizations: {
                timeSeries: [], // Add dummy time series data
                distributions: [], // Add dummy distribution data
                correlations: [] // Add dummy correlation matrix
            }
        },
        
        'uk-house-prices': {
            title: 'UK House Prices Analysis',
            type: 'data-analysis',
            metrics: {
                dataPoints: 1500000,
                regions: 12,
                accuracy: 89.5,
                users: 2500
            },
            technologies: ['Java', 'Python', 'HTML', 'JavaScript'],
            description: 'Web application for searching and visualizing UK house price data',
            visualizations: {
                priceTrends: [
                    {year: 2020, average: 250000},
                    {year: 2021, average: 275000},
                    {year: 2022, average: 290000},
                    {year: 2023, average: 310000}
                ],
                regionalData: [
                    {region: 'London', average: 550000, growth: 8.2},
                    {region: 'Manchester', average: 180000, growth: 12.5},
                    {region: 'Birmingham', average: 165000, growth: 9.8},
                    {region: 'Leeds', average: 155000, growth: 11.2}
                ]
            }
        },
        
        'rugby-analytics': {
            title: 'Rugby Analytics System',
            type: 'data-analysis',
            metrics: {
                matches: 5000,
                predictions: 1200,
                accuracy: 78.3,
                leagues: 8
            },
            technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
            description: 'Comprehensive analytics system for rugby data analysis and prediction',
            visualizations: {
                predictionAccuracy: [
                    {league: 'Premiership', accuracy: 82.1},
                    {league: 'Championship', accuracy: 76.8},
                    {league: 'Pro14', accuracy: 79.3},
                    {league: 'Top14', accuracy: 75.2}
                ],
                seasonalTrends: [
                    {month: 'Sep', matches: 45, avgScore: 28.5},
                    {month: 'Oct', matches: 52, avgScore: 26.8},
                    {month: 'Nov', matches: 38, avgScore: 29.2},
                    {month: 'Dec', matches: 41, avgScore: 27.9}
                ]
            }
        }
    },
    
    careerTimeline: [
        {
            year: 2023,
            role: 'Senior Statistical Methodologist',
            company: 'Office for National Statistics',
            achievements: ['Led time series analysis team', 'Improved seasonal adjustment accuracy by 15%', 'Presented at international conferences'],
            metrics: { teamSize: 8, projectsLed: 15, dataProcessed: 5000000 }
        },
        {
            year: 2021,
            role: 'Senior Data Scientist',
            company: 'Government Office for Science',
            achievements: ['Built global insights platform', 'Reduced analysis time by 40%', 'Published research papers'],
            metrics: { modelsDeployed: 12, accuracy: 92, userImpact: 200000 }
        },
        {
            year: 2019,
            role: 'Data Scientist',
            company: 'Research Institute',
            achievements: ['Developed ML models for fusion research', 'Published 5 peer-reviewed papers', 'Won innovation award'],
            metrics: { papersPublished: 5, modelsCreated: 8, citations: 150 }
        }
    ],
    
    blogPosts: [
        {
            id: 'time-series-seasonal-adjustment',
            title: 'Advanced Time Series Analysis: Seasonal Adjustment Techniques',
            category: 'Statistics',
            date: '2024-01-15',
            readTime: '8 min',
            excerpt: 'Exploring modern approaches to seasonal adjustment in economic time series data, including X13-ARIMA-SEATS methodology.',
            tags: ['Time Series', 'Seasonal Adjustment', 'Statistics', 'Economics']
        },
        {
            id: 'machine-learning-production',
            title: 'From Research to Production: ML Model Deployment Best Practices',
            category: 'Machine Learning',
            date: '2024-01-08',
            readTime: '12 min',
            excerpt: 'A comprehensive guide to deploying machine learning models in production environments, covering monitoring, scaling, and maintenance.',
            tags: ['Machine Learning', 'Production', 'DevOps', 'MLOps']
        },
        {
            id: 'data-visualization-d3',
            title: 'Interactive Data Visualization with D3.js: A Practical Guide',
            category: 'Web Development',
            date: '2023-12-20',
            readTime: '15 min',
            excerpt: 'Learn how to create compelling, interactive data visualizations using D3.js, from basic charts to complex custom visualizations.',
            tags: ['D3.js', 'Data Visualization', 'JavaScript', 'Web Development']
        }
    ]
};

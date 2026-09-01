const App = {
    init() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initVisualizations();
    },

    initNavigation() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                const open = navLinks.classList.toggle('open');
                mobileMenuBtn.classList.toggle('active', open);
                mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });

            navLinks.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                });
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.focus();
                }
            });
        }
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('section, .project-card, .timeline-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    },

    initVisualizations() {
        if (typeof VisualizationManager !== 'undefined') {
            VisualizationManager.initAll();
        }
    }
};

document.addEventListener('DOMContentLoaded', App.init.bind(App));

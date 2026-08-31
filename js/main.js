const App = {
    init() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initVisualizations();
        this.initContactForm();
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
    },

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();
            const body = `From: ${name} <${email}>\n\n${message}`;
            window.location.href = `mailto:alun.rees-lindley@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
};

document.addEventListener('DOMContentLoaded', App.init.bind(App));

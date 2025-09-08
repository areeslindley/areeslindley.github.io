// Main application controller
const App = {
    init() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initVisualizations();
        this.initLazyLoading();
        this.initSmoothScrolling();
        this.initNavbarScroll();
    },
    
    initNavigation() {
        // Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                mobileMenuBtn.classList.toggle('active');
            });
        }

        // Add active class to current navigation item
        const currentLocation = location.pathname;
        const navItems = document.querySelectorAll('.nav-links a');

        navItems.forEach(item => {
            if (item.getAttribute('href') === currentLocation) {
                item.classList.add('active');
            }
        });
    },
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Initialize visualizations for visible elements
                    if (entry.target.querySelector('[id*="chart"]') || entry.target.querySelector('.project-visualization')) {
                        this.initVisualizations();
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .timeline-item, .metric-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    },
    
    initVisualizations() {
        // Initialize visualizations if VisualizationManager is available
        if (typeof VisualizationManager !== 'undefined') {
            VisualizationManager.initAll();
        }
    },
    
    initLazyLoading() {
        // Implement image lazy loading
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },
    
    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },
    
    initNavbarScroll() {
        // Add scroll-based navbar background
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                // Scroll down
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                // Scroll up
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', App.init.bind(App)); 
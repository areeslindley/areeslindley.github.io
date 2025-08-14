// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const toggle = document.getElementById('theme-toggle');
        const sunPath = toggle.querySelector('.sun');
        const moonPath = toggle.querySelector('.moon');
        
        if (this.theme === 'dark') {
            sunPath.style.display = 'none';
            moonPath.style.display = 'block';
        } else {
            sunPath.style.display = 'block';
            moonPath.style.display = 'none';
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    setupToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    }
}

// Enhanced ScrollReveal Configuration
const initScrollReveal = () => {
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        mobile: true,
        scale: 0.9
    });

    // Hero animations with stagger
    sr.reveal('.hero-content h1', { 
        delay: 200,
        distance: '80px',
        scale: 0.8
    });
    sr.reveal('.hero-content h2', { 
        delay: 400,
        distance: '60px'
    });
    sr.reveal('.hero-content p', { 
        delay: 600,
        distance: '40px'
    });
    sr.reveal('.hero-cta', { 
        delay: 800,
        distance: '40px'
    });

    // Project cards with stagger
    sr.reveal('.project-card', { 
        delay: 200,
        interval: 200,
        scale: 0.9
    });

    // Stats and skills sections
    sr.reveal('.slide-up', { 
        delay: 100,
        interval: 150,
        distance: '50px'
    });

    // Footer sections
    sr.reveal('.footer-section', { 
        delay: 100,
        interval: 100,
        distance: '30px'
    });
};

// Enhanced Mobile Menu
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menuBtn || !this.navLinks) return;
        
        this.menuBtn.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking on nav links
        this.navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                this.close();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menuBtn.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.close();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.menuBtn.classList.add('active');
        this.navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.menuBtn.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced Navbar Scroll Effects
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > this.lastScroll && currentScroll > 200) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
        }

        this.lastScroll = currentScroll;
    }
}

// Enhanced Navigation Active States
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setActiveNavItem();
        this.setupSmoothScrolling();
    }

    setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.includes('/index.html') && linkPath === '/')) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        if (!window.IntersectionObserver) return;

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

        // Observe fade-in and slide-up elements
        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
            observer.observe(el);
        });
    }
}

// Performance Optimization: Lazy Loading
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Enhanced Button Interactions
class ButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.createRipple);
        });

        // Add hover sound effect (optional)
        document.querySelectorAll('.btn, .nav-links a').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-2px)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    createRipple(e) {
        const button = e.target.closest('.btn');
        if (!button) return;

        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        if (window.innerWidth < 768) return; // Disable on mobile for performance

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero::before');

            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, { passive: true });
    }
}

// Loading Screen
class LoadingScreen {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Remove any loading overlays
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new MobileMenu();
    new NavbarScroll();
    new NavigationManager();
    new AnimationObserver();
    new LazyLoader();
    new ButtonEffects();
    new ParallaxEffects();
    new LoadingScreen();
    
    // Initialize ScrollReveal after a short delay
    setTimeout(() => {
        initScrollReveal();
    }, 100);

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Add CSS for ripple animation
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance monitoring (optional)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
} 
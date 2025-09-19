// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('theme-toggle');

    // Restore theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (storedTheme === 'light') {
        document.body.classList.add('light-forced');
    }
    updateThemeToggleIcon();
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(!expanded));
        });
    }

    // Theme toggle handler
    function updateThemeToggleIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.add('fa-moon');
            icon.classList.remove('fa-sun');
        }
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            if (isDark) {
                document.body.classList.remove('light-forced');
                localStorage.setItem('theme', 'dark');
            } else {
                // Distinguish explicit light choice from system preference dark
                document.body.classList.add('light-forced');
                localStorage.setItem('theme', 'light');
            }
            updateThemeToggleIcon();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.research-card, .education-item, .contact-item');
    animatedElements.forEach(el => observer.observe(el));

    // Future: make publication abstracts collapsible (placeholder logic)
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        const abstract = card.querySelector('.publication-abstract');
        if (abstract) {
            abstract.setAttribute('data-expanded', 'true');
            // Placeholder for future collapsible behavior
        }
    });
});

// Add CSS for mobile menu and animations
const additionalCSS = `
.nav-menu.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    border-radius: 0 0 8px 8px;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.nav-link.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.header {
    transition: transform 0.3s ease;
}

.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-menu.active {
        display: flex;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', function() {
    // Theme Switching Functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Set initial theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-theme';
    body.className = savedTheme;
    
    // Set active button
    document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`).classList.add('active');
    
    // Theme switching
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Set new theme
            body.className = theme;
            this.classList.add('active');
            
            // Save to localStorage
            localStorage.setItem('portfolio-theme', theme);
            
            // Update background circles color
            updateCircleColors(theme);
        });
    });
    
    // Update circle colors based on theme
    function updateCircleColors(theme) {
        const circles = document.querySelectorAll('.circle');
        let color;
        
        switch(theme) {
            case 'light-theme':
                color = 'rgba(79, 28, 81, 0.1)';
                break;
            case 'purple-theme':
                color = 'rgba(79, 28, 81, 0.2)';
                break;
            case 'lavender-theme':
                color = 'rgba(216, 180, 226, 0.2)';
                break;
            case 'blue-theme':
                color = 'rgba(189, 221, 252, 0.2)';
                break;
            default: // dark-theme
                color = 'rgba(67, 97, 238, 0.1)';
        }
        
        circles.forEach(circle => {
            circle.style.background = color;
        });
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.hero, .skill-category, .education-item, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.hero, .skill-category, .education-item, .contact-container');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Run animations
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Formspree handles the submission automatically
        // This just provides visual feedback
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

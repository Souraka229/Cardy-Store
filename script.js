// Navigation Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Search Toggle
const searchToggle = document.querySelector('.search-toggle');
const searchBox = document.querySelector('.search-box');

if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', () => {
        searchBox.classList.toggle('active');
    });
}

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (searchBox && searchBox.classList.contains('active') && 
        !searchBox.contains(e.target) && 
        !searchToggle.contains(e.target)) {
        searchBox.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Sticky header animation
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.background = 'var(--primary-blue)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'var(--gradient-blue)';
    }
});

// Product filtering
const filterSelect = document.querySelector('.filter-select');
if (filterSelect) {
    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Product sorting
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const productsContainer = document.querySelector('.products-grid');
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        
        productCards.sort((a, b) => {
            if (sortBy === 'price-asc') {
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            } else if (sortBy === 'price-desc') {
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            } else if (sortBy === 'name') {
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            }
            return 0;
        });
        
        // Clear and re-append sorted products
        productsContainer.innerHTML = '';
        productCards.forEach(card => {
            productsContainer.appendChild(card);
        });
    });
}

// Add to cart functionality
const buyButtons = document.querySelectorAll('.buy-btn');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

if (buyButtons.length && cartCount) {
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation feedback
            button.textContent = 'Ajouté !';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Acheter';
                button.style.backgroundColor = '';
            }, 1500);
        });
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--accent-red)';
            } else {
                field.style.borderColor = '';
            }
        });
        
        // Email validation
        const emailField = this.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'var(--accent-red)';
            }
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Merci ! Votre message a été envoyé avec succès.');
                this.reset();
                submitBtn.textContent = 'Envoyer';
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            
            // Toggle active class
            answer.classList.toggle('active');
            
            // Change icon
            if (answer.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
        });
    });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Set current year in footer
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});
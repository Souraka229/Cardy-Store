// Simple product carousel functionality
class SimpleCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.items = this.container.querySelectorAll('.product-card');
        this.currentIndex = 0;
        this.autoPlay = options.autoPlay || false;
        this.interval = options.interval || 5000;
        this.visibleItems = this.calculateVisibleItems();
        
        this.init();
    }
    
    calculateVisibleItems() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }
    
    init() {
        this.setupCarousel();
        this.addNavigation();
        
        if (this.autoPlay) {
            this.startAutoPlay();
        }
        
        window.addEventListener('resize', () => {
            this.visibleItems = this.calculateVisibleItems();
            this.updateCarousel();
        });
    }
    
    setupCarousel() {
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'carousel-wrapper';
        this.wrapper.style.display = 'flex';
        this.wrapper.style.transition = 'transform 0.5s ease';
        
        // Move items to wrapper
        while (this.container.firstChild) {
            this.wrapper.appendChild(this.container.firstChild);
        }
        
        this.container.appendChild(this.wrapper);
        
        this.updateCarousel();
    }
    
    addNavigation() {
        // Previous button
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'carousel-btn carousel-prev';
        this.prevBtn.innerHTML = '&#10094;';
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Next button
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'carousel-btn carousel-next';
        this.nextBtn.innerHTML = '&#10095;';
        this.nextBtn.addEventListener('click', () => this.next());
        
        this.container.appendChild(this.prevBtn);
        this.container.appendChild(this.nextBtn);
        
        this.updateNavigation();
    }
    
    updateCarousel() {
        const itemWidth = 100 / this.visibleItems;
        this.items.forEach(item => {
            item.style.flex = `0 0 ${itemWidth}%`;
        });
        
        this.moveTo(this.currentIndex);
        this.updateNavigation();
    }
    
    updateNavigation() {
        // Hide prev button if at start
        this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'block';
        
        // Hide next button if at end
        const maxIndex = Math.max(0, this.items.length - this.visibleItems);
        this.nextBtn.style.display = this.currentIndex >= maxIndex ? 'none' : 'block';
    }
    
    next() {
        if (this.currentIndex < this.items.length - this.visibleItems) {
            this.currentIndex++;
            this.moveTo(this.currentIndex);
            this.updateNavigation();
            
            if (this.autoPlay) {
                this.restartAutoPlay();
            }
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.moveTo(this.currentIndex);
            this.updateNavigation();
            
            if (this.autoPlay) {
                this.restartAutoPlay();
            }
        }
    }
    
    moveTo(index) {
        const translateX = -index * (100 / this.visibleItems);
        this.wrapper.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.items.length - this.visibleItems) {
                this.next();
            } else {
                this.currentIndex = 0;
                this.moveTo(this.currentIndex);
                this.updateNavigation();
            }
        }, this.interval);
    }
    
    restartAutoPlay() {
        if (this.autoPlay) {
            clearInterval(this.autoPlayInterval);
            this.startAutoPlay();
        }
    }
}

// Initialize carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize products carousel if needed
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid && productsGrid.children.length > 3) {
        new SimpleCarousel
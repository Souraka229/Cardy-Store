document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideTimes = [5000, 10000, 15000]; // 5s, 10s, 15s

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            indicators[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideTimes[currentSlide]);
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideTimes[currentSlide]);
    });

    nextButton.addEventListener('click', nextSlide);

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideTimes[currentSlide]);
        });
    });

    let autoSlide = setInterval(nextSlide, slideTimes[currentSlide]);
    showSlide(currentSlide);
});
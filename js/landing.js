document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. 3D FLIP CARDS INTERACTION
       ========================================== */
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });


    /* ==========================================
       2. VIDEO CAROUSEL LOGIC
       ========================================== */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (track && slides.length > 0) {
        let currentIndex = 0;

        // Create Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, slides.length - 1));
            updateCarousel();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) goToSlide(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
            });
        }

        // Touch Swipe Support
        let startX = 0;
        let endX = 0;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0 && currentIndex < slides.length - 1) {
                    goToSlide(currentIndex + 1);
                } else if (diffX < 0 && currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            }
        }, { passive: true });

        updateCarousel();
    }

});

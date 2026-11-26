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

        // Create Dots if dotsContainer exists
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

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

    /* ==========================================
       3. HERO SCREENSHOT TOGGLE
       ========================================== */
    function initHeroToggle() {
        const heroImg = document.getElementById('hero-preview-img');
        if (heroImg && !heroImg.dataset.toggleInitialized) {
            heroImg.dataset.toggleInitialized = 'true';
            heroImg.style.cursor = 'pointer';
            heroImg.addEventListener('click', (e) => {
                e.preventDefault();
                const currentSrc = heroImg.getAttribute('src');
                const altSrc = heroImg.getAttribute('data-alt-src');
                if (altSrc) {
                    heroImg.setAttribute('src', altSrc);
                    heroImg.setAttribute('data-alt-src', currentSrc);
                    heroImg.src = altSrc;
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroToggle);
    } else {
        initHeroToggle();
    }

    /* ==========================================
       4. DYNAMIC APP UPDATES FROM JSON
       ========================================== */
    function loadAppUpdates() {
        const updateElements = document.querySelectorAll('.app-update-info[data-update-app]');
        if (updateElements.length === 0) return;

        const isNested = window.location.pathname.includes('/apps/');
        const jsonPath = isNested ? '../updates.json' : 'updates.json';

        const fallbackData = [
            {
                "app": "alphabet-for-kids",
                "date": "2026-11-26",
                "commentUkr": "Виправлення в модулі генерації уроків та покращення стабільності.",
                "commentEng": "Bug fixes in the lesson generation module and performance improvements."
            },
            {
                "app": "narbut-alphabet",
                "date": "2026-11-24",
                "commentUkr": "Застосунок в процесі публікації (перевірка магазином).",
                "commentEng": "App is currently under review for publication."
            }
        ];

        function renderUpdates(data) {
            updateElements.forEach(el => {
                const appName = el.getAttribute('data-update-app');
                const updateObj = data.find(item => item.app === appName);
                if (updateObj) {
                    const lang = document.documentElement.lang || 'uk';
                    const comment = lang === 'en' ? updateObj.commentEng : updateObj.commentUkr;
                    const labelDate = lang === 'en' ? 'Last update' : 'Останнє оновлення';
                    el.innerHTML = `📅 <strong>${labelDate}:</strong> ${updateObj.date} — ${comment}`;
                }
            });
        }

        fetch(jsonPath)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => renderUpdates(data))
            .catch(err => {
                console.warn('Using fallback updates data due to fetch error (likely file:// CORS):', err);
                renderUpdates(fallbackData);
            });
    }
            })
            .catch(err => console.error('Failed to load updates.json:', err));
    }

    loadAppUpdates();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(loadAppUpdates, 50);
        });
    });

});

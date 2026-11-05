(function () {
    const STORAGE_KEY = 'hrosoft_site_lang';
    let currentLang = localStorage.getItem(STORAGE_KEY) || 'uk';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        // Toggle visibility for elements with data-lang attribute
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(el => {
            if (el.getAttribute('data-lang') === lang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });

        // Update active class on language switcher buttons
        const btnUk = document.querySelectorAll('.lang-btn-uk');
        const btnEn = document.querySelectorAll('.lang-btn-en');

        btnUk.forEach(b => b.classList.toggle('active', lang === 'uk'));
        btnEn.forEach(b => b.classList.toggle('active', lang === 'en'));
    }

    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(currentLang);

        document.querySelectorAll('.lang-btn-uk').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                setLanguage('uk');
            });
        });

        document.querySelectorAll('.lang-btn-en').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                setLanguage('en');
            });
        });
    });
})();

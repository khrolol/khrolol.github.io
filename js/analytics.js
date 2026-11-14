/* HroSoft Analytics Wrapper for GTM & GA4 with automatic UTM capture */
(function() {
    // Parse and persist UTM parameters in sessionStorage
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
        utmKeys.forEach(key => {
            if (urlParams.has(key)) {
                sessionStorage.setItem('hrosoft_' + key, urlParams.get(key));
            }
        });
    } catch (e) {
        console.warn('[Analytics] Failed to parse URL parameters:', e);
    }
})();

window.HroSoftAnalytics = {
    // Get stored UTM parameters
    getUtmParams: function() {
        const params = {};
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
        utmKeys.forEach(key => {
            const val = sessionStorage.getItem('hrosoft_' + key);
            if (val) {
                params[key] = val;
            }
        });
        return params;
    },

    trackEvent: function(eventName, eventParams = {}) {
        eventParams.site_lang = localStorage.getItem('hrosoft_site_lang') || 'uk';

        // Attach UTM parameters automatically
        const utmParams = this.getUtmParams();
        Object.assign(eventParams, utmParams);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...eventParams
        });
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, eventParams);
        }
        console.log(`[Analytics Event] ${eventName}`, eventParams);
    },

    trackGooglePlayClick: function(location) {
        this.trackEvent('click_google_play', { btn_location: location });
    },

    trackFlipCard: function(cardTitle) {
        this.trackEvent('flip_card_click', { card_title: cardTitle });
    },

    trackVideoPlay: function(slideIndex, slideTitle) {
        this.trackEvent('video_play_click', { slide_index: slideIndex, slide_title: slideTitle });
    }
};

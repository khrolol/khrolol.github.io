/* HroSoft Analytics Wrapper for GTM & GA4 */
window.HroSoftAnalytics = {
    trackEvent: function(eventName, eventParams = {}) {
        eventParams.site_lang = localStorage.getItem('hrosoft_site_lang') || 'uk';
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

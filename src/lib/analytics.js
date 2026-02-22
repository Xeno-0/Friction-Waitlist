import { supabase } from './supabase';

const VISITOR_ID_KEY = 'friction_visitor_id';

/**
 * Generates or retrieves a unique visitor ID from localStorage.
 */
const getVisitorId = () => {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
};

/**
 * Logs a page view to Supabase.
 */
export const trackPageView = async () => {
    const visitor_id = getVisitorId();
    const path = window.location.pathname;
    const user_agent = navigator.userAgent;
    const referrer = document.referrer;

    try {
        const { error } = await supabase
            .from('page_views')
            .insert([{
                visitor_id,
                path,
                user_agent,
                referrer
            }]);

        if (error) {
            // Silently fail to not disrupt user experience
            console.warn('Analytics failed:', error.message);
        }
    } catch (err) {
        console.warn('Analytics error:', err);
    }
};

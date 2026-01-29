/**
 * LocalStorage Wrapper Service
 * 
 * Provides a safe and typed way to interact with browser storage.
 * Handles JSON parsing/stringifying automatically and prevents crashes.
 */

export const storageService = {
    /**
     * Retrieve data from localStorage
     * @param {string} key - The key to retrieve
     * @param {any} defaultValue - Value to return if key doesn't exist or error occurs
     * @returns {any} The parsed data or default value
     */
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);

            // Return default if null or undefined
            if (item === null || item === undefined) {
                return defaultValue;
            }

            // Attempt to parse JSON
            // We check for "string" "true" "false" or numbers to handle non-JSON values gracefully
            if (item === 'true') return true;
            if (item === 'false') return false;
            // Check if it looks like a JSON object or array
            if (item.startsWith('{') || item.startsWith('[')) {
                return JSON.parse(item);
            }

            // Return as string if not JSON
            return item;
        } catch (error) {
            console.warn(`[Storage] Error reading key "${key}":`, error);
            return defaultValue;
        }
    },

    /**
     * Save data to localStorage
     * @param {string} key - Key to store under
     * @param {any} value - Data to store (will be stringified if object)
     */
    set: (key, value) => {
        try {
            if (value === null || value === undefined) {
                localStorage.removeItem(key);
                return;
            }

            const storedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
            localStorage.setItem(key, storedValue);
        } catch (error) {
            console.error(`[Storage] Error saving key "${key}":`, error);
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key 
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`[Storage] Error removing key "${key}":`, error);
        }
    },

    /**
     * Clear all app-specific keys (optional filter)
     */
    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('[Storage] Clear failed', e);
        }
    }
};

// Keys constants to avoid typos
export const STORAGE_KEYS = {
    USER: 'tiktok_user',
    AUTH_TOKEN: 'tiktok_auth_token',
    REFRESH_TOKEN: 'tiktok_refresh_token',
    PREFERENCES: 'user_preferences',
    PAYMENT_METHODS: 'tiktok_payment_methods'
};

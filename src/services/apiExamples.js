/**
 * Example usage of tokenService with API calls
 */

import { tokenService, apiWithRetry } from './tokenService';

// Example: Protected API call with automatic retry
export const exampleApiCalls = {
    // Get user data with auto-retry on 401
    getUserData: async () => {
        return await apiWithRetry(async () => {
            const token = tokenService.getToken();

            // Simulate API call
            const response = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: response.statusText
                };
            }

            return await response.json();
        });
    },

    // Create ad with auto-retry
    createAd: async (adData) => {
        return await apiWithRetry(async () => {
            const token = tokenService.getToken();

            const response = await fetch('/api/ads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adData)
            });

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: response.statusText
                };
            }

            return await response.json();
        });
    },

    // Manually trigger token refresh (for testing)
    testTokenRefresh: async () => {
        try {
            const newToken = await tokenService.refreshAccessToken();
            console.log('✅ Token refreshed successfully:', newToken);
            return { success: true, token: newToken };
        } catch (error) {
            console.error('❌ Token refresh failed:', error);

            // Dispatch auth error event to trigger global handler
            window.dispatchEvent(new CustomEvent('authError', {
                detail: {
                    status: 401,
                    message: 'Failed to refresh token. Please log in again.'
                }
            }));

            throw error;
        }
    },

    // Simulate expired token scenario
    simulateExpiredToken: () => {
        // Set token expiry to past
        localStorage.setItem('tiktok_token_expiry', (Date.now() - 1000).toString());
        console.log('🔴 Token marked as expired');

        // Trigger auth error
        window.dispatchEvent(new CustomEvent('authError', {
            detail: {
                status: 401,
                message: 'Expired or revoked token. Please reconnect.'
            }
        }));
    }
};

// Export for easy console testing
if (typeof window !== 'undefined') {
    window.tokenService = tokenService;
    window.apiDemo = exampleApiCalls;
}

/**
 * Token Management & Error Handling Service
 */

const TOKEN_KEY = 'tiktok_auth_token';
const TOKEN_EXPIRY_KEY = 'tiktok_token_expiry';
const REFRESH_TOKEN_KEY = 'tiktok_refresh_token';

export const tokenService = {
    // Store tokens with expiry
    setTokens: (accessToken, refreshToken = null, expiresIn = 3600) => {
        const expiryTime = Date.now() + (expiresIn * 1000);
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
    },

    // Get access token
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    // Check if token is expired
    isTokenExpired: () => {
        const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
        if (!expiry) return true;
        return Date.now() > parseInt(expiry);
    },

    // Clear all tokens (logout)
    clearTokens: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem('tiktok_user');
    },

    // Simulate token refresh
    refreshAccessToken: async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In real app, this would call: POST /api/auth/refresh
        const newAccessToken = 'mock_token_' + Date.now();
        const newRefreshToken = 'mock_refresh_' + Date.now();

        tokenService.setTokens(newAccessToken, newRefreshToken, 3600);
        return newAccessToken;
    },

    // Handle API errors with automatic token refresh
    handleApiError: async (error, retryCallback) => {
        // Check if it's a 401 Unauthorized error
        if (error.status === 401 || error.message?.includes('401')) {
            try {
                // Try to refresh the token
                await tokenService.refreshAccessToken();
                // Retry the original request
                if (retryCallback) {
                    return await retryCallback();
                }
            } catch (refreshError) {
                // Refresh failed, need to re-authenticate
                tokenService.clearTokens();
                throw {
                    status: 401,
                    message: 'Your session has expired. Please log in again.',
                    shouldRedirect: true,
                    redirectTo: '/login'
                };
            }
        }

        // Not a token error, throw original
        throw error;
    }
};

// API wrapper with automatic retry on 401
export const apiWithRetry = async (apiCall) => {
    try {
        // Check token before making request
        if (tokenService.isTokenExpired()) {
            try {
                await tokenService.refreshAccessToken();
            } catch (e) {
                tokenService.clearTokens();
                throw {
                    status: 401,
                    message: 'Your session has expired. Please log in again.',
                    shouldRedirect: true,
                    redirectTo: '/login'
                };
            }
        }

        return await apiCall();
    } catch (error) {
        return await tokenService.handleApiError(error, apiCall);
    }
};

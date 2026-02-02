/**
 * TikTok Ads API Simulation Service
 * 
 * In a real-world scenario, these would be calls to the TikTok Marketing API.
 * This mock service simulates network latency, geo-restrictions, and authentication errors.
 */

import { tokenService } from './tokenService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tiktokApi = {
    // Simulate OAuth redirect URL generation
    getAuthUrl: () => {
        const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID || 'mock_client_id';
        const redirectUri = window.location.origin + '/oauth/callback';
        return `https://ads.tiktok.com/marketing_api/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=ads.manage&response_type=code`;
    },

    // Simulate token exchange
    exchangeToken: async (code) => {
        await delay(1500);

        // Simulation logic - Deterministic Errors for Demo
        if (code === 'error_invalid_client') {
            throw { status: 400, message: 'Invalid client ID or secret' };
        }
        if (code === 'error_denied') {
            throw { status: 403, message: 'Missing Ads permission scope' };
        }
        if (code === 'error_geo') {
            throw { status: 403, message: 'Account geo-restricted (403)' };
        }
        if (code === 'error_expired') {
            throw { status: 401, message: 'Authorization code expired' };
        }

        const mockToken = 'tt_access_token_' + Math.random().toString(36).substr(2, 9);
        // We set tokens here using our service now
        tokenService.setTokens(mockToken, 'mock_refresh_' + Date.now());

        return { access_token: mockToken, expires_in: 86400 };
    },

    // Validate Music ID
    validateMusic: async (musicId) => {
        await delay(1000);

        // Simulate some "bad" IDs for testing
        const invalidIds = ['123', '000', 'invalid'];
        if (invalidIds.includes(musicId.toLowerCase())) {
            throw {
                status: 400,
                message: 'Invalid Music ID. The music is either copyrighted or not available in your region.',
                code: 'MUSIC_NOT_FOUND'
            };
        }

        return { valid: true, id: musicId, title: 'Trending TikTok Hit' };
    },

    // Upload Music (Mock)
    uploadMusic: async (file) => {
        await delay(2000);

        // Deterministic Error: Filename contains "error"
        if (file.name.toLowerCase().includes('error')) {
            throw { status: 403, message: 'Music upload restricted: Copyright infringement detected.' };
        }

        return { music_id: 'mock_music_' + Date.now() };
    },

    // Submit Ad
    createAd: async (adData) => {
        await delay(2000);

        const token = tokenService.getToken();
        if (!token) {
            throw { status: 401, message: 'Expired or revoked token. Please reconnect.' };
        }

        // Business Logic Simulation
        if (adData.objective === 'CONVERSIONS' && !adData.musicId && adData.musicOption !== 'none') {
            throw { status: 400, message: 'Music is mandatory for Conversion campaigns.' };
        }

        // Deterministic Error Simulation based on Campaign Name
        const name = adData.campaignName.toLowerCase();

        if (name.includes('geo_error')) {
            throw { status: 403, message: 'Account geo-restricted from creating ads in this region.' };
        }
        if (name.includes('auth_error')) {
            tokenService.clearTokens(); // Force logout
            throw { status: 401, message: 'Session expired. Please reconnect your account.' };
        }
        if (name.includes('server_error')) {
            throw { status: 500, message: 'Internal TikTok API Error. Please try again later.' };
        }
        if (name.includes('limit_error')) {
            throw { status: 429, message: 'Daily ad creation limit reached for this account tier.' };
        }

        return { success: true, ad_id: 'ad_' + Date.now(), status: 'PENDING_REVIEW' };
    }
};

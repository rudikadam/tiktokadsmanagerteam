/**
 * OTP Service Simulation
 * 
 * Simulates sending an OTP to a phone/email and verifying it.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const otpService = {
    // Simulate sending OTP
    sendOTP: async (identifier) => {
        await delay(1200);
        // 5% chance of failure
        if (Math.random() < 0.05) {
            throw { status: 500, message: 'Failed to send OTP. Please try again.' };
        }
        console.log(`[Mock] OTP sent to ${identifier}: 123456`);
        return { success: true, message: 'OTP sent successfully' };
    },

    // Simulate verifying OTP
    verifyOTP: async (identifier, code) => {
        await delay(1000);
        // Hardcoded mock code
        if (code === '123456') {
            return { success: true, token: 'otp_verified_' + Math.random().toString(36).substr(2) };
        } else {
            throw { status: 400, message: 'Invalid OTP code. Please try again.' };
        }
    }
};

/**
 * Auth API Simulation Service
 * 
 * Simulates SMS/Email OTP generation and validation.
 * In a real application, this would call a backend service like Firebase Auth, Twilio, or SendGrid.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
    // Simulate sending OTP
    sendOtp: async (contact, type = 'phone') => {
        await delay(1500); // Network latency

        // Basic validation
        if (!contact) throw { message: `Please enter a valid ${type}.` };

        if (type === 'email' && !contact.includes('@')) {
            throw { message: 'Invalid email address.' };
        }
        if (type === 'phone' && contact.length < 10) {
            throw { message: 'Invalid phone number.' };
        }

        // Check for existing user
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const existing = users.find(u => u.contact === contact);
        if (existing) {
            throw { message: 'Account already exists. Please Log In.' };
        }

        // Mock OTP generation
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store in localStorage for verification (Simulation only)
        localStorage.setItem(`mock_otp_${contact}`, otp);

        console.log(`[MOCK SERVER] OTP for ${contact}: ${otp}`);

        // Return success with a "hint" for the demo user
        return {
            success: true,
            message: `OTP sent successfully to ${contact}`,
            // In a real app, you wouldn't return the code! 
            debug_code: otp
        };
    },

    // Verify OTP
    verifyOtp: async (contact, code) => {
        await delay(1000);

        const validOtp = localStorage.getItem(`mock_otp_${contact}`);

        if (!validOtp) {
            throw { message: 'OTP expired or not requested.' };
        }

        if (code !== validOtp && code !== '123456') { // Allow '123456' as master code for ease
            throw { message: 'Invalid authentication code.' };
        }

        // Cleanup
        localStorage.removeItem(`mock_otp_${contact}`);

        return {
            success: true,
            // Just verifying contact, not full login yet in new flow
            verified: true
        };
    },

    // Simple Login (No OTP required for existing users)
    login: async (credentials) => {
        await delay(1500);
        if (!credentials.contact || !credentials.password) {
            throw { message: 'Please enter both contact and password.' };
        }

        // Check mock DB first
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const user = users.find(u => u.contact === credentials.contact);

        if (user) {
            if (user.password !== credentials.password) {
                throw { message: 'Invalid password.' };
            }
            // Set active profile
            localStorage.setItem('user_profile', JSON.stringify({
                name: user.fullName,
                email: user.contact,
                photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`,
                adsCreated: user.adsCreated || 0,
                score: user.score || 50
            }));

            return {
                success: true,
                token: 'mock_jwt_login_' + Date.now(),
                user: { id: user.id, name: user.fullName }
            };
        }

        // Mock validation fallback
        if (credentials.password !== 'password') {
            throw { message: 'Invalid password. (Hint: use "password")' };
        }

        // Default test user
        localStorage.setItem('user_profile', JSON.stringify({
            name: 'Test User',
            email: credentials.contact,
            photoUrl: null,
            adsCreated: 0,
            score: 50
        }));

        return {
            success: true,
            token: 'mock_jwt_login_' + Date.now(),
            user: { id: 'user_1', name: 'Test User' }
        };
    },

    // Final Registration
    register: async (userData) => {
        await delay(2000);

        // Create new user profile
        const newUser = {
            id: 'user_' + Date.now(),
            ...userData, // contact, method, fullName, password, dateOfBirth
            joinedAt: new Date().toISOString()
        };

        // Save to mock DB
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        users.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(users));

        // Set active profile for the session
        localStorage.setItem('user_profile', JSON.stringify({
            name: newUser.fullName,
            email: newUser.contact,
            photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.fullName)}&background=random`,
            adsCreated: 0,
            score: 50
        }));

        return { success: true, message: 'Account created successfully!' };
    }
};

/**
 * Mock Google API to simulate protected endpoint behavior.
 * Used for testing Error Boundary and Token Expiry logic.
 */

export const mockGoogleApi = (token) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Check if token exists
            if (!token) {
                reject({
                    status: 401,
                    message: "Unauthorized: No token provided"
                });
                return;
            }

            // Simulate expired token scenario
            if (token === 'expired_token') {
                reject({
                    status: 401,
                    message: "Unauthorized: Token expired"
                });
                return;
            }

            // Success case
            resolve({
                status: 200,
                data: {
                    message: "✅ Google API Data Retrieved Successfully!",
                    user: "Google User",
                    timestamp: new Date().toISOString()
                }
            });
        }, 1000); // 1 second delay
    });
};

/**
 * Billing & Payment Simulation Service
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const billingApi = {
    // Fetch payment methods
    getPaymentMethods: async () => {
        await delay(1200);
        const methods = JSON.parse(localStorage.getItem('tiktok_payment_methods') || '[]');
        if (methods.length === 0) {
            // Return a default card if none exists
            return [{
                id: 'pm_default_4242',
                type: 'VISA',
                last4: '4242',
                expiry: '12/28',
                isPrimary: true
            }];
        }
        return methods;
    },

    // Add a new payment method
    addPaymentMethod: async (cardData) => {
        await delay(2000);

        // Simulate validation
        if (cardData.number && cardData.number.includes('0000')) {
            throw { status: 402, message: 'Card declined: Insufficient funds or invalid card.' };
        }

        const methods = JSON.parse(localStorage.getItem('tiktok_payment_methods') || '[]');
        const newMethod = {
            id: 'pm_' + Date.now(),
            type: cardData.type || 'VISA',
            last4: cardData.number ? cardData.number.slice(-4) : '8888',
            expiry: cardData.expiry || '01/29',
            isPrimary: methods.length === 0
        };

        methods.push(newMethod);
        localStorage.setItem('tiktok_payment_methods', JSON.stringify(methods));
        return newMethod;
    },

    // Fetch billing history
    getBillingHistory: async () => {
        await delay(1000);
        const history = JSON.parse(localStorage.getItem('tiktok_billing_history') || '[]');
        if (history.length === 0) {
            return [
                { id: 'inv_101', date: '2024-01-15', amount: '$49.00', status: 'PAID', plan: 'Premium Pro' },
                { id: 'inv_102', date: '2023-12-15', amount: '$49.00', status: 'PAID', plan: 'Premium Pro' }
            ];
        }
        return history;
    },

    // Record a new payment
    recordPayment: async (data) => {
        await delay(500);
        const history = JSON.parse(localStorage.getItem('tiktok_billing_history') || '[]');
        const newInvoice = {
            id: 'INV_' + Math.floor(Math.random() * 9000 + 1000),
            date: new Date().toISOString().split('T')[0],
            amount: '$' + data.amount,
            status: 'PAID',
            plan: data.campaignName || 'Ad Campaign'
        };
        history.unshift(newInvoice);
        localStorage.setItem('tiktok_billing_history', JSON.stringify(history));
        return newInvoice;
    },

    // Get Subscription Status
    getSubscription: async () => {
        await delay(800);
        return {
            plan: 'Premium Pro',
            price: '$49/mo',
            usage: {
                aiTokens: 85,
                storage: 42
            },
            nextBilling: '2024-02-15'
        };
    }
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Smartphone,
    ArrowRight,
    Loader2,
    CheckCircle2,
    ShieldCheck,
    Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../services/authApi';

const Register = ({ onLogin }) => {
    const navigate = useNavigate();
    const [method, setMethod] = useState('email'); // 'email' or 'phone'
    const [step, setStep] = useState('input'); // 'input', 'verify', 'details'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form data
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [userDetails, setUserDetails] = useState({ fullName: '', password: '', dateOfBirth: '' });

    // Mock OTP for display (since we can't actually send SMS)
    const [demoOtp, setDemoOtp] = useState(null);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setDemoOtp(null);

        try {
            const res = await authApi.sendOtp(contact, method);
            setStep('verify');
            setDemoOtp(res.debug_code); // Show for demo purposes
        } catch (err) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authApi.verifyOtp(contact, otp);
            setStep('details');
        } catch (err) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authApi.register({ ...userDetails, contact, method });
            // Auto login logic
            localStorage.setItem('tiktok_token', 'mock_registered_token');
            if (onLogin) onLogin();
            navigate('/create-ad');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {demoOtp && step === 'verify' && (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider">Demo Mode</p>
                            <p className="text-sm">Your verification code is: <span className="font-mono font-bold bg-black/20 px-2 py-0.5 rounded">{demoOtp}</span></p>
                        </div>
                    </motion.div>
                )}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-cyan/10 blur-[50px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-tiktok-pink/10 blur-[50px] rounded-full pointer-events-none" />

                    <div className="relative mb-8 text-center">
                        <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
                        <p className="text-gray-400 text-sm">Join to create amazing ad campaigns</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-2 p-1 bg-black/20 rounded-2xl">
                                    <button
                                        onClick={() => { setMethod('email'); setError(''); }}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${method === 'email' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <Mail className="w-4 h-4" /> Email
                                    </button>
                                    <button
                                        onClick={() => { setMethod('phone'); setError(''); }}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${method === 'phone' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        <Smartphone className="w-4 h-4" /> Phone
                                    </button>
                                </div>

                                <form onSubmit={handleSendOtp} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">
                                            {method === 'email' ? 'Email Address' : 'Phone Number'}
                                        </label>
                                        <input
                                            type={method === 'email' ? 'email' : 'tel'}
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            placeholder={method === 'email' ? 'name@example.com' : '+1 (555) 000-0000'}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all text-lg"
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Code <ArrowRight className="w-5 h-5" /></>}
                                    </button>

                                    <p className="text-center text-sm text-gray-500">
                                        Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Log in</Link>
                                    </p>
                                </form>
                            </motion.div>
                        )}

                        {step === 'verify' && (
                            <motion.div
                                key="verify"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                        <ShieldCheck className="w-8 h-8 text-tiktok-cyan" />
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Enter the 6-digit code sent to<br />
                                        <span className="text-white font-bold">{contact}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    <input
                                        type="text"
                                        maxLength="6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="000000"
                                        className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-6 text-center text-3xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-tiktok-cyan transition-all"
                                        autoFocus
                                    />

                                    {error && (
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep('input')}
                                            className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading || otp.length !== 6}
                                            className="flex-1 py-4 bg-tiktok-cyan hover:bg-tiktok-cyan/90 text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
                                        </button>
                                    </div>

                                    <p className="text-center text-xs text-gray-500 cursor-pointer hover:text-white" onClick={handleSendOtp}>
                                        Resend Code
                                    </p>
                                </form>
                            </motion.div>
                        )}

                        {step === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Full Name</label>
                                        <input
                                            value={userDetails.fullName}
                                            onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Set Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={userDetails.password}
                                                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                                placeholder="••••••••"
                                            />
                                            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={loading || !userDetails.fullName || !userDetails.password}
                                    className="w-full py-4 bg-tiktok-pink hover:bg-tiktok-pink/90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Complete Registration <CheckCircle2 className="w-5 h-5" /></>}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Register;

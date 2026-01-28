import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, X, ChevronRight, RefreshCw } from 'lucide-react';
import { otpService } from '../services/otpService';

const OTPVerification = ({ isOpen, onClose, onVerified }) => {
    const [step, setStep] = useState('identifier'); // identifier, verify
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => setResendTimer(t => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!identifier) return;

        setLoading(true);
        setError('');
        try {
            await otpService.sendOTP(identifier);
            setStep('verify');
            setResendTimer(30);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const code = otp.join('');
        if (code.length < 6) return;

        setLoading(true);
        setError('');
        try {
            await otpService.verifyOTP(identifier, code);
            onVerified();
        } catch (err) {
            setError(err.message);
            setOtp(['', '', '', '', '', '']);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[32px] p-8 overflow-hidden shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-tiktok-pink/10 rounded-2xl flex items-center justify-center mb-6">
                        <ShieldCheck className="w-8 h-8 text-tiktok-pink" />
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Security Verification</h2>
                    <p className="text-gray-400 text-sm mb-8">
                        {step === 'identifier'
                            ? 'Receive a verification code to securely connect your TikTok account.'
                            : `Enter the code sent to ${identifier}`}
                    </p>

                    <AnimatePresence mode="wait">
                        {step === 'identifier' ? (
                            <motion.form
                                key="id-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleSendOTP}
                                className="w-full space-y-4"
                            >
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Email or Phone Number"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                    />
                                    {error && <p className="text-xs text-red-500 mt-2 text-left">{error}</p>}
                                </div>

                                <button
                                    disabled={loading || !identifier}
                                    className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                        <>
                                            Send Verification Code
                                            <ChevronRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="otp-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full space-y-8"
                            >
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(i, e)}
                                            className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-tiktok-cyan transition-all"
                                        />
                                    ))}
                                </div>

                                {error && <p className="text-xs text-red-500 text-center">{error}</p>}

                                <div className="space-y-4">
                                    <button
                                        onClick={handleVerifyOTP}
                                        disabled={loading || otp.join('').length < 6}
                                        className="w-full py-4 bg-tiktok-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(254,44,85,0.3)]"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Continue'}
                                    </button>

                                    <button
                                        disabled={resendTimer > 0}
                                        onClick={handleSendOTP}
                                        className="w-full py-2 text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw className={`w-4 h-4 ${resendTimer > 0 && 'animate-spin-once'}`} />
                                        {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : 'Resend Verification Code'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-tiktok-pink/20 rounded-full blur-[64px]" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-tiktok-cyan/20 rounded-full blur-[64px]" />
            </motion.div>
        </div>
    );
};

export default OTPVerification;

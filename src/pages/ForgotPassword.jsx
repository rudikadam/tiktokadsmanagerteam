import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Key } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: Verification, 3: New Password
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
        general: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        code: false,
        password: false,
        confirmPassword: false
    });

    // Validation functions
    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (password.length > 50) return 'Password must be less than 50 characters';
        if (!/[A-Z]/.test(password)) return 'Must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Must contain at least one lowercase letter';
        if (!/[0-9]/.test(password)) return 'Must contain at least one number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Must contain at least one special character';
        if (/\s/.test(password)) return 'Password cannot contain spaces';
        return '';
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 4) return { strength: 2, label: 'Fair', color: 'bg-orange-500' };
        if (strength <= 5) return { strength: 3, label: 'Good', color: 'bg-yellow-500' };
        return { strength: 4, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(newPassword);

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setTouched({ ...touched, email: true });

        const emailError = validateEmail(email);
        if (emailError) {
            setErrors({ ...errors, email: emailError });
            return;
        }

        setLoading(true);
        // Simulate sending email
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        setTouched({ ...touched, code: true });

        if (!verificationCode) {
            setErrors({ ...errors, code: 'Verification code is required' });
            return;
        }

        if (verificationCode.length !== 6) {
            setErrors({ ...errors, code: 'Code must be 6 digits' });
            return;
        }

        setLoading(true);
        // Simulate code verification (accept any 6-digit code for demo)
        setTimeout(() => {
            setLoading(false);
            if (verificationCode === '000000') {
                setErrors({ ...errors, general: 'Invalid verification code. Try any 6-digit code (e.g., 123456)' });
            } else {
                setStep(3);
                setErrors({ ...errors, general: '' });
            }
        }, 1000);
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        setTouched({ password: true, confirmPassword: true });

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setErrors({ ...errors, password: passwordError });
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        // Simulate password reset
        setTimeout(() => {
            setLoading(false);
            // Show success and redirect
            alert('Password reset successful! You can now login with your new password.');
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-cyan/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-tiktok-pink/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="w-16 h-16 bg-tiktok-cyan rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-tiktok-cyan/20">
                            <Key className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
                            Reset <span className="text-tiktok-pink">Password</span>
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {step === 1 && "Enter your email to receive a verification code"}
                            {step === 2 && "Enter the 6-digit code sent to your email"}
                            {step === 3 && "Create a new secure password"}
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all ${s === step ? 'w-12 bg-tiktok-pink' :
                                        s < step ? 'w-8 bg-tiktok-cyan' : 'w-6 bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* General Error */}
                    <AnimatePresence>
                        {errors.general && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-red-400">{errors.general}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleEmailSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (touched.email) setErrors({ ...errors, email: validateEmail(e.target.value) });
                                        }}
                                        onBlur={() => handleBlur('email')}
                                        className={`w-full bg-black/40 border ${errors.email && touched.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-cyan/50 transition-all`}
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.email && touched.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-xs font-bold text-red-400 mt-2 ml-2 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Code
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    {/* Step 2: Verification Code */}
                    {step === 2 && (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleCodeSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Verification Code</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={verificationCode}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setVerificationCode(value);
                                        if (touched.code) setErrors({ ...errors, code: '' });
                                    }}
                                    onBlur={() => handleBlur('code')}
                                    className={`w-full bg-black/40 border ${errors.code && touched.code ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white font-mono text-2xl text-center tracking-[0.5em] font-bold focus:outline-none focus:border-tiktok-cyan/50 transition-all`}
                                    placeholder="000000"
                                />
                                <AnimatePresence>
                                    {errors.code && touched.code && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-xs font-bold text-red-400 mt-2 ml-2 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.code}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                <p className="text-xs font-bold text-gray-500 mt-3 ml-2">
                                    Code sent to <span className="text-tiktok-cyan">{email}</span>
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Verify Code
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-xs font-bold text-gray-500 hover:text-white transition-colors"
                            >
                                ← Back to email
                            </button>
                        </motion.form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handlePasswordReset}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            if (touched.password) setErrors({ ...errors, password: validatePassword(e.target.value) });
                                        }}
                                        onBlur={() => handleBlur('password')}
                                        className={`w-full bg-black/40 border ${errors.password && touched.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 transition-all`}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {/* Password Strength */}
                                <AnimatePresence>
                                    {newPassword && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 ml-2"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden flex gap-1">
                                                    {[1, 2, 3, 4].map((level) => (
                                                        <div
                                                            key={level}
                                                            className={`flex-1 transition-all duration-300 ${level <= passwordStrength.strength ? passwordStrength.color : 'bg-transparent'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${passwordStrength.strength === 1 ? 'text-red-500' :
                                                        passwordStrength.strength === 2 ? 'text-orange-500' :
                                                            passwordStrength.strength === 3 ? 'text-yellow-500' :
                                                                'text-green-500'
                                                    }`}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (touched.confirmPassword) {
                                                setErrors({ ...errors, confirmPassword: e.target.value !== newPassword ? 'Passwords do not match' : '' });
                                            }
                                        }}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        className={`w-full bg-black/40 border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 transition-all`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-xs font-bold text-red-400 mt-2 ml-2 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.confirmPassword}
                                        </motion.p>
                                    )}
                                    {!errors.confirmPassword && confirmPassword && confirmPassword === newPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs font-bold text-green-500 mt-2 ml-2 flex items-center gap-1"
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            Passwords match
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Reset Password
                                        <CheckCircle2 className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}

                    {/* Back to Login */}
                    <div className="mt-10 text-center">
                        <p className="text-sm font-bold text-gray-500">
                            Remember your password? {' '}
                            <Link to="/login" className="text-white hover:text-tiktok-cyan transition-colors">Back to Login</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;

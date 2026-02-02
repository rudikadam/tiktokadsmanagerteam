import { useState } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Mail, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    // Validation rules
    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        if (email.length < 5) return 'Email must be at least 5 characters';
        if (email.length > 100) return 'Email must be less than 100 characters';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (password.length > 50) return 'Password must be less than 50 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character (!@#$%^&*...)';
        if (/\s/.test(password)) return 'Password cannot contain spaces';
        return '';
    };

    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;

        // Length check
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;

        // Character variety
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

        // Determine label and color
        if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 4) return { strength: 2, label: 'Fair', color: 'bg-orange-500' };
        if (strength <= 5) return { strength: 3, label: 'Good', color: 'bg-yellow-500' };
        return { strength: 4, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);


    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });

        if (field === 'email') {
            setErrors({ ...errors, email: validateEmail(formData.email) });
        } else if (field === 'password') {
            setErrors({ ...errors, password: validatePassword(formData.password) });
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });

        // Clear general error when user starts typing
        if (errors.general) {
            setErrors({ ...errors, general: '' });
        }

        // Real-time validation if field was touched
        if (touched[field]) {
            if (field === 'email') {
                setErrors({ ...errors, email: validateEmail(value) });
            } else if (field === 'password') {
                setErrors({ ...errors, password: validatePassword(value) });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({ email: true, password: true });

        // Validate all fields
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            email: emailError,
            password: passwordError,
            general: ''
        });

        // Stop if there are validation errors
        if (emailError || passwordError) {
            return;
        }

        setLoading(true);

        // Mock login with simulated authentication
        setTimeout(() => {
            // Simulate authentication check
            // Simulate authentication check
            // In a real app, this would validate against a backend database
            // For this demo, we accept any valid email format (validity checked above)


            // Allow the specific demo password OR any strong password that passed validation
            if (formData.password !== 'password' && formData.password.length < 8) {
                setErrors({
                    ...errors,
                    general: 'Invalid credentials. Hint: Use "password" or any 8+ character password.'
                });
                setLoading(false);
                return;
            }


            // Successful login
            onLogin({
                id: '1',
                email: formData.email,
                fullName: formData.email.split('@')[0],
                avatar: null
            });
            setLoading(false);
            navigate('/ad-history');
        }, 1500);
=======
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { authApi } from '../services/authApi';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authApi.login({ contact, password });
            localStorage.setItem('tiktok_token', 'mock_logged_in_token');
            if (onLogin) onLogin();
            navigate('/create-ad');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
>>>>>>> origin/main
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
                className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-pink/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-tiktok-cyan/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="w-16 h-16 bg-tiktok-pink rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-tiktok-pink/20">
                            <Layout className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Welcome <span className="text-tiktok-cyan">Back</span></h1>
                        <p className="text-gray-500 font-medium">Enter your credentials to access the dashboard.</p>
                    </div>

                    {/* General Error Banner */}
                    <AnimatePresence>
                        {errors.general && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-red-400">{errors.general}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        onBlur={() => handleBlur('email')}
                                        className={`w-full bg-black/40 border ${errors.email && touched.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-14 py-4 text-white font-bold focus:outline-none ${errors.email && touched.email ? 'focus:border-red-500/50' : 'focus:border-tiktok-pink/50'} transition-all`}
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

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                        className={`w-full bg-black/40 border ${errors.password && touched.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-14 py-4 text-white font-bold focus:outline-none ${errors.password && touched.password ? 'focus:border-red-500/50' : 'focus:border-tiktok-pink/50'} transition-all`}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {/* Password Strength Indicator */}
                                <AnimatePresence>
                                    {formData.password && (
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

                                            {/* Password Requirements Checklist */}
                                            <div className="space-y-1 text-[10px] font-bold">
                                                <div className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-600'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-600'}`} />
                                                    At least 8 characters
                                                </div>
                                                <div className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-600'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                                                    One uppercase letter
                                                </div>
                                                <div className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-gray-600'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                                                    One lowercase letter
                                                </div>
                                                <div className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-600'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                                                    One number
                                                </div>
                                                <div className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : 'text-gray-600'}`}>
                                                    <div className={`w-1 h-1 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-600'}`} />
                                                    One special character (!@#$%...)
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {errors.password && touched.password && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-xs font-bold text-red-400 mt-2 ml-2 flex items-center gap-1"
                                        >
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 bg-white/5 border border-white/10 rounded-md checked:bg-tiktok-pink focus:ring-0 transition-all" />
                                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-xs font-bold text-tiktok-pink hover:text-tiktok-pink/80 transition-colors">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm font-bold text-gray-500">
                            Don't have an account? {' '}
                            <Link to="/register" className="text-white hover:text-tiktok-cyan transition-colors">Create one for free</Link>
                        </p>
                        <p className="text-xs font-bold text-gray-600 mt-4">
                            Or try our <Link to="/google-login" className="text-gray-400 hover:text-white underline transition-colors">Google Login Demo</Link>
                        </p>
                    </div>
                </div>
=======
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-pink/10 blur-[50px] rounded-full pointer-events-none" />

                <h1 className="text-3xl font-extrabold mb-8 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email or Phone</label>
                        <input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                            placeholder="user@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-tiktok-pink hover:bg-tiktok-pink/90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-5 h-5" /></>}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-white font-bold hover:underline">Register</Link>
                    </p>
                </form>
>>>>>>> origin/main
            </motion.div>
        </div>
    );
};

export default Login;

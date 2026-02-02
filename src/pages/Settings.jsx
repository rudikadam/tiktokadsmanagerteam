import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { billingApi } from '../services/billingApi';

import {
    Zap,
    TrendingUp,
    Activity,
    CreditCard,
    ShieldCheck,
    Crown,
    ChevronRight,
    Play,
    Pause,
    Save,
    CheckCircle2,
    PlusCircle,
    User as UserIcon,
    Mail,
    Globe,
    Camera,
    Calendar,
    Users,
    Music,
    Instagram,
    Facebook,
    Youtube,
    Link as LinkIcon,
    Phone,
    MapPin,
    Hash,
    History
} from 'lucide-react';


const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState({
        fullName: 'Demo Advertiser',
        email: 'demo@tiktokads.com',
        phone: '+1 (555) 000-0000',
        bio: 'Digital marketing enthusiast and content creator.',
        dob: '1995-05-15',
        age: '29',
        gender: 'Not Specified',
        region: 'United States',
        timezone: 'UTC-8',
        avatar: null,
        socialLinks: {
            tiktok: 'tiktok.com/@demo',
            google: 'demo@gmail.com',
            facebook: 'facebook.com/demo',
            instagram: 'instagram.com/demo'
        }
    });

    const [preferences, setPreferences] = useState({
        creativePulse: true,
        autoOptimize: false,
        marketingMode: true,
        notifications: true
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isRebooting, setIsRebooting] = useState(false);
    const [billingData, setBillingData] = useState({
        paymentMethods: [],
        history: [],
        subscription: null,
        loading: false
    });


    useEffect(() => {
        try {
            const savedPrefs = localStorage.getItem('user_preferences');
            if (savedPrefs) setPreferences(JSON.parse(savedPrefs));

            const savedUser = localStorage.getItem('tiktok_user');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                // Merge with default values for new fields
                setUser(prev => ({ ...prev, ...parsedUser }));
            }
        } catch (e) {
            console.error("Failed to load settings data", e);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'billing') {
            loadBillingData();
        }
    }, [activeTab]);

    const loadBillingData = async () => {
        setBillingData(prev => ({ ...prev, loading: true }));
        try {
            const [methods, history, sub] = await Promise.all([
                billingApi.getPaymentMethods(),
                billingApi.getBillingHistory(),
                billingApi.getSubscription()
            ]);
            setBillingData({
                paymentMethods: methods,
                history: history,
                subscription: sub,
                loading: false
            });
        } catch (e) {
            console.error("Failed to load billing", e);
            setBillingData(prev => ({ ...prev, loading: false }));
        }
    };

    const handleAddPayment = async () => {
        // Very simple mock add
        try {
            await billingApi.addPaymentMethod({
                type: 'MASTERCARD',
                number: '5555444433332222',
                expiry: '10/29'
            });
            loadBillingData();
        } catch (e) {
            alert(e.message);
        }
    };


    const togglePref = (key) => {
        const updated = { ...preferences, [key]: !preferences[key] };
        setPreferences(updated);
        localStorage.setItem('user_preferences', JSON.stringify(updated));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            localStorage.setItem('tiktok_user', JSON.stringify(user));
            // Also notify any components using the user state
            window.dispatchEvent(new Event('storage'));
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    const handleSocialChange = (platform, value) => {
        setUser(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleReboot = () => {
        setIsRebooting(true);
        // Simulate a system reboot/resync
        setTimeout(() => {
            setIsRebooting(false);
            // Refresh the page or clear temporary session data
            window.location.reload();
        }, 3000);
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white italic uppercase">Control <span className="text-tiktok-cyan">Center</span></h1>
                    <p className="text-gray-400 font-medium">Manage your profile, linked accounts, and core preferences.</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full md:w-auto overflow-x-auto custom-scrollbar">
                    {[
                        { id: 'profile', label: 'Identity', icon: ShieldCheck },
                        { id: 'billing', label: 'Payments', icon: CreditCard },
                        { id: 'preferences', label: 'Config', icon: Zap }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                {/* Header / Identity Card */}
                                <section className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <UserIcon className="w-40 h-40 text-white" />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-[32px] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-tiktok-pink/50">
                                                {user.avatar ? (
                                                    <img src={user.avatar} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon className="w-12 h-12 text-gray-700" />
                                                )}
                                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                    <Camera className="w-6 h-6 text-white mb-1" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-white">Update</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full space-y-2 text-center md:text-left">
                                            <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">{user.fullName}</h2>
                                            <p className="text-tiktok-cyan font-black text-xs tracking-widest uppercase">{user.email}</p>
                                            <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                                <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400">ID: 882941</div>
                                                <div className="px-3 py-1 bg-tiktok-pink/10 rounded-lg border border-tiktok-pink/20 text-[10px] font-bold text-tiktok-pink uppercase">Verified Pro</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Detailed Profile Form */}
                                <section className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-10">
                                    {/* Personal Intel */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center text-tiktok-cyan">
                                                <UserIcon className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-black italic text-sm tracking-widest text-white uppercase">Personal Identity</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Full Name</label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        value={user.fullName}
                                                        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-cyan/50"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Display Age</label>
                                                <div className="relative">
                                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="number"
                                                        value={user.age}
                                                        onChange={(e) => setUser({ ...user, age: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-cyan/50"
                                                        placeholder="25"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Date of Birth</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="date"
                                                        value={user.dob}
                                                        onChange={(e) => setUser({ ...user, dob: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-cyan/50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Gender Identity</label>
                                                <div className="relative">
                                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <select
                                                        value={user.gender}
                                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-cyan/50 appearance-none cursor-pointer"
                                                    >
                                                        <option value="Male" className="bg-zinc-900">Male</option>
                                                        <option value="Female" className="bg-zinc-900">Female</option>
                                                        <option value="Non-binary" className="bg-zinc-900">Non-binary</option>
                                                        <option value="Other" className="bg-zinc-900">Other</option>
                                                        <option value="Not Specified" className="bg-zinc-900">Prefer not to say</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact & Bio */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 pt-4">
                                            <div className="w-8 h-8 rounded-xl bg-tiktok-pink/10 flex items-center justify-center text-tiktok-pink">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-black italic text-sm tracking-widest text-white uppercase">Contact Interface</h3>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Public Phone</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                        <input
                                                            value={user.phone}
                                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50"
                                                            placeholder="+1 (555) 000-0000"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Primary Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                        <input
                                                            value={user.email}
                                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                            className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Short Bio</label>
                                                <textarea
                                                    rows="3"
                                                    value={user.bio}
                                                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 resize-none italic"
                                                    placeholder="Tell the community about your advertising style..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connection Vault */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-6 pt-4">
                                            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                                <LinkIcon className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-black italic text-sm tracking-widest text-white uppercase">Platform Connections</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'tiktok', name: 'TikTok', icon: Music, color: 'hover:border-[#FE2C55]/50 hover:bg-[#FE2C55]/5' },
                                                { id: 'google', name: 'Google', icon: Globe, color: 'hover:border-white/50 hover:bg-white/5' },
                                                { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5' },
                                                { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'hover:border-[#E4405F]/50 hover:bg-[#E4405F]/5' }
                                            ].map(platform => (
                                                <div key={platform.id} className={`p-4 rounded-[24px] bg-black/40 border border-white/5 flex items-center gap-4 transition-all ${platform.color} group`}>
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <platform.icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{platform.name} Link</p>
                                                        <input
                                                            value={user.socialLinks[platform.id]}
                                                            onChange={(e) => handleSocialChange(platform.id, e.target.value)}
                                                            className="w-full bg-transparent border-none p-0 text-xs font-bold text-white focus:outline-none"
                                                            placeholder={`Link your ${platform.name}...`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-8">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center gap-2 group"
                                        >
                                            {isSaving ? (
                                                <Activity className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                            )}
                                            Secure Identity Data
                                        </button>
                                    </div>
                                    {saveSuccess && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-end gap-2 text-tiktok-cyan mt-4">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Sync Complete</span>
                                        </motion.div>
                                    )}
                                </section>

                                {/* Region Section */}
                                <section className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-black italic text-sm tracking-widest text-white uppercase">Regional Sync</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Operational Market</label>
                                            <input
                                                value={user.region}
                                                onChange={(e) => setUser({ ...user, region: e.target.value })}
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 text-left">Local Timezone</label>
                                            <input
                                                value={user.timezone}
                                                onChange={(e) => setUser({ ...user, timezone: e.target.value })}
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === 'billing' && (
                            <motion.div
                                key="billing"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <section className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-10 text-left">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shadow-lg shadow-orange-500/5">
                                                <CreditCard className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-black italic text-2xl tracking-tighter text-white uppercase">Payment Vault</h3>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                    {billingData.loading ? 'Syncing with vault...' : 'Protected by military grade encryption'}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleAddPayment}
                                            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border border-white/5"
                                        >
                                            Add Reserve
                                        </button>
                                    </div>

                                    {billingData.loading && billingData.paymentMethods.length === 0 ? (
                                        <div className="py-20 flex flex-col items-center justify-center opacity-50">
                                            <Activity className="w-8 h-8 animate-spin mb-4" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white">Accessing Secure API...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {billingData.paymentMethods.map((method, idx) => (
                                                <div key={method.id} className={`p-8 rounded-[32px] ${idx === 0 ? 'bg-gradient-to-br from-zinc-800 to-black' : 'bg-white/[0.03]'} border border-white/10 relative overflow-hidden group shadow-2xl`}>
                                                    <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-all scale-125 font-black italic text-gray-500">
                                                        {method.type}
                                                    </div>
                                                    <div className="space-y-8 relative z-10 text-left">
                                                        <p className={`text-[10px] ${idx === 0 ? 'text-tiktok-cyan' : 'text-gray-500'} font-black tracking-[0.3em] uppercase`}>
                                                            {idx === 0 ? 'Primary Asset' : 'Backup Channel'}
                                                        </p>
                                                        <p className="text-2xl font-mono tracking-[0.3em] text-white">•••• •••• •••• {method.last4}</p>
                                                        <div className="flex justify-between items-end pt-4">
                                                            <div>
                                                                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Expiration</p>
                                                                <p className="text-sm font-black text-white italic">{method.expiry}</p>
                                                            </div>
                                                            <div className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black tracking-widest rounded-full border border-green-500/20 flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                                SECURE
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div
                                                onClick={handleAddPayment}
                                                className="p-8 rounded-[32px] bg-white/[0.02] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:bg-white/[0.05] hover:border-tiktok-cyan/30 transition-all group"
                                            >
                                                <div className="w-14 h-14 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                                    <PlusCircle className="w-6 h-6 text-gray-600 group-hover:text-tiktok-cyan" />
                                                </div>
                                                <div>
                                                    <p className="font-black italic text-sm text-gray-500 uppercase tracking-tighter group-hover:text-white">Link Backup Channel</p>
                                                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mt-1">Pay-as-you-go Ready</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                {/* Billing History Section */}
                                <section className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
                                    <div className="flex items-center gap-3 mb-8 text-left">
                                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                            <History className="w-4 h-4" />
                                        </div>
                                        <h3 className="font-black italic text-sm tracking-widest text-white uppercase">Invoice Archive</h3>
                                    </div>

                                    <div className="overflow-x-auto custom-scrollbar">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Invoice</th>
                                                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</th>
                                                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                                                    <th className="pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.02]">
                                                {billingData.history.map(inv => (
                                                    <tr key={inv.id} className="group hover:bg-white/[0.01]">
                                                        <td className="py-4 text-[11px] font-bold text-white uppercase">{inv.id}</td>
                                                        <td className="py-4 text-[11px] font-bold text-gray-500">{inv.date}</td>
                                                        <td className="py-4 text-[11px] font-black text-white italic">{inv.amount}</td>
                                                        <td className="py-4">
                                                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[8px] font-black tracking-widest rounded-full border border-green-500/20">
                                                                {inv.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                            </motion.div>
                        )}

                        {activeTab === 'preferences' && (
                            <motion.div
                                key="preferences"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <section className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                                    <div className="flex items-center gap-4 mb-10 text-left">
                                        <div className="w-12 h-12 rounded-2xl bg-tiktok-cyan/10 flex items-center justify-center text-tiktok-cyan border border-tiktok-cyan/20">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black italic text-2xl tracking-tighter text-white uppercase">Engine Control</h3>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Adjust AI behaviors and data tracking</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { id: 'marketingMode', label: 'Pro Editor', desc: 'Unlock frame-by-frame campaign tuning', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
                                            { id: 'creativePulse', label: 'AI Pulse', desc: 'Real-time creative hook suggestions', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                                            { id: 'autoOptimize', label: 'Auto-Bid', desc: 'Let AI manage budget for max scale', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                            { id: 'notifications', label: 'Alert Hub', desc: 'Instant status for viral reach shifts', icon: Crown, color: 'text-tiktok-pink', bg: 'bg-tiktok-pink/10' }
                                        ].map(item => (
                                            <div key={item.id} className="p-8 rounded-[32px] bg-black/40 border border-white/5 flex items-start justify-between group hover:border-white/10 transition-all text-left">
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
                                                        <item.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black italic text-sm text-white uppercase tracking-tighter">{item.label}</p>
                                                        <p className="text-[10px] font-bold text-gray-500 max-w-[140px] leading-tight mt-2 uppercase tracking-wide">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => togglePref(item.id)}
                                                    className={`w-14 h-7 rounded-full p-1.5 transition-all duration-500 relative ${preferences[item.id] ? 'bg-tiktok-pink shadow-[0_0_15px_rgba(254,44,85,0.3)]' : 'bg-white/10'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-500 ${preferences[item.id] ? 'translate-x-7' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-6 text-left">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Default Reset</button>
                                        <button
                                            onClick={handleSave}
                                            className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Lock Changes
                                        </button>
                                    </div>
                                    {saveSuccess && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-right text-[10px] text-tiktok-cyan font-black uppercase tracking-widest mt-4 italic">
                                            ✓ Core engine re-calibrated successfully
                                        </motion.p>
                                    )}
                                </section>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Feedback Area */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="p-10 rounded-[40px] bg-gradient-to-br from-tiktok-pink/10 to-tiktok-cyan/10 border border-white/10 relative overflow-hidden group shadow-3xl">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/10 transition-all" />

                        <div className="relative z-10 text-center">
                            <h3 className="text-[10px] font-black tracking-[0.4em] mb-10 text-gray-500 uppercase italic">Control Center Pulse</h3>
                            <div className="flex items-center justify-center gap-6 mb-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-[32px] bg-white/5 flex items-center justify-center text-tiktok-pink shadow-xl border border-white/5">
                                        <Pause className="w-10 h-10 fill-tiktok-pink" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase text-gray-600">Off-line</span>
                                </div>
                                <div className="w-[2px] h-12 bg-white/5" />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-[32px] bg-tiktok-cyan/20 flex items-center justify-center text-tiktok-cyan border border-tiktok-cyan/30 shadow-[0_0_30px_rgba(0,255,242,0.15)] animate-pulse">
                                        <Play className="w-10 h-10 fill-tiktok-cyan" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase text-tiktok-cyan">On-line</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold mb-8 uppercase tracking-widest leading-relaxed">System state: <span className="text-white font-black italic">Reactive Adaptive Mode</span></p>
                            <button
                                onClick={handleReboot}
                                disabled={isRebooting}
                                className={`w-full py-5 ${isRebooting ? 'bg-gray-500' : 'bg-white'} text-black font-black uppercase italic tracking-tighter text-xs rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-2`}
                            >
                                {isRebooting ? (
                                    <>
                                        <Activity className="w-4 h-4 animate-spin" />
                                        REBOOTING...
                                    </>
                                ) : (
                                    <>
                                        System Reboot
                                        <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </section>

                    <section className="p-8 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-xl text-left">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8 italic flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-tiktok-pink" />
                            Recent Archive
                        </h4>
                        <div className="space-y-8">
                            {[
                                { title: 'Safe Vault Access', time: '2h ago', icon: CreditCard, color: 'text-orange-400' },
                                { title: 'Identity Refresh', time: 'Just Now', icon: ShieldCheck, color: 'text-emerald-400' },
                                { title: 'Social Sync Active', time: '12m ago', icon: Instagram, color: 'text-purple-400' }
                            ].map((update, i) => (
                                <div key={i} className="flex gap-5 items-start group">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${update.color} border border-white/5 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <update.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white italic uppercase tracking-tighter group-hover:text-tiktok-cyan transition-colors">{update.title}</p>
                                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">{update.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Settings;

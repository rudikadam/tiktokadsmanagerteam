import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Link as LinkIcon,
    Globe,
    Music,
    Chrome,
    CheckCircle2,
    Save,
    Twitter,
    Instagram,
    Camera,
    Activity,
    Bell,
    Moon,
    Zap,
    TrendingUp,
    Award,
    Loader2
} from 'lucide-react';

const Settings = ({ setError }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        spotifyLink: '',
        tiktokLink: '',
        googleAccount: '',
        website: '',
        photoUrl: null,
        notifications: true,
        autoOptimize: false,
        creativePulse: true,
        dateOfBirth: ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
        setSaveSuccess(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setProfile(prev => ({ ...prev, photoUrl: url }));
            setSaveSuccess(false);
        }
    };

    const togglePref = (key) => {
        setProfile(prev => ({ ...prev, [key]: !prev[key] }));
        setSaveSuccess(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('user_profile', JSON.stringify(profile));
        setIsSaving(false);
        setSaveSuccess(true);

        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const ConnectedAccount = ({ icon: Icon, label, color, connected, accountName }) => (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                    <p className="font-bold text-sm tracking-tight">{label}</p>
                    <p className="text-xs text-gray-500">{connected ? accountName : 'Not connected'}</p>
                </div>
            </div>
            <button
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${connected ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-black hover:bg-gray-200'
                    }`}
            >
                {connected ? 'Disconnect' : 'Connect'}
            </button>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Account Settings</h1>
                <p className="text-gray-400">Manage your profile, contact details, and connected social accounts.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="p-8 rounded-[32px] glass space-y-6">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-tiktok-pink" />
                            <h3 className="font-bold text-xl">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Date of Birth</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={profile.dateOfBirth}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all text-white/80"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Website / Portfolio</label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        name="website"
                                        value={profile.website}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 rounded-[32px] glass space-y-6">
                        <div className="flex items-center gap-3">
                            <LinkIcon className="w-5 h-5 text-tiktok-cyan" />
                            <h3 className="font-bold text-xl">Connected Accounts</h3>
                        </div>

                        <div className="space-y-4">
                            <ConnectedAccount
                                icon={Music}
                                label="Spotify"
                                color="bg-[#1DB954]"
                                connected={!!profile.spotifyLink}
                                accountName={profile.spotifyLink || 'Spotify Premium'}
                            />
                            <ConnectedAccount
                                icon={LinkIcon}
                                label="TikTok Account"
                                color="bg-[#FE2C55]"
                                connected={true}
                                accountName="@demo_account_123"
                            />
                            <ConnectedAccount
                                icon={Chrome}
                                label="Google Account"
                                color="bg-[#4285F4]"
                                connected={!!profile.googleAccount}
                                accountName={profile.googleAccount || 'Linked to Gmail'}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Spotify Profile Link</label>
                                <input
                                    name="spotifyLink"
                                    value={profile.spotifyLink}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
                                    placeholder="https://open.spotify.com/user/username"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Google / Gmail Account</label>
                                <input
                                    name="googleAccount"
                                    value={profile.googleAccount}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#4285F4] transition-all"
                                    placeholder="yourname@gmail.com"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <section className="p-8 rounded-[32px] glass space-y-8">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <h3 className="font-bold text-xl">Trending Features</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Creative Pulse</p>
                                        <p className="text-[10px] text-gray-500 uppercase">AI Suggestions</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => togglePref('creativePulse')}
                                    className={`w-10 h-5 rounded-full p-1 transition-all ${profile.creativePulse ? 'bg-tiktok-pink' : 'bg-zinc-700'}`}
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full transition-all ${profile.creativePulse ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Auto-Optimize</p>
                                        <p className="text-[10px] text-gray-500 uppercase">Performance</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => togglePref('autoOptimize')}
                                    className={`w-10 h-5 rounded-full p-1 transition-all ${profile.autoOptimize ? 'bg-tiktok-cyan' : 'bg-zinc-700'}`}
                                >
                                    <div className={`w-3 h-3 bg-white rounded-full transition-all ${profile.autoOptimize ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="p-8 rounded-[32px] glass sticky top-24">
                        <h3 className="font-bold mb-6">Profile Focus</h3>
                        <div className="flex flex-col items-center text-center">
                            <div className="relative group mb-4">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-tiktok-pink to-tiktok-cyan p-1 shadow-xl">
                                    {profile.photoUrl ? (
                                        <img src={profile.photoUrl} className="w-full h-full rounded-full object-cover" alt="Profile" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-3xl">
                                            {profile.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('photo-upload').click()}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="mb-8">
                                <p className="font-bold text-lg">{profile.name || 'Set Your Name'}</p>
                                <p className="text-xs text-tiktok-cyan font-bold tracking-widest uppercase">Pro Advertiser</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <p className="text-xl font-bold">12</p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Ads Created</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <p className="text-xl font-bold text-green-500">98%</p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Score</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Settings
                        </button>

                        {saveSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-2 text-green-500 text-sm font-bold"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Profile Updated
                            </motion.div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;

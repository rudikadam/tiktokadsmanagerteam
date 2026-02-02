import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LifeBuoy,
    Send,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    Clock,
    ShieldQuestion,
    ChevronRight,
    Search,
    Zap
} from 'lucide-react';

const Support = () => {
    const [formState, setFormState] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS
    const [formData, setFormData] = useState({
        subject: '',
        category: 'TECHNICAL',
        priority: 'MEDIUM',
        message: ''
    });

    const categories = [
        { id: 'TECHNICAL', label: 'Technical Issue', icon: ShieldQuestion },
        { id: 'BILLING', label: 'Billing & Payment', icon: Zap },
        { id: 'ACCOUNT', label: 'Account Security', icon: AlertCircle },
        { id: 'FEATURE', label: 'Feature Request', icon: Send }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('SUBMITTING');

        const newTicket = {
            ...formData,
            id: 'tk_' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            status: 'OPEN',
            user: JSON.parse(localStorage.getItem('tiktok_user') || '{}')
        };

        // Save to hidden global storage for Admin Dashboard
        const existing = JSON.parse(localStorage.getItem('tiktok_support_tickets') || '[]');
        localStorage.setItem('tiktok_support_tickets', JSON.stringify([newTicket, ...existing]));

        // Mock API call
        await new Promise(r => setTimeout(r, 2000));

        setFormState('SUCCESS');
    };

    if (formState === 'SUCCESS') {
        return (
            <div className="flex items-center justify-center min-h-[70vh] px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full text-center space-y-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-tiktok-cyan/20 blur-[100px] rounded-full" />
                        <div className="w-24 h-24 bg-tiktok-cyan/10 rounded-[40px] border border-tiktok-cyan/20 flex items-center justify-center mx-auto relative z-10 shadow-2xl">
                            <CheckCircle2 className="w-12 h-12 text-tiktok-cyan" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase">Ticket Received</h2>
                        <p className="text-gray-400 font-medium">Our engineers are on it. You will receive an update in your dashboard within 4-6 hours.</p>
                    </div>
                    <button
                        onClick={() => setFormState('IDLE')}
                        className="px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-white/5 active:scale-95"
                    >
                        Create New Ticket
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 space-y-16">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-tiktok-cyan bg-tiktok-cyan/10 px-4 py-2 rounded-full w-fit border border-tiktok-cyan/20">
                        <LifeBuoy className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Support Protocol</span>
                    </div>
                    <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                        How can we <br />
                        <span className="text-tiktok-pink">Resolve</span> it?
                    </h1>
                </div>
                <div className="hidden lg:flex gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Avg Response</p>
                        <p className="text-2xl font-black italic tracking-tighter">12 MINUTES</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2 justify-end">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-2xl font-black italic tracking-tighter">SYSTEMS OPEN</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* FAQ & Knowledge Base Side */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Search className="w-32 h-32 text-tiktok-cyan" />
                        </div>
                        <h3 className="text-xl font-black italic tracking-tighter uppercase">Knowledge Core</h3>
                        <div className="space-y-3">
                            {[
                                { t: 'Platform Quickstart', d: 'Learn the basic workflow' },
                                { t: 'Ad Specs & Samples', d: 'Visual guide for creatives' },
                                { t: 'Directing AI Reach', d: 'How to optimize engagement' },
                                { t: 'Payment Verification', d: 'QR Code security protocols' }
                            ].map(item => (
                                <button key={item.t} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/10 transition-all group/item border border-transparent hover:border-white/10 text-left">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 group-hover/item:text-white transition-colors leading-none mb-1">{item.t}</p>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{item.d}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover/item:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-tiktok-pink/20 to-transparent border border-white/10 space-y-4">
                        <div className="w-12 h-12 bg-tiktok-pink/20 rounded-2xl flex items-center justify-center border border-tiktok-pink/20">
                            <MessageSquare className="w-6 h-6 text-tiktok-pink" />
                        </div>
                        <h3 className="text-xl font-black italic tracking-tighter uppercase">Direct Agent</h3>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed">
                            Premium partners get 24/7 dedicated account manager access via encrypted chat.
                        </p>
                        <button className="text-[10px] font-black text-tiktok-pink uppercase tracking-widest hover:underline">Connect Private Link →</button>
                    </div>
                </div>

                {/* Support Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                    <div className="p-10 rounded-[48px] bg-white/5 border border-white/10 space-y-10 relative overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Ticket Subject</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Brief summary of the issue"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-tiktok-cyan/50 focus:bg-white/[0.06] transition-all font-bold placeholder:text-gray-600"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Priority Level</label>
                                <div className="flex gap-2">
                                    {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, priority: p })}
                                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${formData.priority === p
                                                ? 'bg-tiktok-cyan text-black shadow-lg shadow-tiktok-cyan/20'
                                                : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Select category</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat.id })}
                                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-4 text-center group ${formData.category === cat.id
                                            ? 'bg-tiktok-pink/10 border-tiktok-pink/30 shadow-xl shadow-tiktok-pink/5'
                                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <cat.icon className={`w-6 h-6 ${formData.category === cat.id ? 'text-tiktok-pink' : 'text-gray-500 group-hover:text-white'} transition-colors`} />
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${formData.category === cat.id ? 'text-white' : 'text-gray-600'} transition-colors`}>
                                            {cat.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Detailed Description</label>
                            <textarea
                                required
                                rows="6"
                                placeholder="Describe the steps to reproduce the issue..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-[32px] px-8 py-6 text-white focus:outline-none focus:border-tiktok-cyan/50 focus:bg-white/[0.06] transition-all font-medium placeholder:text-gray-600 resize-none leading-relaxed"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={formState === 'SUBMITTING'}
                            className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-3xl hover:bg-tiktok-cyan transition-all relative overflow-hidden group shadow-2xl disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {formState === 'SUBMITTING' ? (
                                    <>
                                        <Clock className="w-4 h-4 animate-spin" />
                                        ENCRYPTING REQUEST...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                        TRANSMIT TICKET
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Support;

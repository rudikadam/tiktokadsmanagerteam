import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    MessageSquare,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Clock,
    Zap,
    Filter,
    RefreshCcw,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const AdminDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [expandedId, setExpandedId] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = () => {
        const stored = localStorage.getItem('tiktok_support_tickets');
        const parsed = stored ? JSON.parse(stored) : [];
        // Sort by timestamp descending
        setTickets(parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    };

    const deleteTicket = (id) => {
        const updated = tickets.filter(t => t.id !== id);
        localStorage.setItem('tiktok_support_tickets', JSON.stringify(updated));
        setTickets(updated);
    };

    const toggleStatus = (id) => {
        const updated = tickets.map(t => {
            if (t.id === id) {
                return { ...t, status: t.status === 'OPEN' ? 'RESOLVED' : 'OPEN' };
            }
            return t;
        });
        localStorage.setItem('tiktok_support_tickets', JSON.stringify(updated));
        setTickets(updated);
    };

    const filteredTickets = tickets.filter(t => {
        if (filter === 'ALL') return true;
        if (filter === 'OPEN') return t.status === 'OPEN';
        if (filter === 'RESOLVED') return t.status === 'RESOLVED';
        return true;
    });

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
            <header className="flex justify-between items-center">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-tiktok-pink">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Admin Console</span>
                    </div>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                        Inbound <span className="text-tiktok-cyan">Tickets</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        {['ALL', 'OPEN', 'RESOLVED'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === f ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            setIsRefreshing(true);
                            setTimeout(() => { loadTickets(); setIsRefreshing(false); }, 800);
                        }}
                        className={`p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCcw className="w-5 h-5 text-tiktok-cyan" />
                    </button>
                </div>
            </header>

            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {filteredTickets.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-20 border-2 border-dashed border-white/10 rounded-[48px] text-center space-y-4"
                        >
                            <MessageSquare className="w-12 h-12 text-gray-700 mx-auto" />
                            <p className="text-gray-500 font-black uppercase tracking-widest">No tickets in this protocol</p>
                        </motion.div>
                    ) : (
                        filteredTickets.map((ticket, i) => (
                            <motion.div
                                key={ticket.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                className={`p-6 rounded-[32px] border transition-all ${ticket.status === 'RESOLVED' ? 'bg-white/[0.02] border-white/5 opacity-60' : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 flex-1 min-w-0">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${ticket.priority === 'HIGH' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                ticket.priority === 'MEDIUM' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                    'bg-green-500/10 border-green-500/20 text-green-500'
                                            }`}>
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-black italic tracking-tighter truncate">{ticket.subject}</h3>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${ticket.status === 'RESOLVED' ? 'border-green-500/30 text-green-500' : 'border-tiktok-cyan/30 text-tiktok-cyan'
                                                    }`}>
                                                    {ticket.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(ticket.timestamp).toLocaleString()}</span>
                                                <span className="flex items-center gap-1.5 text-tiktok-pink"><Zap className="w-3 h-3" /> {ticket.category}</span>
                                                <span className="flex items-center gap-1.5 text-gray-400">ID: {ticket.id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setExpandedId(expandedId === ticket.id ? null : ticket.id)}
                                            className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                                        >
                                            {expandedId === ticket.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(ticket.id)}
                                            className={`p-3 rounded-xl transition-all border ${ticket.status === 'RESOLVED'
                                                    ? 'bg-tiktok-cyan/10 border-tiktok-cyan/20 text-tiktok-cyan hover:bg-tiktok-cyan hover:text-black'
                                                    : 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteTicket(ticket.id)}
                                            className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedId === ticket.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 mt-6 border-t border-white/5">
                                                <div className="p-6 bg-black/40 rounded-2xl">
                                                    <p className="text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
                                                        {ticket.message}
                                                    </p>
                                                </div>
                                                {ticket.user && (
                                                    <div className="mt-4 flex items-center gap-3 px-2">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic border border-white/10">
                                                            {ticket.user.fullName?.charAt(0)}
                                                        </div>
                                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                            Reporter: <span className="text-white">{ticket.user.fullName}</span> ({ticket.user.email})
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminDashboard;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    QrCode,
    ShieldCheck,
    ChevronRight,
    Loader2,
    CheckCircle2,
    X,
    Lock,
    Zap,
    Wallet
} from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess, amount = 49.99, campaignName = "" }) => {
    const [step, setStep] = useState('selection'); // selection, processing, success
    const [method, setMethod] = useState('card'); // card, qr
    const [loading, setLoading] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            setTimeout(() => {
                onPaymentSuccess();
            }, 2000);
        }, 2500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden shadow-3xl"
            >
                {step !== 'success' && (
                    <div className="relative p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Checkout <span className="text-tiktok-cyan">Protocol</span></h3>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Campaign: {campaignName}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Amount Card */}
                        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Ad Budget</p>
                                <p className="text-3xl font-black italic tracking-tighter text-white">${amount}</p>
                            </div>
                            <div className="w-12 h-12 bg-tiktok-pink/10 rounded-xl flex items-center justify-center text-tiktok-pink">
                                <Zap className="w-6 h-6 fill-tiktok-pink" />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 mb-8">
                            <button
                                onClick={() => setMethod('card')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${method === 'card' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                <CreditCard className="w-4 h-4" />
                                Card
                            </button>
                            <button
                                onClick={() => setMethod('qr')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${method === 'qr' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                <QrCode className="w-4 h-4" />
                                QR Code
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {method === 'card' ? (
                                <motion.div
                                    key="card"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 italic ml-2">Card Number</label>
                                        <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white font-mono tracking-widest text-sm">
                                            •••• •••• •••• 4242
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 italic ml-2">Expiry</label>
                                            <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white font-mono text-sm">12 / 28</div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 italic ml-2">CVC</label>
                                            <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-white font-mono text-sm">•••</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="qr"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex flex-col items-center py-6"
                                >
                                    <div className="relative p-6 bg-white rounded-3xl mb-4 shadow-2xl shadow-white/10">
                                        {/* Mock QR Code - More Structured */}
                                        <div className="w-40 h-40 bg-white relative flex flex-wrap content-start">
                                            {/* Corner blocks */}
                                            <div className="absolute top-0 left-0 w-12 h-12 border-[6px] border-black p-1">
                                                <div className="w-full h-full bg-black" />
                                            </div>
                                            <div className="absolute top-0 right-0 w-12 h-12 border-[6px] border-black p-1">
                                                <div className="w-full h-full bg-black" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-12 h-12 border-[6px] border-black p-1">
                                                <div className="w-full h-full bg-black" />
                                            </div>

                                            {/* Random data noise but structured */}
                                            <div className="grid grid-cols-10 gap-1 w-full h-full p-2">
                                                {Array.from({ length: 100 }).map((_, i) => {
                                                    // Skip corners
                                                    const row = Math.floor(i / 10);
                                                    const col = i % 10;
                                                    const isCorner = (row < 3 && col < 3) || (row < 3 && col > 6) || (row > 6 && col < 3);
                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`w-full h-full ${!isCorner && Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-white p-2 rounded-xl border-2 border-zinc-100 shadow-lg">
                                                <Zap className="w-6 h-6 text-tiktok-pink fill-tiktok-pink" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-white bg-tiktok-cyan/20 px-4 py-1.5 rounded-full border border-tiktok-cyan/20 uppercase tracking-widest">
                                        Scan to pay with any UPI App
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={handlePay}
                            disabled={loading}
                            className="w-full mt-10 py-5 bg-white text-black font-black italic uppercase text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Confirm & Launch
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-tiktok-pink/20 to-tiktok-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 opacity-50">
                            <Lock className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">End-to-End Encrypted Transaction</span>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-16 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12 }}
                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/20"
                        >
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </motion.div>
                        <h3 className="text-4xl font-black italic tracking-tighter text-white mb-4 uppercase">Payment <span className="text-tiktok-cyan">Done!</span></h3>
                        <p className="text-gray-400 font-medium max-w-[240px]">
                            Your campaign funds have been secured. Initializing viral launch sequence...
                        </p>

                        <div className="mt-12 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-gradient-to-r from-tiktok-cyan to-tiktok-pink"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentModal;

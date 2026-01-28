import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalErrorBanner = ({ error, onClear }) => {
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-red-500/10 border-b border-red-500/20 text-red-400 overflow-hidden"
                >
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-medium">
                                {typeof error === 'string' ? error : error.message || 'An unexpected error occurred.'}
                                {error.status && <span className="ml-2 px-1.5 py-0.5 bg-red-500/20 rounded text-[10px]">Status: {error.status}</span>}
                            </p>
                        </div>
                        <button
                            onClick={onClear}
                            className="p-1 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalErrorBanner;

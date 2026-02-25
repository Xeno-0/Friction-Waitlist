import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNotification } from '../lib/NotificationContext';

export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    showNotification('You are already on the list.', 'error');
                } else {
                    showNotification(error.message || 'Failed to join.', 'error');
                }
            } else {
                showNotification('Access Granted. Welcome to the waitlist.', 'success');
                setEmail(""); // clear input
            }
        } catch (err) {
            showNotification('An error occurred.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-void text-paper relative flex flex-col justify-end pt-32 pb-8 px-8 min-h-[60vh]">

            {/* CTA Block */}
            <div className="flex flex-col items-center justify-center flex-1 max-w-2xl mx-auto w-full mb-32 text-center">
                <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight-custom mb-10">
                    Embrace the Friction
                </h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full relative flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            placeholder="Enter your email"
                            required
                            className="w-full bg-mist/10 border border-gray-800 rounded-[1rem] px-6 py-4 font-mono text-sm focus:outline-none focus:border-mist focus:bg-mist/20 transition-all placeholder:text-mist-600 text-white disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="shrink-0 w-full sm:w-auto px-8 py-4 bg-spark text-paper font-sans font-medium tracking-tight-custom uppercase rounded-[1rem] hover:bg-[#E64500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Booting..." : "Request Early Access"}
                        </button>
                    </div>
                </form>

                <div className="mt-12 flex flex-col items-center gap-6">

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Apple App Store Badge */}
                        <div className="w-[180px] h-[54px] bg-black border border-gray-800 rounded-lg flex items-center px-4 gap-3 select-none hover:bg-gray-900 transition-colors">
                            <svg width="22" height="26" viewBox="0 0 22 26" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.87 13.92C17.84 10.45 20.72 8.78 20.85 8.71C19.23 6.35 16.71 6.01 15.82 5.98C13.7 5.76 11.66 7.23 10.58 7.23C9.5 7.23 7.86 6.01 6.1 6.04C3.81 6.08 1.7 7.38 0.52 9.43C-1.88 13.56 0.13 19.66 2.45 23C3.58 24.63 4.93 26.47 6.69 26.4C8.42 26.33 9.04 25.3 11.13 25.3C13.22 25.3 13.81 26.4 15.6 26.33C17.43 26.27 18.6 24.63 19.72 23C21.03 21.09 21.56 19.25 21.58 19.16C21.54 19.14 17.89 17.74 17.87 13.92V13.92ZM14.49 4.14C15.44 2.99 16.08 1.41 15.9 0C14.54 0.05 12.91 0.91 11.93 2.05C11.05 3.06 10.28 4.69 10.49 6.05C11.99 6.17 13.53 5.3 14.49 4.14V4.14Z" />
                            </svg>
                            <div className="flex flex-col text-white text-left">
                                <span className="text-[9px] font-sans font-bold leading-none tracking-tight">COMING SOON TO</span>
                                <span className="text-xl font-sans font-bold leading-none mt-0.5">App Store</span>
                            </div>
                        </div>

                        {/* Google Play Badge */}
                        <div className="w-[180px] h-[54px] bg-black border border-gray-800 rounded-lg flex items-center px-4 gap-3 select-none hover:bg-gray-900 transition-colors">
                            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.52 1.34V22.66C0.52 23.23 0.81 23.64 1.25 23.86L12.39 12.72L1.25 1.58C0.81 1.8 0.52 2.21 0.52 2.78V1.34Z" fill="#2196F3" />
                                <path d="M16.32 16.65L12.39 12.72L1.25 23.86C1.47 23.97 1.76 24.03 2.05 24.03C2.5 24.03 2.95 23.91 3.35 23.68L16.32 16.65Z" fill="#4CAF50" />
                                <path d="M21.04 11.23L17.51 9.32L12.39 12.72L16.32 16.65L21.04 14.21C21.6 13.93 21.94 13.41 21.94 12.72C21.94 12.03 21.6 11.51 21.04 11.23Z" fill="#F44336" />
                                <path d="M16.32 8.79L3.35 1.76C2.95 1.53 2.5 1.41 2.05 1.41C1.76 1.41 1.47 1.47 1.25 1.58L12.39 12.72L16.32 8.79Z" fill="#FFC107" />
                            </svg>
                            <div className="flex flex-col text-white text-left">
                                <span className="text-[9px] font-sans font-bold leading-none tracking-tight">COMING SOON TO</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-sans font-bold leading-none mt-0.5">Google</span>
                                    <span className="text-lg font-sans font-normal leading-none opacity-90">Play</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Grid */}
            <div className="border-t border-gray-800 pt-8 w-full">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 font-mono text-xs text-mist-500 uppercase tracking-widest">

                    {/* Links */}
                    <div className="flex gap-8">
                        <a
                            href="mailto:vansh.vashist2005@gmail.com"
                            className="px-6 py-2 border border-gray-800 rounded-full hover:bg-gray-900 hover:border-gray-700 transition-all text-mist-300 hover:text-white flex items-center gap-2 group"
                        >
                            <span>Contact Us</span>
                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-spark">→</span>
                        </a>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mt-auto">
                        <span>System Status: Restoring Attention Span</span>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spark opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-spark"></span>
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}

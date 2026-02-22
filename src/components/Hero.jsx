import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { supabase } from '../lib/supabase';

export default function Hero() {
    const comp = useRef(null);
    const ctaBtnRef = useRef(null);
    const bgContainerRef = useRef(null);

    const fullPlaceholder = "Enter email to join waitlist...";
    const [placeholder, setPlaceholder] = useState("");

    // Form State
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, success, error
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Postgres unique violation code
                    setStatus('error');
                    setMessage('You are already on the waitlist.');
                } else {
                    setStatus('error');
                    setMessage(error.message || 'Failed to join. Please try again.');
                }
            } else {
                setStatus('success');
                setMessage('Access Granted. You are on the list.');
                setEmail(""); // clear input
            }
        } catch (err) {
            setStatus('error');
            setMessage('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Typewriter effect for placeholder
        let idx = 0;
        let interval;

        const startTyping = () => {
            interval = setInterval(() => {
                setPlaceholder(fullPlaceholder.substring(0, idx + 1));
                idx++;
                if (idx > fullPlaceholder.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        idx = 0;
                        setPlaceholder("");
                        startTyping();
                    }, 3000); // Pause before restarting
                }
            }, 100);
        };
        startTyping();

        return () => clearInterval(interval);
    }, []);

    // Glitch effect is now handled purely in CSS

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Simple hover effect for Hero CTA
            if (ctaBtnRef.current) {
                ctaBtnRef.current.addEventListener('mousedown', () => {
                    gsap.to(ctaBtnRef.current, { scale: 0.95, duration: 0.1 });
                });
                ctaBtnRef.current.addEventListener('mouseup', () => {
                    gsap.to(ctaBtnRef.current, { scale: 1, duration: 0.1 });
                });
                ctaBtnRef.current.addEventListener('mouseleave', () => {
                    gsap.to(ctaBtnRef.current, { scale: 1, duration: 0.1 });
                });
            }

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-paper">

            {/* Subtle, safe Animated Grid Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
                <div
                    className="absolute inset-[-100%] bg-grid-pattern opacity-100"
                    style={{
                        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, white 40%, transparent 80%)"
                    }}
                ></div>
            </div>

            {/* Overlay Texture */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
            ></div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mt-12">
                <h1 className="text-[clamp(4rem,10vw,8rem)] leading-[0.9] font-sans font-bold tracking-tight-custom uppercase flex flex-col items-center select-none">
                    {/* Outline Text */}
                    <span
                        className="text-transparent"
                        style={{ WebkitTextStroke: '2px var(--color-void)' }}
                    >
                        Break the
                    </span>
                    {/* Solid Text with Glitch */}
                    <span
                        className="text-void relative inline-block cursor-pointer glitch-text"
                        data-text="Loop."
                    >
                        Loop.
                    </span>
                </h1>

                {/* CTA Form */}
                <form onSubmit={handleSubmit} className="mt-16 sm:mt-24 w-full max-w-lg flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading || status === 'success'}
                            placeholder={placeholder}
                            required
                            className="w-full bg-white/50 backdrop-blur-md border border-mist-300 rounded-[1rem] px-6 py-4 font-mono text-sm focus:outline-none focus:border-void focus:bg-white transition-all placeholder:text-void/40 hover:bg-white/80 shadow-sm disabled:opacity-50"
                        />
                        <button
                            ref={ctaBtnRef}
                            type="submit"
                            disabled={loading || status === 'success'}
                            className="shrink-0 w-full sm:w-auto px-8 py-4 bg-void text-paper font-sans font-medium tracking-tight-custom uppercase rounded-[1rem] hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Booting..." : (status === 'success' ? "Verified" : "Sign Me Up")}
                        </button>
                    </div>
                    {/* Status Message */}
                    {message && (
                        <div className={`text-sm font-mono mt-2 ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}

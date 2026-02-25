import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { supabase } from '../lib/supabase';
import { useNotification } from '../lib/NotificationContext';

export default function Hero() {
    const comp = useRef(null);
    const ctaBtnRef = useRef(null);
    const bgContainerRef = useRef(null);

    const fullPlaceholder = "Enter email to join waitlist...";
    const [placeholder, setPlaceholder] = useState("");

    // Form State
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
                    showNotification('You are already on the waitlist.', 'error');
                } else {
                    showNotification(error.message || 'Failed to join. Please try again.', 'error');
                }
            } else {
                showNotification('Access Granted. You are on the list.', 'success');
                setEmail(""); // clear input
            }
        } catch (err) {
            showNotification('An unexpected error occurred.', 'error');
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

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="bg-grid-pattern opacity-100"
                    style={{
                        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, white 40%, transparent 80%)"
                    }}
                ></div>
            </div>

            {/* Organic Forward-Traveling Waves */}
            <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
                <svg viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

                    {/* Wave 1 — travels at 9s, highest opacity */}
                    <g>
                        <animateTransform attributeName="transform" type="translate" from="0 0" to="-800 0" dur="9s" repeatCount="indefinite" />
                        <path fill="none" stroke="var(--color-void)" strokeWidth="2"
                            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                            <animate attributeName="d"
                                dur="24s"
                                repeatCount="indefinite"
                                calcMode="spline"
                                keyTimes="0; 0.4; 0.6; 1"
                                keySplines="0.42 0 0.58 1; 0 0 1 1; 0.42 0 0.58 1"
                                values="
                                    M 0 200 C 200 50, 600 350, 800 200 C 1000 50, 1400 350, 1600 200 C 1800 50, 2200 350, 2400 200 C 2600 50, 3000 350, 3200 200;
                                    M 0 200 C 200 198, 600 202, 800 200 C 1000 198, 1400 202, 1600 200 C 1800 198, 2200 202, 2400 200 C 2600 198, 3000 202, 3200 200;
                                    M 0 200 C 200 198, 600 202, 800 200 C 1000 198, 1400 202, 1600 200 C 1800 198, 2200 202, 2400 200 C 2600 198, 3000 202, 3200 200;
                                    M 0 200 C 200 50, 600 350, 800 200 C 1000 50, 1400 350, 1600 200 C 1800 50, 2200 350, 2400 200 C 2600 50, 3000 350, 3200 200
                                " />
                        </path>
                    </g>

                    {/* Wave 2 — travels at 13s, medium opacity */}
                    <g>
                        <animateTransform attributeName="transform" type="translate" from="0 0" to="-800 0" dur="13s" repeatCount="indefinite" />
                        <path fill="none" stroke="var(--color-void)" strokeWidth="2"
                            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
                            <animate attributeName="d"
                                dur="24s"
                                repeatCount="indefinite"
                                calcMode="spline"
                                keyTimes="0; 0.4; 0.6; 1"
                                keySplines="0.42 0 0.58 1; 0 0 1 1; 0.42 0 0.58 1"
                                values="
                                    M 0 200 C 266 380, 533 20, 800 200 C 1066 380, 1333 20, 1600 200 C 1866 380, 2133 20, 2400 200 C 2666 380, 2933 20, 3200 200;
                                    M 0 200 C 266 202, 533 198, 800 200 C 1066 202, 1333 198, 1600 200 C 1866 202, 2133 198, 2400 200 C 2666 202, 2933 198, 3200 200;
                                    M 0 200 C 266 202, 533 198, 800 200 C 1066 202, 1333 198, 1600 200 C 1866 202, 2133 198, 2400 200 C 2666 202, 2933 198, 3200 200;
                                    M 0 200 C 266 380, 533 20, 800 200 C 1066 380, 1333 20, 1600 200 C 1866 380, 2133 20, 2400 200 C 2666 380, 2933 20, 3200 200
                                " />
                        </path>
                    </g>

                    {/* Wave 3 — travels at 18s, lowest opacity */}
                    <g>
                        <animateTransform attributeName="transform" type="translate" from="0 0" to="-800 0" dur="18s" repeatCount="indefinite" />
                        <path fill="none" stroke="var(--color-void)" strokeWidth="2"
                            vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" opacity="0.12">
                            <animate attributeName="d"
                                dur="24s"
                                repeatCount="indefinite"
                                calcMode="spline"
                                keyTimes="0; 0.4; 0.6; 1"
                                keySplines="0.42 0 0.58 1; 0 0 1 1; 0.42 0 0.58 1"
                                values="
                                    M 0 200 C 150 0, 650 400, 800 200 C 950 0, 1450 400, 1600 200 C 1750 0, 2250 400, 2400 200 C 2550 0, 3050 400, 3200 200;
                                    M 0 200 C 150 196, 650 204, 800 200 C 950 196, 1450 204, 1600 200 C 1750 196, 2250 204, 2400 200 C 2550 196, 3050 204, 3200 200;
                                    M 0 200 C 150 196, 650 204, 800 200 C 950 196, 1450 204, 1600 200 C 1750 196, 2250 204, 2400 200 C 2550 196, 3050 204, 3200 200;
                                    M 0 200 C 150 0, 650 400, 800 200 C 950 0, 1450 400, 1600 200 C 1750 0, 2250 400, 2400 200 C 2550 0, 3050 400, 3200 200
                                " />
                        </path>
                    </g>

                </svg>
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
                        Loop
                    </span>
                </h1>

                {/* CTA Form */}
                <form onSubmit={handleSubmit} className="mt-16 sm:mt-24 w-full max-w-lg flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            placeholder={placeholder}
                            required
                            className="w-full bg-white/50 backdrop-blur-md border border-mist-300 rounded-[1rem] px-6 py-4 font-mono text-sm focus:outline-none focus:border-void focus:bg-white transition-all placeholder:text-void/40 hover:bg-white/80 shadow-sm disabled:opacity-50"
                        />
                        <button
                            ref={ctaBtnRef}
                            type="submit"
                            disabled={loading}
                            className="shrink-0 w-full sm:w-auto px-8 py-4 bg-void text-paper font-sans font-medium tracking-tight-custom uppercase rounded-[1rem] hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting.." : "Sign Me Up"}
                        </button>
                    </div>
                </form>
            </div>
        </section >
    );
}

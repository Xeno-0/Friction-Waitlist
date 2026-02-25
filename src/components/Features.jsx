import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Smartphone } from 'lucide-react';
import qrCodeImg from '../assets/qr-code.png';
import breathingFlowSvg from '../assets/breathing-flow.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const containerRef = useRef(null);

    // Refs for Card 2 (QR)
    const scanLineRef = useRef(null);

    // State & Refs for Card 3 (Typewriter)
    const fullText = "I will close this app and make my parents proud.";
    const [typedText, setTypedText] = useState("");
    const typeCursorRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // ------------------------------------------------
            // Card 2: QR Scan Animation
            // ------------------------------------------------
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#card-2",
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                },
                repeat: -1,
            });

            tl2.fromTo(scanLineRef.current,
                { y: -10 },
                { y: 110, duration: 1.5, ease: "power1.inOut" }
            )
                .to(scanLineRef.current, { y: -10, duration: 1.5, ease: "power1.inOut" });

            // ------------------------------------------------
            // Card 3: Typewriter Animation
            // ------------------------------------------------
            ScrollTrigger.create({
                trigger: "#card-3",
                start: "top 70%",
                onEnter: () => {
                    let currentStr = "";
                    let idx = 0;
                    const interval = setInterval(() => {
                        currentStr += fullText[idx];
                        setTypedText(currentStr);
                        idx++;
                        if (idx === fullText.length) {
                            clearInterval(interval);
                            gsap.to(typeCursorRef.current, { opacity: 0, duration: 0.1 });
                        }
                    }, 60); // Typewriting speed
                },
                once: true
            });

            // Card 3: Cursor blink
            gsap.to(typeCursorRef.current, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.4,
                ease: "steps(1)"
            });

        }, containerRef);

        return () => ctx.revert();
    }, [fullText]);

    return (
        <section id="features" ref={containerRef} className="py-32 px-4 w-full bg-paper relative overflow-hidden">
            <div className="max-w-6xl w-full mx-auto flex flex-col gap-16">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight-custom text-void">
                        Some Friction is Necessary.
                    </h2>
                    <p className="mt-4 font-mono text-mist-900 text-sm max-w-xl mx-auto opacity-70">
                        For fixing the root cause of your bad habits.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Breathing Flow (animated SVG) */}
                    {/* CHANGED: bg-white to bg-[#1A1A1A] */}
                    <div id="card-1" className="flex flex-col border border-mist rounded-[1.5rem] bg-[#1A1A1A] overflow-hidden shadow-sm">
                        <div className="h-64 bg-gray-100 flex items-center justify-center p-6 relative">
                            {/* Dark Inner Box */}
                            <div className="relative z-10 w-full max-w-[220px] aspect-square bg-[#1A1A1A] rounded-[1rem] shadow-2xl border border-gray-800 flex items-center justify-center overflow-hidden">
                                <img
                                    src={breathingFlowSvg}
                                    alt="Friction 3-state breathing flow animation"
                                    className="w-[120%] h-[120%] object-cover max-w-none"
                                    style={{ objectPosition: 'center' }}
                                />
                            </div>
                        </div>
                        {/* CHANGED: Added flex-1, removed mt-auto */}
                        <div className="flex-1 p-6 border-t border-gray-800 bg-[#1A1A1A]">
                            <h3 className="font-sans font-bold text-lg text-white">Stop. Breathe. Choose.</h3>
                            <p className="mt-2 text-sm font-sans text-gray-400">
                                Other Apps make you stare at a moving bubble. We make you actually keep the phone down
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Scan to Scroll */}
                    {/* CHANGED: bg-white to bg-[#1A1A1A] */}
                    <div id="card-2" className="flex flex-col border border-mist rounded-[1.5rem] bg-[#1A1A1A] overflow-hidden shadow-sm">
                        <div className="h-64 bg-gray-100 flex items-center justify-center p-6 relative">
                            {/* Background representation of feed */}
                            <div className="absolute inset-0 flex flex-col gap-3 p-4 opacity-30 blur-sm pointer-events-none">
                                <div className="w-full h-8 bg-gray-300 rounded"></div>
                                <div className="w-full h-32 bg-gray-300 rounded-xl"></div>
                                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
                            </div>

                            {/* Dark Inner Box (QR Scan Overlay) */}
                            <div className="relative z-10 w-full max-w-[220px] aspect-square bg-void text-paper rounded-[1rem] p-5 shadow-2xl border border-gray-800 flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-3 w-full justify-start">
                                    <Zap className="w-4 h-4 text-spark" />
                                    <span className="text-xs font-sans tracking-tight-custom uppercase text-mist">Scan to Proceed</span>
                                </div>

                                <div className="relative w-24 h-24 bg-white p-1 rounded-lg mb-3 overflow-hidden shadow-inner flex items-center justify-center">
                                    <img
                                        src={qrCodeImg}
                                        alt="Verification QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                    {/* Animated Scan Line */}
                                    <div
                                        ref={scanLineRef}
                                        className="absolute left-0 right-0 h-0.5 bg-spark shadow-[0_0_8px_rgba(255,77,0,0.8)] z-20"
                                        style={{ top: 0 }}
                                    />
                                    {/* Scanning Glow Effect */}
                                    <div className="absolute inset-0 bg-spark/5 pointer-events-none"></div>
                                </div>

                                <div className="text-[10px] font-mono text-mist/60">WAITING FOR SCAN...</div>
                            </div>
                        </div>
                        {/* CHANGED: Added flex-1, removed mt-auto */}
                        <div className="flex-1 p-6 border-t border-gray-800 bg-[#1A1A1A]">
                            <h3 className="font-sans font-bold text-lg text-white">Scan to Scroll</h3>
                            <p className="mt-2 text-sm font-sans text-gray-400">
                                Want to use social media? Scan the QR code of an object lying in the other room first.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Positive Reinforcement */}
                    {/* CHANGED: bg-white to bg-[#1A1A1A] */}
                    <div id="card-3" className="flex flex-col border border-mist rounded-[1.5rem] bg-[#1A1A1A] overflow-hidden shadow-sm">
                        <div className="h-64 bg-gray-100 flex items-center justify-center p-6 relative">
                            {/* Background representation of feed */}
                            <div className="absolute inset-0 flex flex-col gap-3 p-4 opacity-30 blur-sm pointer-events-none">
                                <div className="w-full h-32 bg-gray-300 rounded-xl"></div>
                                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                            </div>

                            {/* Modal Overlay */}
                            <div className="relative z-10 w-full max-w-[220px] aspect-square bg-void text-paper rounded-[1rem] p-5 shadow-2xl border border-gray-800 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <Smartphone className="w-4 h-4 text-spark" />
                                    <span className="text-xs font-sans tracking-tight-custom uppercase text-mist">Unlock Intent</span>
                                </div>
                                <div className="font-mono text-xs sm:text-sm leading-relaxed min-h-[60px]">
                                    {typedText}<span ref={typeCursorRef} className="inline-block w-2.5 h-4 bg-spark ml-1 align-middle"></span>
                                </div>
                            </div>
                        </div>

                        {/* CHANGED: Added flex-1, removed mt-auto */}
                        <div className="flex-1 p-6 border-t border-gray-800 bg-[#1A1A1A]">
                            <h3 className="font-sans font-bold text-lg text-white">Positive Reinforcement</h3>
                            <p className="mt-2 text-sm font-sans text-gray-400">
                                Rewire your brain completely. One affirmation at a time.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
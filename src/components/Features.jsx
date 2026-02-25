import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Smartphone } from 'lucide-react';
import qrCodeImg from '../assets/qr-code.png';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const containerRef = useRef(null);

    // Typewriter State for Card 1
    const fullText = "I will close this app and make my parents proud.";
    const [typedText, setTypedText] = useState("");
    const typeCursorRef = useRef(null);

    // Refs for Card 2
    const scanLineRef = useRef(null);
    const qrContainerRef = useRef(null);

    // Counter Ref for Card 3
    const counterRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Setup ScrollTriggers for each card's animation

            // Card 1: Typewriter Animation
            ScrollTrigger.create({
                trigger: "#card-1",
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

            // Card 1: Cursor blink
            gsap.to(typeCursorRef.current, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.4,
                ease: "steps(1)"
            });

            // Card 2: QR Scan Animation
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



            // Card 3: Slot Machine Counter Animation
            ScrollTrigger.create({
                trigger: "#card-3",
                start: "top 80%",
                onEnter: () => {
                    const target = { val: 12000 };
                    gsap.to(target, {
                        val: 14203,
                        duration: 3,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (counterRef.current) {
                                counterRef.current.innerText = Math.floor(target.val).toLocaleString();
                            }
                        }
                    });
                },
                once: true
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

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

                    {/* Card 1: Positive Reinforcement */}
                    <div id="card-1" className="flex flex-col border border-mist rounded-[1.5rem] bg-white overflow-hidden shadow-sm">
                        <div className="h-64 bg-gray-100 flex items-center justify-center p-6 relative">
                            {/* Background representation of feed */}
                            <div className="absolute inset-0 flex flex-col gap-3 p-4 opacity-30 blur-sm pointer-events-none">
                                <div className="w-full h-32 bg-gray-300 rounded-xl"></div>
                                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                            </div>

                            {/* Modal Overlay */}
                            <div className="relative z-10 w-full bg-void text-paper rounded-[1rem] p-5 shadow-2xl border border-gray-800">
                                <div className="flex items-center gap-2 mb-3">
                                    <Smartphone className="w-4 h-4 text-spark" />
                                    <span className="text-xs font-sans tracking-tight-custom uppercase text-mist">Unlock Intent</span>
                                </div>
                                <div className="font-mono text-xs sm:text-sm leading-relaxed min-h-[40px]">
                                    {typedText}<span ref={typeCursorRef} className="inline-block w-2.5 h-4 bg-spark ml-1 align-middle"></span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-mist">
                            <h3 className="font-sans font-bold text-lg text-void">Positive Reinforcement</h3>
                            <p className="mt-2 text-sm font-sans text-gray-500">
                                Rewire your brain completely. One affirmation at a time.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: The Cognitive Cache */}
                    <div id="card-2" className="flex flex-col border border-mist rounded-[1.5rem] bg-white overflow-hidden shadow-sm">
                        <div className="h-64 bg-gray-100 flex items-center justify-center p-6 relative">
                            {/* Background representation of feed */}
                            <div className="absolute inset-0 flex flex-col gap-3 p-4 opacity-30 blur-sm pointer-events-none">
                                <div className="w-full h-8 bg-gray-300 rounded"></div>
                                <div className="w-full h-32 bg-gray-300 rounded-xl"></div>
                                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
                            </div>

                            {/* QR Scan Overlay */}
                            <div className="relative z-10 w-full max-w-[200px] bg-void text-paper rounded-[1rem] p-5 shadow-2xl border border-gray-800 flex flex-col items-center">
                                <div className="flex items-center gap-2 mb-4 w-full justify-start">
                                    <Zap className="w-4 h-4 text-spark" />
                                    <span className="text-xs font-sans tracking-tight-custom uppercase text-mist">Scan to Proceed</span>
                                </div>

                                <div className="relative w-24 h-24 bg-white p-1 rounded-lg mb-2 overflow-hidden shadow-inner flex items-center justify-center">
                                    {/* User-provided QR Code Image */}
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

                                <div className="text-[10px] font-mono text-mist/60 mt-1">WAITING FOR SCAN...</div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-mist">
                            <h3 className="font-sans font-bold text-lg text-void">Intentionally Annoying</h3>
                            <p className="mt-2 text-sm font-sans text-gray-500">
                                Want to use social media? Scan the QR code of an object lying in the other room first.
                            </p>
                        </div>
                    </div>

                    {/* Card 3: The Time Vault */}
                    <div id="card-3" className="flex flex-col border border-mist rounded-[1.5rem] bg-void text-paper overflow-hidden shadow-sm relative">
                        <div className="h-64 flex flex-col items-center justify-center p-6 relative z-10">
                            <Zap className="w-8 h-8 text-spark mb-6 opacity-80" />
                            <div className="text-sm font-mono text-mist uppercase tracking-widest mb-2 opacity-60">
                                Dopamine Cycles Saved
                            </div>
                            <div className="text-5xl lg:text-6xl font-sans font-bold tracking-tight-custom text-white tabular-nums">
                                <span ref={counterRef}>12,000</span>
                            </div>
                        </div>

                        {/* Subtle glow behind counter */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-spark/20 blur-[60px] rounded-full pointer-events-none z-0"></div>

                        <div className="p-6 border-t border-gray-800 relative z-10 mt-auto bg-void">
                            <h3 className="font-sans font-bold text-lg text-white">Built to be Annoying, Intentionally</h3>
                            <p className="mt-2 text-sm font-sans text-gray-400">
                                Instead of scrolling, use the time to become a better version of yourself
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

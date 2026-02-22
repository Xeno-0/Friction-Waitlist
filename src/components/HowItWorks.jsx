import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fingerprint, RefreshCcw } from 'lucide-react';
import mindfulSwipeVideo from '../assets/mindful_swipe.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const containerRef = useRef(null);
    const progressBarRef = useRef(null);

    // Refs for animations
    const puzzlePieceRef = useRef(null);
    const puzzleGlowRef = useRef(null);
    const dopamineIconRef = useRef(null);
    const dopamineTextRef = useRef(null);

    const steps = [
        {
            id: "step-1",
            title: "Interruption",
            description: "When you attempt to open a distracting app, Friction instantly intercepts the action, giving you time to rethink.",
            visual: (
                <div className="w-full h-full bg-void flex items-center justify-center relative overflow-hidden rounded-xl border border-void shadow-inner">
                    {/* User Provided Video */}
                    <video
                        src={mindfulSwipeVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />

                </div>
            )
        },
        {
            id: "step-2",
            title: "Challenge",
            description: "You must complete a task: Writing a positive phrase, Scanning a QR code, Sliding a really slow slider, etc. Your brain moves from autopilot to manual control.",
            visual: (
                <div className="w-full h-full bg-void flex flex-col items-center justify-center relative overflow-hidden rounded-xl border border-void">
                    <div className="text-xs font-mono text-mist-200 mb-4 uppercase tracking-widest flex items-center gap-2">
                        <Fingerprint size={14} className="text-spark" /> Take a breather
                    </div>
                    {/* Slider Puzzle Track */}
                    <div className="w-4/5 h-12 bg-gray-800 rounded-full relative border border-gray-700 overflow-hidden shadow-inner flex items-center">
                        <div className="absolute right-3 text-xs font-mono font-bold text-mist-400 capitalize">Slide to Unlock (0/3)</div>
                        {/* The Puzzle Piece */}
                        <div ref={puzzlePieceRef} className="absolute left-1 top-1 bottom-1 w-14 bg-white rounded-full shadow-md border border-mist flex flex-col items-center justify-center z-10">
                            <div className="w-1 h-3 bg-gray-300 rounded-full mb-[2px]"></div>
                            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                        </div>
                        {/* Completion Glow */}
                        <div ref={puzzleGlowRef} className="absolute inset-0 bg-green-400/20 opacity-0 z-0"></div>
                    </div>
                </div>
            )
        },
        {
            id: "step-3",
            title: "Release",
            description: "Your favourite app which you once opened in miliseconds, now takes you 20-30 seconds and manual effort to use. Over time, the urge fades.",
            visual: (
                <div className="w-full h-full bg-green-50 flex flex-col items-center justify-center relative overflow-hidden rounded-xl border border-void">
                    <div ref={dopamineIconRef} className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] mb-4 shrink-0">
                        <RefreshCcw size={28} className="text-white" />
                    </div>
                    <div ref={dopamineTextRef} className="font-sans font-bold text-xl text-green-400 tracking-tight-custom text-center px-4">
                        +1 Dopamine Cycle Restored.
                    </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Overall Progress Bar
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
                animation: gsap.fromTo(progressBarRef.current, { height: "0%" }, { height: "100%", ease: "none" })
            });

            // Step 1: Shield Intercept Animation
            // (Animation removed as per user request to only show video)

            // Step 2: Slider Puzzle Animation
            const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            tl2.fromTo(puzzlePieceRef.current,
                { x: 0 },
                { x: "calc(100% + 140px)", duration: 1.5, ease: "power2.inOut" } // Move to the right
            )
                .to(puzzleGlowRef.current, { opacity: 1, duration: 0.2 }, "-=0.2") // Flash green
                .to(puzzleGlowRef.current, { opacity: 0, duration: 0.2 }, "+=0.5")
                .set(puzzlePieceRef.current, { x: 0 }); // Reset instantly

            // Step 3: Dopamine Restore Animation
            const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
            tl3.fromTo(dopamineIconRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
            )
                .fromTo(dopamineTextRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                    "-=0.4"
                )
                .to([dopamineIconRef.current, dopamineTextRef.current], { opacity: 0, y: -10, duration: 0.4, delay: 2 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="how-it-works" ref={containerRef} className="py-32 px-4 w-full bg-void relative">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-24 sticky top-12 z-10 w-full backdrop-blur-sm bg-void/80 py-4 border-b border-gray-800">
                    <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight-custom text-white mb-2">
                        DEFEAT THE BRAINROT
                    </h2>
                    <p className="text-mist-200 font-serif italic text-lg">Here is how friction helps :-</p>
                </div>

                <div className="relative flex gap-8 md:gap-16">

                    {/* Progress Bar Track on Left */}
                    <div className="relative w-1 bg-gray-800 flex-shrink-0 ml-4 md:ml-0 hidden md:block rounded-full">
                        <div
                            ref={progressBarRef}
                            className="absolute top-0 left-0 w-full bg-spark rounded-full"
                        />
                    </div>

                    {/* Cards Stack */}
                    <div className="flex flex-col gap-64 w-full pb-32">
                        {steps.map((step, idx) => (
                            <div
                                key={step.id}
                                className="sticky flex flex-col md:flex-row gap-8 items-center bg-paper border border-gray-200 p-8 rounded-[1.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] tracking-tight-custom transition-all"
                                style={{ top: `calc(180px + ${idx * 20}px)` }}
                            >
                                {/* Text Content */}
                                <div className="w-full md:w-1/2">
                                    <div className="text-spark font-mono text-xs font-bold uppercase tracking-widest mb-3">Phase 0{idx + 1}</div>
                                    <h3 className="text-2xl font-bold text-void mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-sans">{step.description}</p>
                                </div>

                                {/* Visual Content */}
                                <div className="w-full md:w-1/2 h-64 shadow-inner rounded-xl overflow-hidden">
                                    {step.visual}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

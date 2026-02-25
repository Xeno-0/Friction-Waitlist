import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const containerRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

            // Set initial states explicitly to prevent any flash of unstyled content
            gsap.set(leftTextRef.current, { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, y: -20 });
            gsap.set(rightTextRef.current, { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0, x: -20 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%", // Trigger slightly lower down
                    once: true // Only ever play once
                }
            });

            // Left Side: Wipes down from top to bottom
            tl.to(leftTextRef.current,
                { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, y: 0, duration: 1.2, ease: "power3.inOut" }
            )
                // Right Side: Wipes in left to right
                .to(rightTextRef.current,
                    { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, x: 0, textShadow: "0px 0px 20px rgba(255,255,255,0.4)", duration: 1.2, ease: "power2.out" },
                    "-=0.4" // Slight overlap
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={containerRef} className="py-48 px-4 w-full bg-void text-paper min-h-[80vh] flex items-center justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">

                {/* Left Side: The Problem */}
                <div className="flex flex-col pr-8 md:border-r md:border-gray-800">
                    <p
                        ref={leftTextRef}
                        className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-paper leading-tight"
                        style={{ opacity: 0 }} // Hard-hide immediately before React mounts GSAP
                    >
                        "The Algorithm is designed to earn from your time"
                    </p>
                </div>

                {/* Right Side: The Solution */}
                <div className="flex flex-col md:pl-8">
                    <p
                        ref={rightTextRef}
                        className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-paper leading-tight"
                        style={{ opacity: 0 }} // Hard-hide immediately before React mounts GSAP
                    >
                        "Friction is designed to defend your mind"
                    </p>
                </div>

            </div>
        </section>
    );
}

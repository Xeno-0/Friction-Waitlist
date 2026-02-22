import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ColdTurkey() {
    const containerRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);
    const frictionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(textRef1.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
                .fromTo(textRef2.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(frictionRef.current,
                    { opacity: 0, scale: 0.9, filter: "blur(10px)" },
                    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "elastic.out(1, 0.5)", color: "#FF4D00" },
                    "-=0.2"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="manifesto" ref={containerRef} className="py-48 px-4 w-full bg-paper text-void flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden">

            {/* Subtle background noise/texture for the paper */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

            <div className="max-w-5xl w-full text-center relative z-10 flex flex-col items-center gap-8">

                <h2
                    ref={textRef1}
                    className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-bold tracking-tight-custom leading-[1.1] text-void"
                >
                    You don't quit a habit<br /> cold turkey, and we understand that.
                </h2>

                <p
                    ref={textRef2}
                    className="text-[clamp(1.5rem,3vw,2.5rem)] font-serif italic text-mist-600 mt-4"
                >
                    Start with <span ref={frictionRef} className="font-sans font-bold not-italic inline-block drop-shadow-md">intentional friction.</span>
                </p>

            </div>
        </section>
    );
}

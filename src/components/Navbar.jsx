import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const comp = useRef(null);
    const sparkRef = useRef(null);
    const btnRef = useRef(null);
    const [isAtTop, setIsAtTop] = useState(true);

    // Scroll detection — passive listener for best performance
    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Spark jitter animation
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(sparkRef.current, {
                scale: 1.15,
                opacity: 0.7,
                rotation: 3,
                duration: 0.1,
                yoyo: true,
                repeat: 3,
                ease: 'power4.inOut',
                repeatDelay: 0.05,
                delay: 0.1,
                onComplete: function () {
                    this.restart(true);
                }
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    // Magnetic Button Logic
    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        gsap.to(btnRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    };

    const handleMouseDown = () => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, { scale: 0.95, duration: 0.1 });
    };

    const handleMouseUp = () => {
        if (!btnRef.current) return;
        gsap.to(btnRef.current, { scale: 1, duration: 0.1 });
    };

    return (
        <div ref={comp} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-[1280px] flex justify-center pointer-events-none">
            {/*
              Key fix: We use CSS `width` transition (not scaleX) so the text never squishes.
              The nav container transitions its own width via Tailwind classes.
              Both states use the same px-6 py-4 padding so content is never clipped.
            */}
            <nav
                className={`
                    pointer-events-auto
                    flex items-center justify-between
                    px-6 py-4
                    rounded-[1.5rem]
                    bg-paper/70 backdrop-blur-md
                    border border-mist shadow-sm
                    transition-[width,max-width] duration-[600ms] ease-[cubic-bezier(0.87,0,0.13,1)]
                    ${isAtTop
                        ? 'w-full max-w-[1280px]'
                        : 'w-[75%] max-w-[900px]'
                    }
                `}
            >
                {/* Logo */}
                <div className="flex items-center text-xl font-bold font-sans tracking-tight-custom select-none cursor-pointer shrink-0">
                    <span>Fr</span>
                    <span>i</span>
                    <div ref={sparkRef} className="mx-[1px] relative top-[1px] text-spark flex items-center justify-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0L0 9H5L4 16L12 6H6L7 0Z" fill="currentColor" />
                        </svg>
                    </div>
                    <span>ction</span>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-mist-600">
                    <a href="#how-it-works" className="hover:text-void transition-colors whitespace-nowrap">Roadmap</a>
                    <a href="#features" className="hover:text-void transition-colors whitespace-nowrap">Features</a>
                    <a href="#manifesto" className="hover:text-void transition-colors whitespace-nowrap">Mission</a>
                </div>

                {/* CTA */}
                <div
                    ref={btnRef}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    className="px-5 py-2.5 bg-void text-paper rounded-full text-sm font-medium tracking-tight-custom cursor-pointer transition-colors hover:bg-black uppercase shrink-0 whitespace-nowrap"
                >
                    Join Waitlist
                </div>
            </nav>
        </div>
    );
}

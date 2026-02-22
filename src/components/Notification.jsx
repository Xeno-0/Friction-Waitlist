import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNotification } from '../lib/NotificationContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Notification() {
    const { notification, clearNotification } = useNotification();
    const notificationRef = useRef(null);

    useEffect(() => {
        if (notification) {
            const tl = gsap.timeline();

            // Entrance
            tl.fromTo(notificationRef.current,
                { y: -100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );

            // Exit handled by Context clearing, but we can animate it out if we wanted
            // For simplicity, we'll let the entrance pop.
        }
    }, [notification]);

    if (!notification) return null;

    const isSuccess = notification.type === 'success';

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none w-full max-w-sm px-4">
            <div
                ref={notificationRef}
                className="bg-paper/80 backdrop-blur-xl border border-mist shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-3 pointer-events-auto cursor-pointer"
                onClick={clearNotification}
            >
                {isSuccess ? (
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                ) : (
                    <div className="bg-red-100 p-2 rounded-full">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                )}

                <div className="flex flex-col">
                    <span className="text-sm font-sans font-bold text-void">
                        {isSuccess ? 'Access Granted' : 'Observation'}
                    </span>
                    <span className="text-xs font-mono text-mist-900 opacity-70">
                        {notification.message}
                    </span>
                </div>
            </div>
        </div>
    );
}

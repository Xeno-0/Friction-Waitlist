import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import ColdTurkey from './components/ColdTurkey';
import Footer from './components/Footer';
import { NotificationProvider } from './lib/NotificationContext';
import Notification from './components/Notification';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <NotificationProvider>
      <Notification />
      <div className="relative w-full min-h-screen">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <Philosophy />
        <ColdTurkey />
        <Footer />
        <Analytics />
      </div>
    </NotificationProvider>
  );
}

export default App;

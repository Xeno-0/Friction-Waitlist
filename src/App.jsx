import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import HowItWorks from './components/HowItWorks';
import ColdTurkey from './components/ColdTurkey';
import Footer from './components/Footer';
import { trackPageView } from './lib/analytics';

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Philosophy />
      <ColdTurkey />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;

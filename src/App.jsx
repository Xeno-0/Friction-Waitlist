import { trackPageView } from './lib/analytics';
import { NotificationProvider } from './lib/NotificationContext';
import Notification from './components/Notification';

function App() {
  useEffect(() => {
    trackPageView();
  }, []);

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

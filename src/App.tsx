import KomorebiBackground from './components/KomorebiBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08100D] transition-colors duration-1000">
      {/* Background Layer */}
      <KomorebiBackground />
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full h-full">
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
}

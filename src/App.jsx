import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Background from "./Components/Background/Background";
import Home from "./Sections/Home/Home";
import About from "./Sections/About/About";

const App = () => {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null); // ✅ FIX 1: track the RAF id

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // ✅ FIX 2: was 0.6, too short
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ✅ FIX 2: proper ease-out
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf); // ✅ FIX 1: save the id
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current); // ✅ FIX 1: cancel on unmount
      lenis.destroy();
    };
  }, []);

  return (
    // ✅ FIX 3: removed pointer-events-none from main wrapper
    <div className="relative w-full min-h-screen bg-[#f3f6f9] overflow-x-hidden">
      <Background />
      <main className="relative z-10 w-full">
        <section
          id="home"
          className="w-full min-h-screen flex items-center justify-center"
        >
          <Home />
        </section>
        <section
          id="about"
          className="w-full min-h-screen flex items-center justify-center"
        >
          <About />
        </section>
      </main>
    </div>
  );
};

export default App;
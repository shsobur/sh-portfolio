import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Background from "./Components/Background/Background";
import Home from "./Sections/Home/Home";
import About from "./Sections/About/About";
import Skills from "./Sections/Skills/Skills";
import Contact from "./Sections/Contact/Contact";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  return (
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
        <section
          id="skills"
          className="w-full min-h-screen flex items-center justify-center"
        >
          <Skills />
        </section>
        <section
          id="contact"
          className="w-full min-h-screen flex items-center justify-center"
        >
          <Contact />
        </section>
        <section
          id="footer"
          className="w-full flex items-end justify-center"
        >
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;
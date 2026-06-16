import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ===Navigation Item Definitions===
  const navItems = [
    { label: "HOME", target: "#home" },
    { label: "ABOUT ME", target: "#about" },
    { label: "SKILLS", target: "#skills" },
    { label: "PROJECT", target: "#projects" },
    { label: "CONTACT", target: "#contact" },
  ];

  // ===Monitor Scroll state for subtle style elevation===
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // toggle mobile menu open/closed state__
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // fixed navigation container floating above all layouts__
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-[1536px] mx-auto flex items-center justify-between">
        {/* Brand/Signature Mark__ */}
        <a
          href="#home"
          className="text-sm font-black tracking-widest text-slate-800 uppercase hover:text-[#9FA1FF] transition-colors duration-300"
        >
          SOBUR.DEV
        </a>

        {/* ===DESKTOP LIQUID GLASS CAPSULE=== */}
        <nav
          className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/45 border-2 border-white/80 shadow-[inset_0_2px_8px_rgba(255,255,255,0.7),_0_12px_32px_rgba(159,161,255,0.06)] backdrop-blur-md"
              : "bg-white/20 border border-white/50 backdrop-blur-sm"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.target}
              className="text-[10px] font-black tracking-wider text-slate-700 hover:text-[#9FA1FF] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Mini Glass Action CTA (iPhone button styling)__ */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-white/45 border border-white/60 text-slate-700 font-bold text-[10px] tracking-wider hover:bg-[#9FA1FF] hover:text-white hover:border-[#9FA1FF] transition-all duration-300 shadow-sm inline-block"
          >
            HIRE ME
          </a>
        </div>

        {/* ===MOBILE TRIGGER BUTTON=== */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/40 border border-white/60 shadow-sm backdrop-blur-md text-slate-800"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ===MOBILE FULL-SCREEN LIQUID GLASS DRAWER=== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-6 right-6 p-6 rounded-3xl bg-white/85 border border-white/70 shadow-2xl backdrop-blur-xl flex flex-col gap-5 md:hidden"
          >
            {navItems.map((item, index) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.label}
                href={item.target}
                onClick={() => setIsOpen(false)} // close mobile drawer upon click__
                className="text-xs font-bold tracking-wider text-slate-800 py-2.5 border-b border-slate-100/50 hover:text-[#9FA1FF] transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full py-3 rounded-2xl bg-[#9FA1FF] text-white text-xs font-bold text-center tracking-wider block"
            >
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
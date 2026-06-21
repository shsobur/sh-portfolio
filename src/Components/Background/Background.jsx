import { useEffect, useRef } from "react";
import "./Background.css";

const Background = () => {
  const gridLayerRef = useRef(null);
  const curvesLayerRef = useRef(null);
  const dropletsLayerRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let isScheduled = false; // ✅ FIX 1+7: throttle — only one RAF queued at a time

    const handleMouseMove = (e) => {
      if (isScheduled) return; // ✅ FIX 7: skip if a frame is already pending
      isScheduled = true;

      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      rafId = requestAnimationFrame(() => {
        if (gridLayerRef.current) {
          gridLayerRef.current.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
        }
        if (curvesLayerRef.current) {
          curvesLayerRef.current.style.transform = `translate(${x * -25}px, ${y * -25}px)`;
        }
        if (dropletsLayerRef.current) {
          dropletsLayerRef.current.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
        }
        isScheduled = false; // ✅ FIX 7: allow next frame after this one runs
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true }); // ✅ passive listener
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId); // ✅ FIX 1: cancel on unmount
    };
  }, []);

  return (
    <div className="parallax-bg-container">
      {/* Layer 1: Base grid */}
      <div ref={gridLayerRef} className="parallax-layer grid-layer" />

      {/* Layer 2: Animated curves + ambient glows */}
      <div ref={curvesLayerRef} className="parallax-layer curves-layer">
        <svg
          className="vertical-curves-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
            </linearGradient>
            {/* ✅ FIX 3: removed SVG filter="url(#glow)" — replaced with CSS below */}
          </defs>

          <path
            d="M250 0C400 250,100 500,350 750C450 850,200 950,300 1080"
            fill="none"
            stroke="url(#curveGrad1)"
            strokeWidth="12"
            strokeLinecap="round"
            className="animated-path-1"
          />
          <path
            d="M1150 0C950 200,1250 450,1000 700C850 850,1100 950,1050 1080"
            fill="none"
            stroke="url(#curveGrad2)"
            strokeWidth="8"
            strokeLinecap="round"
            className="animated-path-2"
          />
        </svg>

        {/* ✅ FIX 4: glows promoted to compositor layer */}
        <div
          className="ambient-glow glow-blue"
          style={{ top: "20%", left: "15%" }}
        />
        <div
          className="ambient-glow glow-pink"
          style={{ bottom: "25%", right: "15%" }}
        />
      </div>

      {/* Layer 3: Crystal droplets — backdrop-filter kept, but now GPU-promoted */}
      <div ref={dropletsLayerRef} className="parallax-layer droplets-layer">
        <div
          className="crystal-droplet lens-droplet-1"
          style={{ top: "35%", left: "18%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet lens-droplet-2"
          style={{ top: "50%", right: "16%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-giant"
          style={{ bottom: "10%", left: "8%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-wide"
          style={{ top: "10%", right: "25%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-medium"
          style={{ top: "72%", left: "42%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-small"
          style={{ top: "20%", left: "40%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-small"
          style={{ bottom: "40%", left: "10%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>
        <div
          className="crystal-droplet drop-micro"
          style={{ top: "45%", right: "35%" }}
        />
      </div>
    </div>
  );
};

export default Background;
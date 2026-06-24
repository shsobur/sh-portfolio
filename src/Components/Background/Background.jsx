import { useEffect, useRef } from "react";
import "./Background.css";

const Background = () => {
  const gridLayerRef = useRef(null);
  const curvesLayerRef = useRef(null);
  const dropletsLayerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let rafId = null;
    let isScheduled = false;

    const handleMouseMove = (e) => {
      if (isScheduled) return;
      isScheduled = true;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const x = e.clientX / vw - 0.5;
      const y = e.clientY / vh - 0.5;

      rafId = requestAnimationFrame(() => {
        if (gridLayerRef.current) {
          gridLayerRef.current.style.transform = `translate3d(${x * -10}px, ${y * -10}px, 0)`;
        }
        if (curvesLayerRef.current) {
          curvesLayerRef.current.style.transform = `translate3d(${x * -25}px, ${y * -25}px, 0)`;
        }
        if (dropletsLayerRef.current) {
          dropletsLayerRef.current.style.transform = `translate3d(${x * -50}px, ${y * -50}px, 0)`;
        }
        isScheduled = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="parallax-bg-container">
      <div ref={gridLayerRef} className="parallax-layer grid-layer" />
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
        <div
          className="ambient-glow glow-blue"
          style={{ top: "20%", left: "15%" }}
        />
        <div
          className="ambient-glow glow-pink"
          style={{ bottom: "25%", right: "15%" }}
        />
      </div>
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
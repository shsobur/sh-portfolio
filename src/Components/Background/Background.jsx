import { useEffect, useState } from "react";
import "./Background.css";

const Background = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize coordinate values between -0.5 and 0.5
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Multi-tiered parallax speeds for deep visual immersion
  const layerGrid = {
    transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
  };
  const layerCurves = {
    transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
  };
  const layerDroplets = {
    transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)`,
  };

  return (
    <div className="parallax-bg-container">
      {/* LAYER 1: Base Tech Grid */}
      <div className="parallax-layer grid-layer" style={layerGrid} />

      {/* LAYER 2: Vertical Curved Graph / Fluid Gradient Tracks */}
      <div className="parallax-layer curves-layer" style={layerCurves}>
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
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Primary Vertical Wave 1 */}
          <path
            d="M 250 0 C 400 250, 100 500, 350 750 C 450 850, 200 950, 300 1080"
            fill="none"
            stroke="url(#curveGrad1)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glow)"
            className="animated-path-1"
          />

          {/* Secondary Vertical Wave 2 (Crosses over Wave 1) */}
          <path
            d="M 1150 0 C 950 200, 1250 450, 1000 700 C 850 850, 1100 950, 1050 1080"
            fill="none"
            stroke="url(#curveGrad2)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#glow)"
            className="animated-path-2"
          />
        </svg>

        {/* Ambient Blur Behind Curves */}
        <div
          className="ambient-glow glow-blue"
          style={{ top: "20%", left: "15%" }}
        />
        <div
          className="ambient-glow glow-pink"
          style={{ bottom: "25%", right: "15%" }}
        />
      </div>

      {/* LAYER 3: 3D Crystal Water Droplets (Interacts with the curves below) */}
      <div className="parallax-layer droplets-layer" style={layerDroplets}>
        {/* Large Lens Droplet: Positioned over Curve 1 to simulate magnification refraction */}
        <div
          className="crystal-droplet lens-droplet-1"
          style={{ top: "35%", left: "18%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>

        {/* Large Lens Droplet: Positioned over Curve 2 */}
        <div
          className="crystal-droplet lens-droplet-2"
          style={{ top: "50%", right: "16%" }}
        >
          <div className="droplet-specular-highlight" />
        </div>

        {/* Supporting Medium & Large Fluid Droplets */}
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
        ></div>
      </div>
    </div>
  );
};

export default Background;
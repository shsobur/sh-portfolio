import { useRef } from "react";
import { motion } from "framer-motion";
import { FaRegEnvelope, FaDownload, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import "./Home.css";

const Home = () => {
  const containerRef = useRef(null);

  return (
    <div className="home-viewport-container pointer-events-auto">
      {/* 
        SVG Displacement Filter to create physical liquid refraction.
        This bends and warps elements/text when hovered.
      */}
      <svg style={{ width: 0, height: 0, position: "absolute" }}>
        <defs>
          <filter id="liquid-warp">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Premium Periwinkle-Satin Glass Container (Upscaled) */}
      <div className="premium-periwinkle-card" ref={containerRef}>
        {/* Soft internal rim glares */}
        <div className="card-rim-light" />
        <div className="card-surface-shimmer" />

        {/* 
          DRAGGABLE CRYSTAL WATER DROPLET
          Features complex 3D refractive properties and simulated caustic light focus
        */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.05}
          dragMomentum={true}
          whileDrag={{ scale: 1.05, cursor: "grabbing" }}
          className="crystal-water-orb"
          title="Drag me over the text to see refraction!"
        >
          {/* Focused light spot inside the droplet shadow (Caustics simulation) */}
          <div className="droplet-caustic-light" />

          {/* Core Specular light source reflection (Top-Left) */}
          <div className="specular-glare-point" />

          {/* Secondary crescent bounce light (Bottom-Right) */}
          <div className="bounce-light-rim" />
        </motion.div>

        {/* Scaled-up Home Text Content */}
        <div className="expanded-text-content select-none">
          <div className="periwinkle-tag">
            <span className="tag-pulse-core" />
            Active Portfolio
          </div>

          <h1 className="editorial-main-title">
            MERN Stack <br />
            <span className="title-chromatic-accent">Developer.</span>
          </h1>

          <p className="editorial-description">
            Learning by building, debugging, and shipping real projects.
            Everything is fun until the bugs arrive{" "}
            <span className="skull-emoji">💀</span> 0_0
          </p>

          {/* Core Tech Stack Section */}
          <div className="editorial-stack-section">
            <span className="editorial-section-label">Core Competencies</span>
            <div className="editorial-stack-grid">
              {/* React */}
              <div className="periwinkle-tech-pill">
                <FaReact className="pill-icon spin-react-icon" />
                <span>React.js</span>
              </div>

              {/* Node */}
              <div className="periwinkle-tech-pill">
                <FaNodeJs className="pill-icon node-icon" />
                <span>Node.js</span>
              </div>

              {/* Express */}
              <div className="periwinkle-tech-pill">
                <SiExpress className="pill-icon express-icon" />
                <span>Express</span>
              </div>

              {/* MongoDB */}
              <div className="periwinkle-tech-pill">
                <SiMongodb className="pill-icon mongo-icon" />
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Controls */}
        <div className="editorial-actions-row">
          <button className="editorial-action-btn btn-periwinkle-primary">
            <FaRegEnvelope className="btn-icon" />
            <span>CONTACT ME</span>
          </button>

          <button className="editorial-action-btn btn-periwinkle-secondary">
            <FaDownload className="btn-icon" />
            <span>DOWNLOAD CV / RESUME</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

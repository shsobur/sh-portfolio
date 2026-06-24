import { useRef } from "react";
import { motion } from "framer-motion";
import { FaRegEnvelope, FaDownload, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import "./Home.css";

const ReactIcon = () => <FaReact className="pill-icon spin-react-icon" />;

const Home = () => {
  const panelRef = useRef(null);

  return (
    <div className="home-viewport">
      <div className="home-glass-panel" ref={panelRef}>
        <motion.div
          className="home-water-orb"
          drag
          dragConstraints={panelRef}
          dragElastic={0.15}
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
          whileDrag={{ cursor: "grabbing" }}
          title="Drag me!"
          draggable="false"
        >
          <div className="orb-specular" />
          <div className="orb-caustic" />
        </motion.div>

        <div className="home-content-wrapper">
          <div className="periwinkle-tag">
            <span className="tag-pulse-core" />
            Active Portfolio
          </div>
          <h1 className="home-main-heading">
            MERN Stack
            <br />
            <span className="title-chromatic-accent">Developer.</span>
          </h1>
          <p className="home-hero-description">
            Learning by building, debugging, and shipping real projects.
            Everything is fun until the bugs arrive
            <span className="skull-emoji">💀</span> ^_^
          </p>

          <div className="tech-stack-section">
            <span className="editorial-section-label">Core Competencies</span>
            <div className="tech-stack-grid">
              <div className="glass-tech-pill">
                <ReactIcon />
                <span>React.js</span>
              </div>
              <div className="glass-tech-pill">
                <FaNodeJs className="pill-icon node-icon" />
                <span>Node.js</span>
              </div>
              <div className="glass-tech-pill">
                <SiExpress className="pill-icon express-icon" />
                <span>Express</span>
              </div>
              <div className="glass-tech-pill">
                <SiMongodb className="pill-icon mongo-icon" />
                <span>MongoDB</span>
              </div>
            </div>
          </div>

          <div className="home-actions-row">
            <button className="glass-action-btn btn-primary">
              <FaRegEnvelope className="btn-icon" />
              <span>CONTACT ME</span>
            </button>
            <button className="glass-action-btn btn-secondary">
              <FaDownload className="btn-icon" />
              <span>DOWNLOAD CV / RESUME</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
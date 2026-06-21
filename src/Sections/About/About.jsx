import "./About.css";
import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  const panelRef = useRef(null);

  useLayoutEffect(() => {}, []);

  return (
    <div className="about-viewport">
      <div className="section-title-wrapper">
        <div className="title-category-badge">
          <span className="title-badge-line" />
          <span>01 / ABOUT ME</span>
        </div>
        <h2 className="section-main-heading">About Me</h2>
      </div>

      <div className="liquid-glass-panel" ref={panelRef}>
        <motion.div
          className="draggable-water-orb"
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

        <div className="hero-section">
          <div className="portrait-orb">
            <img
              src="https://res.cloudinary.com/dmfsmcy2y/image/upload/v1782060475/me_vx6ccr.webp"
              alt="Sobur Hossen"
              className="portrait-img"
              loading="lazy"
              decoding="async"
            />
            <div className="orb-inner-glow" />
            <div className="portrait-spin-ring" />
          </div>

          <div className="hero-text">
            <div className="name-block">
              <span className="bio-label">MERN Stack Developer</span>
              <h3 className="bio-name">Sobur Hossen</h3>
            </div>
            <p className="hero-desc">
              I'm a passionate front-end developer with solid skills in HTML5,
              CSS3, JavaScript, and React.js.
            </p>
            <p className="hero-desc">
              In addition to my front-end expertise, I have foundational
              knowledge of Express.js, Node.js, and MongoDB, and I'm actively
              expanding my backend development skills to become a well-rounded
              MERN Stack developer.
            </p>
            <p className="hero-motivation">
              I am highly motivated to learn and embrace new challenges.
            </p>
          </div>
        </div>

        <div className="timeline-section">
          <h3 className="timeline-heading">My Journey</h3>
          <div className="timeline-grid">
            <div className="timeline-slab" data-accent="blue">
              <div className="slab-header">
                <span className="slab-icon">🧭</span>
                <span className="slab-date">Jan 2024</span>
              </div>
              <h4 className="slab-title">Started My Journey</h4>
              <p className="slab-subtitle">Self‑taught Developer</p>
              <p className="slab-desc">
                Began learning web development fundamentals and enrolled in the
                Programming Hero MERN Stack Development Course.
              </p>
            </div>

            <div className="timeline-slab" data-accent="purple">
              <div className="slab-header">
                <span className="slab-icon">🎓</span>
                <span className="slab-date">Jun 2024</span>
              </div>
              <h4 className="slab-title">Junior MERN Stack</h4>
              <p className="slab-subtitle">Programming Hero Graduate</p>
              <p className="slab-desc">
                Finished a 6‑month MERN stack course. Learned React, Node.js,
                Express, MongoDB, and built several course‑based projects.
              </p>
            </div>

            <div className="timeline-slab" data-accent="teal">
              <div className="slab-header">
                <span className="slab-icon">🛠️</span>
                <span className="slab-date">Jun – Dec 2024</span>
              </div>
              <h4 className="slab-title">Personal Projects</h4>
              <p className="slab-subtitle">Hands‑On Practice</p>
              <p className="slab-desc">
                Focused on building real‑world MERN stack projects to strengthen
                development skills and problem‑solving ability.
              </p>
            </div>

            <div className="timeline-slab slab-highlight" data-accent="orange">
              <div className="slab-header">
                <span className="slab-icon">🚀</span>
                <span className="slab-date">2025 – Present</span>
              </div>
              <h4 className="slab-title">Frontend Developer (MERN)</h4>
              <p className="slab-subtitle">Open to Work & Learning</p>
              <p className="slab-desc">
                Completed development training and actively seeking a frontend
                developer position while continuing to expand my skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
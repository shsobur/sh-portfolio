import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaChrome,
  FaPython,
  FaBrain,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiFirebase,
  SiJsonwebtokens,
  SiAxios,
  SiReactquery,
  SiNextdotjs,
} from "react-icons/si";
import "./Skills.css";

const Skills = () => {
  const skillsPanelRef = useRef(null);

  return (
    <div className="skills-viewport pointer-events-auto">
      <div className="section-title-wrapper">
        <div className="title-category-badge">
          <span className="title-badge-line" />
          <span>02 / SKILLS & TECH</span>
        </div>
        <h2 className="section-main-heading">My Expertise</h2>
      </div>

      <div
        className="skills-glass-panel"
        ref={skillsPanelRef}
        onSelectStart={(e) => e.preventDefault()}
      >
        <motion.div
          className="draggable-water-orb"
          drag
          dragConstraints={skillsPanelRef}
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

        <div className="skills-categories-grid">
          <div className="skills-satin-card" data-accent="blue">
            <h3 className="category-title">Frontend Core</h3>
            <div className="skills-pills-row">
              <div className="periwinkle-tech-pill">
                <FaHtml5 className="pill-icon color-html" />
                <span>HTML5</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaCss3Alt className="pill-icon color-css" />
                <span>CSS3</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiTailwindcss className="pill-icon color-tailwind" />
                <span>Tailwind CSS</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaJs className="pill-icon color-js" />
                <span>JavaScript</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaReact className="pill-icon spin-react-icon" />
                <span>React.js</span>
              </div>
            </div>
          </div>

          <div className="skills-satin-card" data-accent="purple">
            <h3 className="category-title">Backend, Security & Cloud</h3>
            <div className="skills-pills-row">
              <div className="periwinkle-tech-pill">
                <FaNodeJs className="pill-icon color-node" />
                <span>Node.js</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiExpress className="pill-icon color-express" />
                <span>Express.js</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiMongodb className="pill-icon color-mongo" />
                <span>MongoDB</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiFirebase className="pill-icon color-firebase" />
                <span>Firebase</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiJsonwebtokens className="pill-icon color-jwt" />
                <span>JWT Auth</span>
              </div>
            </div>
          </div>

          <div className="skills-satin-card" data-accent="teal">
            <h3 className="category-title">Data Flow & Operations</h3>
            <div className="skills-pills-row">
              <div className="periwinkle-tech-pill">
                <SiAxios className="pill-icon color-axios" />
                <span>Axios</span>
              </div>
              <div className="periwinkle-tech-pill">
                <SiReactquery className="pill-icon color-query" />
                <span>TanStack Query</span>
              </div>
              <div className="periwinkle-tech-pill">
                <span className="pill-bullet-dot" />
                <span>React Hook Form</span>
              </div>
            </div>
          </div>

          <div className="skills-satin-card" data-accent="orange">
            <h3 className="category-title">Workspace & Tooling</h3>
            <div className="skills-pills-row">
              <div className="periwinkle-tech-pill">
                <FaGitAlt className="pill-icon color-git" />
                <span>Git Versioning</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaGithub className="pill-icon color-github" />
                <span>GitHub</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaFigma className="pill-icon color-figma" />
                <span>Figma UI Design</span>
              </div>
              <div className="periwinkle-tech-pill">
                <FaChrome className="pill-icon color-chrome" />
                <span>Chrome DevTools</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ecosystem-satin-panel">
          <h4 className="ecosystem-heading">Continuous Growth & Horizons</h4>
          <p className="ecosystem-description">
            Technology never stands still, and neither do I. I am actively
            expanding my development stack and computer science foundations with
            these core focus areas:
          </p>
          <div className="growth-pills-row">
            <div className="learning-glass-pill pill-next">
              <span className="learning-pulse-dot pulse-blue" />
              <SiNextdotjs className="pill-icon color-next" />
              <span>Next.js Framework</span>
            </div>
            <div className="learning-glass-pill pill-python">
              <span className="learning-pulse-dot pulse-gold" />
              <FaPython className="pill-icon color-python-blue" />
              <span>Python Programming</span>
            </div>
            <div className="learning-glass-pill pill-dsa">
              <span className="learning-pulse-dot pulse-green" />
              <FaBrain className="pill-icon color-brain" />
              <span>DSA in JavaScript</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
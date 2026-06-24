import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaRegEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-full-container pointer-events-auto">
      {/* Dynamic Ambient Horizon Light */}
      <div className="footer-horizon-glow" />

      {/* 1536px Max Width Centered Content Container */}
      <div
        className="footer-inner-content"
        onSelectStart={(e) => {
          // Block selections on social labels and signature, but preserve utility links
          if (e.target.tagName !== "A") {
            e.preventDefault();
          }
        }}
      >
        {/* Main Columns Grid */}
        <div className="footer-main-grid">
          {/* COLUMN 1: The Human Craft Manifesto */}
          <div className="footer-column manifesto-col">
            <h4 className="manifesto-heading">The Human Craft</h4>
            <p className="manifesto-quote">
              "Technology was built on patience, resilience, and genuine human
              problem-solving. Replacing human genius with reckless prompt
              engineering threatens the core of our craft. I stand with those
              who write code with intention, heart, and discipline."
            </p>
          </div>

          {/* COLUMN 2: Quick Nav */}
          <div className="footer-column nav-col">
            <h5 className="column-label">Navigation</h5>
            <ul className="footer-nav-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Connections */}
          <div className="footer-column connect-col">
            <h5 className="column-label">Connections</h5>

            {/* Direct Channels */}
            <div className="direct-channels-list">
              <a
                href="mailto:shsoburhossen951@gmail.com"
                className="direct-channel-link"
              >
                <FaRegEnvelope className="channel-icon" />
                <span>shsoburhossen951@gmail.com</span>
              </a>
              <a
                href="https://wa.me/8801787592274"
                target="_blank"
                rel="noopener noreferrer"
                className="direct-channel-link"
              >
                <FaWhatsapp className="channel-icon" />
                <span>+880 1787592274</span>
              </a>
            </div>

            {/* Social Icons row */}
            <div className="social-pills-row">
              <a
                href="https://www.linkedin.com/in/soburhossen/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-pill"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/shsobur"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-pill"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.facebook.com/sobur.hossen.951"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-pill"
                title="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Sobur Hossen. All rights reserved.
          </p>
          <div className="footer-signature">
            Designed with <span className="heart-pulse-icon">❤️</span> and lots
            of <span className="coffee-icon">☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
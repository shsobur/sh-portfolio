import "./Contact.css";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const contactPanelRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Action will be made functional in future updates__
  };

  return (
    <div className="contact-viewport pointer-events-auto">
      {/* STANDARDIZED SECTION TITLE SYSTEM */}
      <div className="section-title-wrapper">
        <div className="title-category-badge">
          <span className="title-badge-line" />
          <span>03 / CONTACT ME</span>
        </div>
        <h2 className="section-main-heading">Get In Touch</h2>
      </div>

      {/* Main Glass Panel (Matching About & Skills layout dimensions) */}
      <div
        className="contact-glass-panel"
        ref={contactPanelRef}
        onSelectStart={(e) => {
          // Prevent accidental copy selections on structural text/labels,
          // but preserve standard selection inside input elements
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
      >
        {/* Interactive 3D Draggable Water Orb */}
        <motion.div
          className="draggable-water-orb"
          drag
          dragConstraints={contactPanelRef}
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

        {/* Contact Form Container */}
        <form className="contact-form-layout" onSubmit={handleSubmit}>
          <div className="form-intro-text">
            <h3 className="form-heading">Let's Build Something Together</h3>
            <p className="form-description">
              Have an idea, a project, or just want to say hello? Drop a message
              below and let's start a conversation.
            </p>
          </div>

          {/* Form Fields Row */}
          <div className="form-fields-grid">
            {/* Name Input */}
            <div className="form-input-group">
              <label className="field-label" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Sobur Hossen"
                className="glass-input-field"
                required
                draggable="false"
              />
            </div>

            {/* Email Input */}
            <div className="form-input-group">
              <label className="field-label" htmlFor="email">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                className="glass-input-field"
                required
                draggable="false"
              />
            </div>
          </div>

          {/* Description/Message Textarea */}
          <div className="form-input-group full-width-field">
            <label className="field-label" htmlFor="message">
              Project Description / Message
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Tell me about your project, timeline, or requirements..."
              className="glass-textarea-field"
              required
              draggable="false"
            />
          </div>

          {/* Action Send Button */}
          <div className="form-button-container">
            <button type="submit" className="glass-submit-btn">
              <FaPaperPlane className="btn-icon" />
              <span>SEND MESSAGE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
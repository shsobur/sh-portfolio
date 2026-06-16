import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative h-screen w-full max-w-[1536px] mx-auto flex items-center px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden">
      {/* Soft Light */}
      <div className="absolute left-0 top-[20%] w-[40vw] h-[40vw] bg-[#9FA1FF]/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <span className="inline-flex items-center rounded-full border border-white/50 bg-white/40 px-5 py-2 text-xs font-semibold text-slate-700 backdrop-blur-md">
            Building • Learning • Improving
          </span>
        </motion.div>

        {/* Name */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-[5rem] font-black tracking-[-0.05em] text-black leading-none"
        >
          SOBUR HOSSEN
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="mt-4 text-4xl sm:text-6xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight animated-gradient-text-dark"
        >
          Building Modern
          <br />
          Web Experiences
        </motion.h1>

        {/* Skills */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap gap-3"
        >
          {["React", "JavaScript", "Tailwind CSS", "MERN"].map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-md"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed"
        >
          I build responsive and interactive web applications using React,
          JavaScript, and modern web technologies. My focus is creating clean,
          user-friendly experiences while continuously learning through real
          projects.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-[#9FA1FF] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(159,161,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#8e90f0]"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/60 px-7 py-3 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all duration-300 hover:bg-white/90"
          >
            Download CV
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-white/50"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
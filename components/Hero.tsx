"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const containerVariants = (reduced: boolean) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.15,
      delayChildren: reduced ? 0 : 0.2,
    },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function Hero() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        bg-black
        px-3 xs:px-4 sm:px-6 lg:px-8
        py-12 sm:py-0
        overflow-hidden
      "
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto text-center"
        variants={containerVariants(reduced)}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 tracking-tight"
        >
          Hi, I&apos;m Ansh
        </motion.h1>

        {/* --- Video Wrapper --- */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-6 px-1"
        >
          <div className="relative w-full aspect-video overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <video
              src="/my-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-3"
          style={{
            background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {reduced ? (
            "Full Stack Developer • DevOps Architect • Solana Rust Engineer"
          ) : (
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "DevOps Engineer",
                2000,
                "Solana Rust Engineer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          )}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm xs:text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
        >
          From modern SaaS platforms to decentralized applications, I turn ideas
          into production-ready products.
        </motion.p>
      </motion.div>
    </section>
  );
}
"use client";

import {Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com/ANSH_BUILDS",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4.5 w-4.5"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/anshuman-sahay-74005a2aa/",
    icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  },
  {
    name: "GitHub",
    href: "https://github.com/sahayanshuman2005",
    icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  },
];

export default function Navbar() {
  const reduced = useReducedMotion() ?? false;

  const handleResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Ansh_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      initial={reduced ? false : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="
          flex items-center gap-2 sm:gap-3
          rounded-full border border-white/10
          bg-black/40 px-4 py-2.5
          shadow-xl shadow-black/40
          backdrop-blur-xl
          sm:px-5 sm:py-3
        "
      >
        {SOCIAL_LINKS.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            whileHover={reduced ? undefined : { scale: 1.15 }}
            whileTap={reduced ? undefined : { scale: 0.92 }}
            className="
              rounded-full p-1.5
              text-white/50 transition-colors duration-200
              hover:bg-white/8 hover:text-white
            "
          >
            {social.icon}
          </motion.a>
        ))}

        <div className="mx-1 h-5 w-px bg-white/15" aria-hidden="true" />

        <motion.button
          onClick={handleResume}
          aria-label="Download Resume"
          title="Download Resume"
          whileHover={
            reduced
              ? undefined
              : {
                  scale: 1.05,
                  boxShadow: "0 0 18px rgba(255,255,255,0.3)",
                }
          }
          whileTap={reduced ? undefined : { scale: 0.96 }}
          className="
            flex cursor-pointer items-center gap-1.5
            rounded-full bg-white px-4 py-1.5
            text-xs font-semibold text-black
            transition-all duration-200
            sm:px-5 sm:py-2 sm:text-sm
          "
        >
          <Download size={13} strokeWidth={2.5} className="shrink-0" />
          <span className="hidden sm:inline">Resume</span>
          <span className="sm:hidden">Resume</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
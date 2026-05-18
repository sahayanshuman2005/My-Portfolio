"use client";

import { type Variants, motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

const floatVariant: Variants = {
  animate: {
    y: [0, -18, 0] as const,
    scale: [1, 1.06, 1] as const,
    opacity: [0.06, 0.1, 0.06] as const,
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const borderGlow: Variants = {
  hidden: {
    opacity: 0,
    boxShadow: "0 0 0px rgba(255,255,255,0)",
  },
  show: {
    opacity: 1,
    boxShadow: "0 0 60px 1px rgba(255,255,255,0.06)",
    transition: {
      duration: 1.4,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

interface TypewriterProps {
  text: string;
  className?: string;
  startDelay?: number;
  letterDelay?: number;
  reduced: boolean;
}

function Typewriter({
  text,
  className = "",
  startDelay = 0.1,
  letterDelay = 0.035,
  reduced,
}: TypewriterProps) {
  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={className}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: startDelay + i * letterDelay,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

export default function Contact() {
  const reduced = useReducedMotion() ?? false;

  const line1 = "Available for Freelance";
  const line2 = "& Collaborations";

  const line2Delay = 0.1 + line1.length * 0.035 + 0.12;

  const twitterDMUrl =
    "https://twitter.com/messages/compose?recipient_id=1812063256531374080&text=Hi%20Ansh%2C%20I%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20collaborate%20with%20you!";

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=sahayanshuman421@gmail.com&su=Freelance%20needed!&body=Hi%20Ansh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you.%0A%0A%0ABest%20regards%2C%0A";

  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden px-4 sm:px-6 py-24">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(255,255,255,0.07)_0%,transparent_70%)]"
        variants={floatVariant}
        animate={reduced ? undefined : "animate"}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full gap-8 rounded-2xl"
        variants={borderGlow}
        initial={reduced ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-white/40 font-mono"
          variants={fadeUp(0)}
          initial={reduced ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          Let&apos;s work together
        </motion.p>

        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-full">
          <span className="block wrap-break-word">
            <Typewriter
              text={line1}
              startDelay={0.1}
              letterDelay={0.035}
              reduced={reduced}
            />
          </span>

          <span className="block text-white/60 wrap-break-word">
            <Typewriter
              text={line2}
              startDelay={line2Delay}
              letterDelay={0.045}
              reduced={reduced}
            />
          </span>
        </h2>

        <motion.p
          className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg"
          variants={fadeUp(0.3)}
          initial={reduced ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          Whether you have a product to ship, a creative vision to bring to
          life, or just want to explore an idea together — I&apos;d love to
          hear from you. Drop me a message and let&apos;s build something worth
          remembering.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <motion.a
            href={twitterDMUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={scaleIn(0.5)}
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            whileHover={
              reduced
                ? undefined
                : {
                    scale: 1.06,
                    boxShadow: "0 0 28px rgba(255,255,255,0.4)",
                  }
            }
            whileTap={reduced ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide cursor-pointer w-full sm:w-auto"
          >
            <span className="text-sm font-bold">𝕏</span>
            Message on X
          </motion.a>

          <motion.a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={scaleIn(0.6)}
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            whileHover={
              reduced
                ? undefined
                : {
                    scale: 1.06,
                    boxShadow: "0 0 28px rgba(255,255,255,0.4)",
                  }
            }
            whileTap={reduced ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide cursor-pointer w-full sm:w-auto"
          >
            <Mail
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            Send an Email
          </motion.a>
        </div>

        <motion.p
          className="text-white/20 text-xs font-mono tracking-widest mt-4"
          variants={fadeUp(0.75)}
          initial={reduced ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          Usually responds within 24 hours
        </motion.p>
      </motion.div>
    </section>
  );
}
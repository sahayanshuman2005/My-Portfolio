"use client";

import { type Variants, motion, useReducedMotion } from "framer-motion";

const LANGUAGES = ["C++", "JavaScript", "TypeScript", "Rust"];

const TOOLS = [
  "React",
  "Next.js",
  "Express",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "WebSockets",
  "Anchor",
  "AWS",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Git & Github",
  "Kafka",
  "Redis",
  "Prometheus",
  "Grafana",
];

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const buttonVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const floatVariant: Variants = {
  animate: {
    y: [0, -18, 0],
    scale: [1, 1.06, 1],
    opacity: [0.04, 0.08, 0.04],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface TypewriterProps {
  text: string;
  startDelay?: number;
  letterDelay?: number;
  reduced: boolean;
}

function Typewriter({
  text,
  startDelay = 0.1,
  letterDelay = 0.055,
  reduced,
}: TypewriterProps) {
  if (reduced) return <span>{text}</span>;

  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

interface SkillGroupProps {
  title: string;
  skills: string[];
  baseDelay: number;
  reduced: boolean;
}

function SkillGroup({
  title,
  skills,
  baseDelay,
  reduced,
}: SkillGroupProps) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <motion.h3
        variants={fadeUp(baseDelay)}
        initial={reduced ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true }}
        className="
          inline-flex items-center justify-center
          rounded-xl
          border border-white/15
          bg-white/3
          px-6 py-3
          text-sm sm:text-base
          font-semibold
          tracking-[0.2em]
          uppercase
          text-white
          font-mono
          text-center
          shadow-[0_0_20px_rgba(255,255,255,0.03)]
          backdrop-blur-sm
        "
      >
        {title}
      </motion.h3>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            variants={buttonVariant(baseDelay + 0.1 + i * 0.045)}
            initial={reduced ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            whileHover={
              reduced
                ? undefined
                : {
                    scale: 1.07,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }
            }
            whileTap={reduced ? undefined : { scale: 0.96 }}
            className="
              inline-flex items-center justify-center
              bg-white text-black
              rounded-full
              px-5 py-2
              text-sm font-semibold tracking-wide
              cursor-default
              select-none
            "
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function AnimatedBorderTitle({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      variants={fadeUp(0)}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true }}
      className="relative inline-flex p-0.5 rounded-full"
      animate={
        reduced
          ? undefined
          : {
              backgroundPosition: ["0% 50%", "200% 50%"],
            }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }
      }
      style={{
        backgroundImage:
          "linear-gradient(90deg, #DD7DDF, #E1CD86, #BBCB92, #71C2EF, #3BFFFF, #DD7DDF, #E1CD86, #BBCB92, #71C2EF, #3BFFFF)",
        backgroundSize: "200% 100%",
      }}
    >
      <div
        className="
          rounded-full
          bg-black
          px-8 sm:px-12 lg:px-16
          py-3 sm:py-4
        "
      >
        <h2
          className="
            text-3xl sm:text-4xl lg:text-6xl
            font-bold
            text-white
            leading-tight
            tracking-tight
          "
        >
          <Typewriter
            text="Skills"
            startDelay={0.1}
            letterDelay={0.08}
            reduced={reduced}
          />
        </h2>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="
        relative w-full bg-black
        py-1 px-4 sm:px-6 lg:px-8
        overflow-hidden 
      "
    >
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(255,255,255,0.06)_0%,transparent_70%)]
        "
        variants={floatVariant}
        animate={reduced ? undefined : "animate"}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-14">
        <div className="text-center">
          <AnimatedBorderTitle reduced={reduced} />
        </div>

        <div className="w-full flex flex-col items-center gap-12">
          <SkillGroup
            title="Languages"
            skills={LANGUAGES}
            baseDelay={0.3}
            reduced={reduced}
          />

          <SkillGroup
            title="Tools & Tech"
            skills={TOOLS}
            baseDelay={0.5}
            reduced={reduced}
          />
        </div>
      </div>
    </section>
  );
}
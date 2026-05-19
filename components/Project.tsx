"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import ProjectCard, { cardVariants, type ProjectCardProps } from "./ProjectCard";

/* ─────────────────────────────────────────────────────────
   Sample project data  — replace with your real projects
───────────────────────────────────────────────────────── */

const PROJECTS: ProjectCardProps[] = [
  {
    title: "Saasify",
    description:
      "Saasify is a modern, responsive SaaS landing page built with Next.js, TypeScript, and Tailwind CSS. It features smooth animations with Framer Motion, dynamic pricing sections, testimonials, and reusable components. Optimized for performance, scalability, and clean UI design.",
    image: "/saasify.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS","React","Framer-motion"],
    githubUrl: "https://github.com/sahayanshuman2005/Saasify-frontend",
    liveUrl:   "https://saasify-frontend-next.vercel.app/",
  },
  {
    title: "DevOps Dashboard",
    description:
      "Real-time infrastructure monitoring dashboard with Prometheus metrics, Grafana-inspired charts, Kubernetes cluster visibility, and CI/CD pipeline status tracking.",
    image: "/projects/devops-dashboard.jpg",
    techStack: ["Next.js", "Prometheus", "Grafana", "Docker", "Kubernetes", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/devops-dashboard",
    liveUrl:   "https://devops-dashboard.vercel.app",
  },
  {
    title: "Full-Stack SaaS Platform",
    description:
      "End-to-end multi-tenant SaaS boilerplate with auth, billing, team management, and a React dashboard. Built for rapid product launches.",
    image: "/projects/saas-platform.jpg",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "AWS"],
    githubUrl: "https://github.com/yourusername/saas-platform",
    liveUrl:   "https://saas-platform.vercel.app",
  },
  {
    title: "Real-Time Chat App",
    description:
      "Scalable WebSocket-powered chat application with rooms, direct messages, file sharing, and end-to-end encryption. Deployed on AWS with Docker.",
    image: "/projects/chat-app.jpg",
    techStack: ["Node.js", "WebSockets", "React", "MongoDB", "Docker", "AWS"],
    githubUrl: "https://github.com/yourusername/chat-app",
    liveUrl:   "https://chat-app.vercel.app",
  },
  {
    title: "Rust CLI Tool",
    description:
      "High-performance command-line utility written in Rust for batch processing large datasets. 10× faster than the Python equivalent with a fraction of the memory footprint.",
    image: "/projects/rust-cli.jpg",
    techStack: ["Rust", "CLI", "GitHub Actions", "CI/CD"],
    githubUrl: "https://github.com/yourusername/rust-cli",
    liveUrl:   "https://github.com/yourusername/rust-cli",
  },
  {
    title: "dApp Token Launchpad",
    description:
      "A Solana token launchpad enabling fair-launch token sales with vesting schedules, whitelist management, and on-chain governance via Rust smart contracts.",
    image: "/projects/token-launchpad.jpg",
    techStack: ["Rust", "Anchor", "Solana", "React", "TypeScript", "Prisma"],
    githubUrl: "https://github.com/yourusername/token-launchpad",
    liveUrl:   "https://token-launchpad.vercel.app",
  },
];

/* ─────────────────────────────────────────────────────────
   Section-level animation variants
───────────────────────────────────────────────────────── */

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const gridVariants = (reduced: boolean): Variants => ({
  hidden:   { opacity: 0 },
  visible:  {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.1,
      delayChildren:   reduced ? 0 : 0.25,
    },
  },
});

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */

export default function Projects() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        // backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor:"#000000"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section heading ───────────────────────────── */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          {/* Eyebrow */}
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-white/40 font-mono mb-4"
            variants={fadeUp(0)}
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
          >
            What I&apos;ve built
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
            variants={fadeUp(0.1)}
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
        </div>

        {/* ── Cards grid ────────────────────────────────── */}
        <motion.div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5 sm:gap-6 lg:gap-7 xl:gap-8
          "
          variants={gridVariants(reduced)}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
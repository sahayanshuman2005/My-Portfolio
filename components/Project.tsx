"use client";
 
import { useEffect, useState } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
 
import ProjectCard, { type ProjectCardProps } from "./ProjectCard";
 
const DEFAULT_PROJECTS: ProjectCardProps[] = [
  {
    title: "Saasify",
    description:
      "Saasify is a modern, responsive SaaS landing page built with Next.js, TypeScript, and Tailwind CSS. It features smooth animations with Framer Motion, dynamic pricing sections, testimonials, and reusable components. Optimized for performance, scalability, and clean UI design.",
    image: "/saasify.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Framer-motion"],
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
 
const LS_KEY = "portfolio_projects_order";
 
const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});
 
function loadOrder(): ProjectCardProps[] {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_PROJECTS;
    const titles: string[] = JSON.parse(raw);
    const reordered = titles
      .map((t) => DEFAULT_PROJECTS.find((p) => p.title === t))
      .filter(Boolean) as ProjectCardProps[];
    return reordered.length === DEFAULT_PROJECTS.length
      ? reordered
      : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
}
 
function saveOrder(projects: ProjectCardProps[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(projects.map((p) => p.title)));
}
 
export default function Projects() {
  const reduced = useReducedMotion() ?? false;
 
  const [projects,    setProjects]    = useState<ProjectCardProps[]>(DEFAULT_PROJECTS);
  const [activeId,    setActiveId]    = useState<string | null>(null);
  const [isReordered, setIsReordered] = useState(false);
 
  useEffect(() => {
    const saved = loadOrder();
    setProjects(saved);
    const raw = localStorage.getItem(LS_KEY);
    setIsReordered(!!raw);
  }, []);
 
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
 
  const handleDragStart = (event: { active: { id: string | number } }) => {
    setActiveId(String(event.active.id));
  };
 
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
 
    const oldIdx = projects.findIndex((p) => p.title === active.id);
    const newIdx = projects.findIndex((p) => p.title === over.id);
    const next   = arrayMove(projects, oldIdx, newIdx);
 
    setProjects(next);
    saveOrder(next);
    setIsReordered(true);
  };
 
  const resetOrder = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(LS_KEY);
    setIsReordered(false);
  };
 
  const activeProject = projects.find((p) => p.title === activeId);
 
  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
 
      <div className="relative z-10 max-w-7xl mx-auto">
 
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-white/40 font-mono mb-4"
            variants={fadeUp(0)}
            initial={reduced ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
          >
            What I&apos;ve built
          </motion.p>
 
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
 
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeUp(0.2)}
          initial={reduced ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
        >
          
 
          {isReordered && (
            <button
              onClick={resetOrder}
              className="text-white/40 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors duration-200 border border-white/10 hover:border-white/30 rounded-full px-3 py-1"
            >
              Reset order
            </button>
          )}
        </motion.div>
 
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p.title)}
            strategy={rectSortingStrategy}
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8"
              initial={reduced ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden:  { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: reduced ? 0 : 0.2 },
                },
              }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </motion.div>
          </SortableContext>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: "0.4" } },
              }),
            }}
          >
            {activeProject ? (
              <div className="opacity-90 scale-[1.04] rotate-1 shadow-2xl shadow-black/60 rounded-xl sm:rounded-2xl overflow-hidden border border-white/30">
                <ProjectCard {...activeProject} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
 
      </div>
    </section>
  );
}
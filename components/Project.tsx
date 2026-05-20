"use client";

import { useEffect, useState } from "react";
import {
  motion,
  type Variants,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
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
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Framer-motion",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/Saasify-frontend",
    liveUrl: "https://saasify-frontend-next.vercel.app/",
  },
  {
    title: "SketchMate",
    description:
      "Developed a real-time collaborative whiteboard using Next.js, React, TypeScript, and Tailwind CSS. Enabled low-latency multi-user drawing with WebSockets, persisted board data in PostgreSQL, and structured the codebase as a monorepo with Turborepo.",
    image: "/projects/devops-dashboard.jpg",
    techStack: [
      "Next.js",
      "TailwindCSS",
      "Websocket",
      "TypeScript",
      "Express",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/SketchMate.git",
    liveUrl: "https://devops-dashboard.vercel.app",
  },
  {
    title: "Youtube University",
    description:
      "Built a full-stack e-learning platform where instructors can create and sell courses, and students can purchase, access, and track their learning progress.",
    image: "/projects/saas-platform.jpg",
    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/Youtube-University.git",
    liveUrl: "https://saas-platform.vercel.app",
  },

  {
    title: "BuddyBase",
    description:
      "Built a virtual collaboration platform where users can join interactive spaces, move as avatars, and connect through proximity-based video and chat, creating an immersive online environment for meetings, networking, and casual hangouts.",
    image: "/projects/saas-platform.jpg",
    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/Youtube-University.git",
    liveUrl: "https://saas-platform.vercel.app",
  },
  {
    title: "Nova",
    description:
      "Built an AI-powered website builder that transforms natural language prompts into fully functional web applications. Developed with modern full-stack technologies to generate responsive interfaces, reusable components, and production-ready code in real time.",
    image: "/projects/saas-platform.jpg",
    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/Youtube-University.git",
    liveUrl: "https://saas-platform.vercel.app",
  },
  {
    title: "ChitChat",
    description:
      "Built a real-time chat application that enables users to send instant messages, create conversations, and communicate seamlessly.",
    image: "/projects/saas-platform.jpg",
    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/sahayanshuman2005/Youtube-University.git",
    liveUrl: "https://saas-platform.vercel.app",
  },
];

const LS_KEY = "portfolio_projects_order";

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
  localStorage.setItem(
    LS_KEY,
    JSON.stringify(projects.map((p) => p.title))
  );
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
});

export default function Projects() {
  const reduced = useReducedMotion() ?? false;

  const [projects, setProjects] =
    useState<ProjectCardProps[]>(DEFAULT_PROJECTS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isReordered, setIsReordered] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setProjects(loadOrder());
    setIsReordered(!!localStorage.getItem(LS_KEY));
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

  const handleDragStart = (event: {
    active: { id: string | number };
  }) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProjects((prev) => {
      const oldIdx = prev.findIndex((p) => p.title === active.id);
      const newIdx = prev.findIndex((p) => p.title === over.id);

      const next = arrayMove(prev, oldIdx, newIdx);
      saveOrder(next);
      return next;
    });

    setIsReordered(true);
  };

  const handleMoveToTop = (title: string) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.title === title);
      if (idx <= 0) return prev;

      const next = [
        prev[idx],
        ...prev.slice(0, idx),
        ...prev.slice(idx + 1),
      ];

      saveOrder(next);
      return next;
    });

    setIsReordered(true);
    setToast(`"${title}" moved to top`);

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const resetOrder = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem(LS_KEY);
    setIsReordered(false);
  };

  const activeProject = projects.find(
    (p) => p.title === activeId
  );

  return (
    <section
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="absolute inset-0 bg-black/65"
        aria-hidden="true"
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-xl pointer-events-none"
          >
            ↑ {toast}
          </motion.div>
        )}
      </AnimatePresence>

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
          <p className="text-white/25 text-xs font-mono select-none">
            <span className="hidden sm:inline">
              
            </span>
            <span className="sm:hidden">
              
            </span>
          </p>

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
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: reduced ? 0 : 0.08,
                    delayChildren: reduced ? 0 : 0.2,
                  },
                },
              }}
            >
              {projects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                  onMoveToTop={handleMoveToTop}
                  isPinned={idx === 0}
                />
              ))}
            </motion.div>
          </SortableContext>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: "0.4",
                  },
                },
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
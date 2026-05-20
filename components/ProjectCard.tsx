"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronsUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageAlt?: string;
  onMoveToTop?: (title: string) => void;
  isPinned?: boolean;
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
  imageAlt = "Project screenshot",
  onMoveToTop,
  isPinned = false,
}: ProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: title });

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (!showFull) return;

    const t = setTimeout(() => setShowFull(false), 4000);
    return () => clearTimeout(t);
  }, [showFull]);

  const [flashed, setFlashed] = useState(false);

  const handleMoveToTop = () => {
    if (isPinned || !onMoveToTop) return;

    onMoveToTop(title);
    setFlashed(true);

    setTimeout(() => setFlashed(false), 1200);
  };

  const visibleTech = techStack.slice(0, 6);
  const extraCount = techStack.length - 6;

  return (
    <motion.div
      ref={setNodeRef}
      style={dragStyle}
      layout
      variants={cardVariants}
      className={[
        "group relative flex flex-col h-full",
        "bg-white/5 backdrop-blur-md",
        "border rounded-xl sm:rounded-2xl overflow-hidden",
        "transition-colors duration-300",
        isDragging
          ? "scale-[1.03] shadow-2xl shadow-black/60 border-white/30 opacity-75 z-50"
          : isPinned
          ? "border-white/30 shadow-lg shadow-white/5 hover:border-white/40"
          : "border-white/10 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-black/50",
      ].join(" ")}
    >
      {isPinned && (
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/20">
          <ChevronsUp size={10} className="text-white/80" />
          <span className="text-white/70 text-[9px] font-semibold tracking-wider uppercase">
            Top
          </span>
        </div>
      )}

      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
        {onMoveToTop && (
          <div className="relative group/pin">
            <button
              onClick={handleMoveToTop}
              onPointerDown={(e) => e.stopPropagation()}
              disabled={isPinned}
              aria-label="Move to top"
              className={[
                "flex items-center justify-center w-7 h-7 rounded-full",
                "backdrop-blur-sm transition-all duration-200",
                "opacity-0 group-hover:opacity-100",
                isPinned
                  ? "bg-white/20 text-white/60 cursor-default"
                  : flashed
                  ? "bg-white text-black scale-110"
                  : "bg-black/60 text-white/70 hover:bg-white hover:text-black hover:scale-110 cursor-pointer",
              ].join(" ")}
            >
              <ChevronsUp size={14} />
            </button>

            {!isPinned && (
              <span
                className="
                  pointer-events-none
                  absolute bottom-full right-0 mb-1.5
                  whitespace-nowrap
                  bg-black/80 backdrop-blur-sm
                  border border-white/10
                  text-white/80 text-[10px] font-medium
                  px-2 py-0.5 rounded-md
                  opacity-0 group-hover/pin:opacity-100
                  transition-opacity duration-150
                "
              >
                Move to top
              </span>
            )}
          </div>
        )}

        <div
          {...attributes}
          {...listeners}
          title="Drag to reorder"
          className="
            flex items-center justify-center w-7 h-7 rounded-full
            bg-black/60 backdrop-blur-sm
            text-white/60 hover:text-white
            cursor-grab active:cursor-grabbing
            opacity-0 group-hover:opacity-100
            transition-all duration-200
            hover:bg-black/80
            select-none
          "
          style={{ touchAction: "none" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            <circle cx="4" cy="3" r="1.2" />
            <circle cx="8" cy="3" r="1.2" />
            <circle cx="4" cy="6" r="1.2" />
            <circle cx="8" cy="6" r="1.2" />
            <circle cx="4" cy="9" r="1.2" />
            <circle cx="8" cy="9" r="1.2" />
          </svg>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-black/30 shrink-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 line-clamp-2">
          {title}
        </h3>

        <motion.p
          layout
          onClick={() => setShowFull(true)}
          className={[
            "text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-3 sm:mb-4 cursor-pointer transition-all duration-300",
            showFull ? "line-clamp-none text-white/90" : "line-clamp-3",
          ].join(" ")}
        >
          {description}
        </motion.p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/8 border border-white/10 rounded-full text-white/70 text-[10px] sm:text-xs font-medium"
            >
              {tech}
            </span>
          ))}

          {extraCount > 0 && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/8 border border-white/10 rounded-full text-white/50 text-[10px] sm:text-xs font-medium">
              +{extraCount}
            </span>
          )}
        </div>

        <div className="flex gap-2 sm:gap-3 mt-auto">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-lg text-white text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-105 min-h-[40px] sm:min-h-[44px]"
          >
            <GitHubIcon size={14} />
            <span>Code</span>
          </a>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-white hover:bg-white/90 rounded-lg text-black text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-105 min-h-[40px] sm:min-h-[44px]"
          >
            <ExternalLink size={14} className="shrink-0" />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
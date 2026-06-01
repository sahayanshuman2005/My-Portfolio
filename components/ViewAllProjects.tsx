import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ViewAllProjects() {
  return (
    <div className="flex justify-center mt-12 sm:mt-16">
      <Link
        href="/project"
        aria-label="View all projects"
        className="
          group
          inline-flex
          items-center
          gap-2
          px-8
          py-4
          rounded-xl
          bg-white
          text-black
          font-semibold
          shadow-lg
          cursor-pointer
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-2xl
          hover:bg-white/90
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2
          focus:ring-offset-black
        "
      >
        View All Projects

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
import Image from "next/image";
import { Hero } from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <div>
      <Skills/>
      <Contact/>
    </div>
  );
}

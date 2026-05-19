import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/Project";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Skills />
      <Projects/>
      <Contact />
    </div>
  );
}
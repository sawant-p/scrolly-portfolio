import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300">
      <div className="relative w-full">
        {/* The canvas handles the sticky background and main scroll driver */}
        <ScrollyCanvas />
        {/* The overlay is absolute and sits on top using pointer-events-none */}
        <Overlay />
      </div>
      {/* Experience flows directly below the 500vh scrolly container */}
      <Experience />
      <Projects />
    </main>
  );
}

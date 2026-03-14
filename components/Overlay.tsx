"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Mouse } from "lucide-react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Fully visible at top (0%), fades out 15->20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20], [0, -100]);

  // Section 2: Fades in 30->35%, fades out 45->50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.50], [50, -50]);

  // Section 3: Fades in 60->65%, fades out 75->80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.80], [50, -50]);

  return (
    // Height equals Canvas scroll section
    <div ref={containerRef} className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
        
        {/* Section 1 - Center */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-foreground drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-none transition-colors duration-300">
            Parth Sawant
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-zinc-700 dark:text-zinc-300 font-bold tracking-wide drop-shadow-sm dark:drop-shadow-md transition-colors duration-300">
            AI & Data Science Enthusiast.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center text-zinc-700 dark:text-white/40 transition-colors duration-300"
          >
            <Mouse className="w-6 h-6 mb-2" strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Section 2 - Left/Center mobile */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-center md:text-left max-w-2xl px-8 mx-auto md:mx-0"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight transition-colors duration-300">
            I build intelligent<br />data solutions.
          </h2>
        </motion.div>

        {/* Section 3 - Right/Center mobile */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-center md:items-end justify-center text-center md:text-right px-8 md:pr-32 mx-auto md:mx-0"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-foreground drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight transition-colors duration-300">
              Bridging GenAI<br />and engineering.
            </h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

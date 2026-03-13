"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Fades in 0->5%, fades out 15->20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
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
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 md:px-24">
        
        {/* Section 1 - Center */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            Parth Sawant
          </h1>
          <p className="text-xl md:text-3xl text-zinc-300 font-medium tracking-wide drop-shadow-md">
            AI & Data Science Enthusiast.
          </p>
        </motion.div>

        {/* Scroll Indicator (Same fade out window as Section 1) */}
        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/50"
          >
            <span className="text-sm font-medium tracking-widest uppercase mb-2">Scroll To Explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Section 2 - Left */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left max-w-2xl px-8"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight">
            I build intelligent<br />data solutions.
          </h2>
        </motion.div>

        {/* Section 3 - Right */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right pr-8 lg:pr-32"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] leading-tight">
              Bridging GenAI<br />and engineering.
            </h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

function padIndex(index: number) {
  return index.toString().padStart(3, '0');
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const lastRenderedIndex = useRef(-1);
  
  // Total frames: 192 (0 to 191)
  const totalFrames = 192;

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Using sequence of standard images with specific naming
      img.src = `/sequence/frame_${padIndex(i)}_delay-0.041s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 && canvasRef.current) {
          // Draw the very first frame quickly, rather than waiting for 0th index
          renderFrame(img);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Pre-calculate sizing once per resize instead of every scroll frame
  const canvasSizingRef = useRef({ width: 0, height: 0, offsetX: 0, offsetY: 0, drawWidth: 0, drawHeight: 0 });

  const calculateSizing = (img: HTMLImageElement | undefined) => {
    if (!canvasRef.current || !img || !img.complete) return false;
    const canvas = canvasRef.current;
    
    // Handle high DPI displays, but cap at 2.0 to prevent massive performance drops on phones
    // Many modern phones have 3.0 or higher, which creates a canvas 9x the size, destroying performance.
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    canvasSizingRef.current = { width: canvas.width, height: canvas.height, offsetX, offsetY, drawWidth, drawHeight };
    return true;
  };

  const renderFrame = (img: HTMLImageElement | undefined) => {
    if (!canvasRef.current || !img || !img.complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY, drawWidth, drawHeight } = canvasSizingRef.current;
    
    // Fallback if sizing hasn't been calculated yet
    if (drawWidth === 0 && calculateSizing(img)) {
       const newSizing = canvasSizingRef.current;
       ctx.drawImage(img, newSizing.offsetX, newSizing.offsetY, newSizing.drawWidth, newSizing.drawHeight);
       return;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Listen to frame index changes and draw smoothly
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentIndex = Math.min(totalFrames - 1, Math.floor(latest));
    // CRITICAL FIX: Only redraw if the integer index actually changed.
    // Framer Motion calls this hundreds of times per second with fractional changes.
    // Redrawing the SAME image constantly causes massive lag.
    if (currentIndex !== lastRenderedIndex.current && images[currentIndex]) {
      lastRenderedIndex.current = currentIndex;
      // Use requestAnimationFrame to sync with browser painting, reducing lag
      requestAnimationFrame(() => renderFrame(images[currentIndex]));
    }
  });

  // Handle manual resizes to keep canvas sharp
  useEffect(() => {
    const handleResize = () => {
      const currentIndex = Math.min(totalFrames - 1, Math.floor(frameIndex.get()));
      if (images[currentIndex]) {
        calculateSizing(images[currentIndex]);
        renderFrame(images[currentIndex]);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-100 dark:bg-[#121212] transition-colors duration-300" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-100 dark:bg-[#121212] transition-colors duration-300">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover block dark:invert-0 invert transition-all duration-300"
        />
      </div>
    </div>
  );
}

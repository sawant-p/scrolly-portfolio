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

  const renderFrame = (img: HTMLImageElement | undefined) => {
    if (!canvasRef.current || !img || !img.complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // We skip clearRect to prevent "black flashes" during load.
    // Since we use cover logic, the image will always fill the canvas.

    // Cover logic (similar to object-fit: cover)
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image (Mobile)
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Listen to frame index changes and draw smoothly
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentIndex = Math.min(totalFrames - 1, Math.floor(latest));
    if (images[currentIndex]) {
      requestAnimationFrame(() => renderFrame(images[currentIndex]));
    }
  });

  // Handle manual resizes to keep canvas sharp
  useEffect(() => {
    const handleResize = () => {
      const currentIndex = Math.min(totalFrames - 1, Math.floor(frameIndex.get()));
      if (images[currentIndex]) {
        renderFrame(images[currentIndex]);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#121212]" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover block"
        />
      </div>
    </div>
  );
}

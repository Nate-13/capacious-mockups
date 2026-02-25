"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface LaserPath {
  id: number;
  points: string;
  fading: boolean;
}

let rippleId = 0;
let pathId = 0;

export default function CursorEnhancer() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [laserPaths, setLaserPaths] = useState<LaserPath[]>([]);
  const isDragging = useRef(false);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const currentPathId = useRef<number>(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const activeGlowRef = useRef<SVGPathElement>(null);

  // Build an SVG path string from points
  const buildPath = useCallback((points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      if (i < points.length - 1) {
        const mx = (points[i].x + points[i + 1].x) / 2;
        const my = (points[i].y + points[i + 1].y) / 2;
        d += ` Q ${points[i].x} ${points[i].y} ${mx} ${my}`;
      } else {
        d += ` L ${points[i].x} ${points[i].y}`;
      }
    }
    return d;
  }, []);

  // Track mouse position via ref (no re-renders)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      // Laser path drawing - update both SVG paths directly via refs
      if (isDragging.current) {
        currentPoints.current.push({ x: e.clientX, y: e.clientY });
        const d = buildPath(currentPoints.current);
        if (activeGlowRef.current) {
          activeGlowRef.current.setAttribute("d", d);
        }
        if (activePathRef.current) {
          activePathRef.current.setAttribute("d", d);
        }
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [buildPath]);

  // Prevent text selection during drag
  useEffect(() => {
    const handler = (e: Event) => {
      if (isDragging.current) {
        e.preventDefault();
      }
    };
    document.addEventListener("selectstart", handler);
    return () => document.removeEventListener("selectstart", handler);
  }, []);

  // Mouse down - start laser path
  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();

    // Ripple
    const id = ++rippleId;
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);

    // Start laser path
    isDragging.current = true;
    currentPoints.current = [{ x: e.clientX, y: e.clientY }];
    currentPathId.current = ++pathId;

    setLaserPaths((prev) => [
      ...prev,
      {
        id: currentPathId.current,
        points: "",
        fading: false,
      },
    ]);
  }, []);

  // Mouse up - finalize and fade the path
  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const finalPath = buildPath(currentPoints.current);
    const id = currentPathId.current;

    // Only keep if there's a meaningful drag
    if (currentPoints.current.length < 4) {
      setLaserPaths((prev) => prev.filter((p) => p.id !== id));
      currentPoints.current = [];
      return;
    }

    // Snapshot the final path, keep it visible
    setLaserPaths((prev) =>
      prev.map((p) => (p.id === id ? { ...p, points: finalPath } : p)),
    );
    currentPoints.current = [];

    // Start fading immediately
    setLaserPaths((prev) =>
      prev.map((p) => (p.id === id ? { ...p, fading: true } : p)),
    );
    // Remove from DOM after fade completes
    setTimeout(() => {
      setLaserPaths((prev) => prev.filter((p) => p.id !== id));
    }, 1500);
  }, [buildPath]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const activePath = laserPaths.find((p) => !p.fading);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full"
          style={{
            width: 36,
            height: 36,
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            border: "2.5px solid rgba(59, 130, 246, 0.5)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 7,
            backgroundColor: "rgba(59, 130, 246, 0.9)",
            top: -3.5,
            left: -3.5,
          }}
        />
      </div>

      {/* Laser pointer SVG layer */}
      <svg
        ref={svgRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
        width="100%"
        height="100%"
        overflow="visible"
      >
        <defs>
          <filter id="laser-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* All laser paths — completed ones stay in DOM so CSS transitions work */}
        {laserPaths.map((lp) => {
          const isActive = !lp.fading && !lp.points;
          return (
            <g
              key={lp.id}
              style={{
                opacity: lp.fading ? 0 : 1,
                transition: lp.fading ? "opacity 1.5s ease-out" : "none",
              }}
            >
              <path
                ref={isActive ? activeGlowRef : undefined}
                d={lp.points}
                fill="none"
                stroke="rgba(239, 68, 68, 0.35)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#laser-glow)"
              />
              <path
                ref={isActive ? activePathRef : undefined}
                d={lp.points}
                fill="none"
                stroke="rgba(239, 68, 68, 0.85)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none fixed z-[9998] rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              border: "3px solid rgba(59, 130, 246, 0.6)",
              backgroundColor: "rgba(59, 130, 246, 0.15)",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ width: 10, height: 10, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

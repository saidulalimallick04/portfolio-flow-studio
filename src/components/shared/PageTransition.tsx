"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// TRANSITION CONFIGURATION
// Options: "none" | "minimal" | "diagonal" | "waterfall" | "shutter"
const CURRENT_TRANSITION: "none" | "minimal" | "diagonal" | "waterfall" | "shutter" = "diagonal";

// HOOK: Shared logic for transition components
function useTransitionContext() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Common Theme Colors
  const darkLayers = ["bg-[#881d1d]", "bg-[#886a1d]", "bg-[#1d5f88]", "bg-[#1d8866]", "bg-[#561d88]"];
  const lightLayers = ["bg-[#ffadad]", "bg-[#ffd6a5]", "bg-[#fdffb6]", "bg-[#caffbf]", "bg-[#a0c4ff]"];
  // Fallback to dark layers if not mounted (avoid hydration mismatch)
  const layers = mounted && resolvedTheme === "light" ? lightLayers : darkLayers;

  return { pathname, layers };
}

// 1. DIAGONAL TRANSITION (Formerly Cartoon)
function DiagonalTransition({ children }: { children: React.ReactNode }) {
  const { pathname, layers } = useTransitionContext();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full">
        {/* Diagonal Wipe Overlay */}
        <div className="fixed top-1/2 left-1/2 z-40 flex h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2 -rotate-45 flex-col pointer-events-none">
          {layers.map((color, i) => (
            <motion.div
              key={i}
              className={`flex-1 w-full ${color} border-b-2 border-black/10`}
              initial={{ x: "0%" }}
              animate={{
                x: "-100%",
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
                transitionEnd: { x: "100%" },
              }}
              exit={{
                x: "0%",
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
              }}
            />
          ))}
        </div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// 2. MINIMAL TRANSITION: Soft, Sweet, Smooth
function MinimalTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useTransitionContext();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        exit={{
          opacity: 0,
          y: -15,
          scale: 0.98,
          transition: { duration: 0.3, ease: "easeIn" }
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// 3. WATERFALL TRANSITION: Vertical Staggered Drop
function WaterfallTransition({ children }: { children: React.ReactNode }) {
  const { pathname, layers } = useTransitionContext();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full h-full">
        {/* Waterfall Overlay - Flex Row of Vertical Bars */}
        <div className="fixed inset-0 z-40 flex pointer-events-none">
          {layers.map((color, i) => (
            <motion.div
              key={i}
              className={`relative h-full flex-1 ${color} border-r-2 border-black/10`}
              initial={{ y: "-100%" }}
              animate={{
                y: "100%", // Move all the way down to exit frame
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06 // Wave effect
                },
                transitionEnd: { y: "-100%" } // Reset position
              }}
              exit={{
                y: "0%", // Drop into view to cover screen
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.06
                }
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// 4. SHUTTER TRANSITION: Concentric Iris Wipe
function ShutterTransition({ children }: { children: React.ReactNode }) {
  const { pathname, layers } = useTransitionContext();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative w-full">
        {/* Iris Overlay */}
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          {layers.map((color, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 w-full h-full ${color}`}
              // ENTER PHASE (New Page)
              initial={{ clipPath: "circle(150% at 50% 50%)" }} // Starts Closed (Fully Covered)
              animate={{
                clipPath: "circle(0% at 50% 50%)", // Opens (Shrinks to nothing)
                transition: { duration: 0.5, ease: "circOut", delay: i * 0.06 + 0.1 },
              }}
              // EXIT PHASE (Old Page)
              exit={{
                clipPath: "circle(150% at 50% 50%)", // Closes (Grows to cover)
                transition: { duration: 0.5, ease: "circIn", delay: i * 0.06 },
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// MAIN COMPONENT
export function PageTransition({ children }: { children: React.ReactNode }) {

  if (CURRENT_TRANSITION === "none") return <>{children}</>;
  if (CURRENT_TRANSITION === "diagonal") return <DiagonalTransition>{children}</DiagonalTransition>;
  if (CURRENT_TRANSITION === "minimal") return <MinimalTransition>{children}</MinimalTransition>;
  if (CURRENT_TRANSITION === "waterfall") return <WaterfallTransition>{children}</WaterfallTransition>;
  if (CURRENT_TRANSITION === "shutter") return <ShutterTransition>{children}</ShutterTransition>;

  return <>{children}</>;

}


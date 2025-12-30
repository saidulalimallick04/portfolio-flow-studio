"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  CodeXml,
  Menu,
  X,
  Home,
  Briefcase,
  Lightbulb,
  Milestone,
  Heart,
  Users,
  Sparkles
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Lightbulb },
  { href: "/journey", label: "My Journey", icon: Milestone },
  { href: "/hobbies", label: "Hobbies", icon: Heart },
  { href: "/collaborators", label: "Collaborators", icon: Users },
  { href: "/studio", label: "Studio", icon: Sparkles },
];

// Deterministic random start positions (x, y) relative to final position
const directions = [
  { x: -100, y: -100 }, // Top-Left
  { x: 100, y: 100 },   // Bottom-Right
  { x: -150, y: 50 },   // Left
  { x: 150, y: -50 },   // Right
  { x: 0, y: 200 },     // Bottom
  { x: 200, y: 0 },     // Right
  { x: -50, y: 150 },   // Bottom-Left
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!headerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(headerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const w = dimensions.width;
  const h = dimensions.height;
  const r = h / 2;
  // Path: Top-Center -> Left -> Bottom -> Right -> Top-Center (Counter-Clockwise)
  const pathD = `
    M ${w / 2} 0
    L ${r} 0
    A ${r} ${r} 0 1 0 ${r} ${h}
    L ${w - r} ${h}
    A ${r} ${r} 0 1 0 ${w - r} 0
    L ${w / 2} 0
  `;

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -100, x: "-50%", width: "3.5rem", borderRadius: "100px", opacity: 0 }}
        animate={{ y: 0, x: "-50%", width: "95%", borderRadius: "9999px", opacity: 1 }}
        transition={{
          y: { duration: 0.6, type: "spring", bounce: 0.4 },
          width: { duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 },
          borderRadius: { delay: 0.3 },
          opacity: { duration: 0.2 }
        }}
        className="fixed top-6 left-1/2 z-50 max-w-5xl border bg-background/80 shadow-lg backdrop-blur-md overflow-hidden"
        style={{ minWidth: "3.5rem" }} // Ensure it doesn't collapse too much
      >
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
          <motion.path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))" // Using primary color for high visibility
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }} // Delay content until after width expansion starts
          className="relative z-10 flex h-14 items-center justify-between px-6"
        >
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <CodeXml className="h-6 w-6 text-accent" />
            <span className="text-lg font-headline font-bold whitespace-nowrap">PortfolioFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 min-[864px]:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent whitespace-nowrap",
                    pathname === link.href ? "text-accent" : "text-foreground/70"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <div className="min-[864px]:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50" // Ensure button is above overlay
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/80"
            onClick={() => setIsOpen(false)} // Click outside to close (though whole screen is clickable)
          >
            <div className="flex h-full flex-col justify-center px-6 pt-24 pb-12">
              <div className="grid grid-cols-6 gap-4 max-w-lg mx-auto w-full">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      x: directions[index]?.x || 0,
                      y: directions[index]?.y || 0
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 150,
                      delay: 0.1 + (index * 0.08), // Slightly more stagger
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      // First 4 items (index 0-3) span 3 cols (2 per row)
                      // Last 3 items (index 4-6) span 2 cols (3 per row)
                      index < 4 ? "col-span-3" : "col-span-2"
                    )}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-3 rounded-xl border bg-card/50 p-4 text-center shadow-sm transition-all hover:bg-accent/10 hover:border-accent/50 hover:scale-105 active:scale-95",
                        pathname === link.href ? "border-accent bg-accent/10 text-accent" : "text-foreground"
                      )}
                    >
                      <link.icon className={cn("h-6 w-6", pathname === link.href ? "text-accent" : "text-muted-foreground")} />
                      <span className="text-xs font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CodeXml, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/journey", label: "My Journey" },
  { href: "/hobbies", label: "Hobbies" },
  { href: "/collaborators", label: "Collaborators" },
  { href: "/studio", label: "Studio" },
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
          <nav className="hidden items-center gap-6 md:flex">
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
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-6 pt-12">
                  <Link href="/" className="flex items-center gap-2 font-bold text-primary" onClick={() => setIsOpen(false)}>
                    <CodeXml className="h-7 w-7 text-accent" />
                    <span className="text-xl font-headline font-bold">PortfolioFlow</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-accent",
                          pathname === link.href ? "text-accent" : "text-foreground/70"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

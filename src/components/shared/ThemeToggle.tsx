"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. If View Transitions API is not supported, just switch theme
    if (!(document as any).startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark")
      return
    }

    // 2. Get click coordinates
    const x = e.clientX
    const y = e.clientY

    // 3. Calculate distance to furthest corner
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    // 4. Start the transition
    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark")
      })
    })

    // 5. Animate the clip-path
    await transition.ready

    const isGoingToDark = theme === "light"; // Current is light, so next is dark

    // Control stacking context via CSS variables
    if (isGoingToDark) {
      document.documentElement.style.setProperty("--vt-new-z", "9999");
      document.documentElement.style.setProperty("--vt-old-z", "1");
    } else {
      document.documentElement.style.setProperty("--vt-new-z", "1");
      document.documentElement.style.setProperty("--vt-old-z", "9999");
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    // If going to dark, we expand the NEW view (Dark).
    // If going to light, we shrink the OLD view (Dark).
    // So 'Dark' is always the one animating.

    const pseudoElement = isGoingToDark
      ? "::view-transition-new(root)"
      : "::view-transition-old(root)";

    // If going to light, we reverse the frames to shrink
    const keyframes = isGoingToDark ? { clipPath } : { clipPath: [...clipPath].reverse() };

    const animation = document.documentElement.animate(
      keyframes,
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement,
      }
    );

    // Cleanup z-index overrides after animation
    animation.onfinish = () => {
      document.documentElement.style.removeProperty("--vt-new-z");
      document.documentElement.style.removeProperty("--vt-old-z");
    };
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle Theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

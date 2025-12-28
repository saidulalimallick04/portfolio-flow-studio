"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

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

    // Animate the NEW view (z-index 9999) growing from the click
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

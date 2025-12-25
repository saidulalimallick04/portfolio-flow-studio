"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Briefcase,
  Heart,
  Users,
  Sparkles,
  Lightbulb,
  Milestone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const desktopNavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/skills", label: "Skills", icon: Lightbulb },
    { href: "/journey", label: "My Journey", icon: Milestone },
    { href: "/hobbies", label: "Hobbies", icon: Heart },
    { href: "/collaborators", label: "Collaborators", icon: Users },
    { href: "/studio", label: "Studio", icon: Sparkles },
];

const mobileNavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/skills", label: "Skills", icon: Lightbulb },
    { href: "/journey", label: "My Journey", icon: Milestone },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Nav */}
      <div className="md:hidden">
        <TooltipProvider>
          <div className="flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur-sm">
            {mobileNavLinks.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-full",
                      pathname === link.href ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    <Link href={link.href}>
                      <link.icon
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          pathname === link.href ? "scale-125" : ""
                        )}
                      />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <TooltipProvider>
          <div className="flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur-sm">
            {desktopNavLinks.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-12 w-12 rounded-full",
                      pathname === link.href ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    <Link href={link.href}>
                      <link.icon
                        className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          pathname === link.href ? "scale-125" : ""
                        )}
                      />
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Home,
  Briefcase,
  Heart,
  Users,
  Sparkles,
  Lightbulb,
  Milestone,
  MoreHorizontal,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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
];

const moreLinks = [
  { href: "/journey", label: "Timeline", icon: Milestone },
  { href: "/hobbies", label: "Hobbies", icon: Heart },
  { href: "/collaborators", label: "Collaborators", icon: Users },
  { href: "/studio", label: "Studio", icon: Sparkles },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMoreOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

            <Popover open={isMoreOpen} onOpenChange={setIsMoreOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full transition-transform duration-300",
                    isMoreOpen ? "bg-accent text-accent-foreground rotate-180" : ""
                  )}
                >
                  {isMoreOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <MoreHorizontal className="h-5 w-5" />
                  )}
                  <span className="sr-only">{isMoreOpen ? "Close" : "More"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="center" className="w-auto p-2 mb-2 rounded-full border bg-background/95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  {moreLinks.map((link) => (
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
                          onClick={() => setIsMoreOpen(false)}
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
              </PopoverContent>
            </Popover>
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

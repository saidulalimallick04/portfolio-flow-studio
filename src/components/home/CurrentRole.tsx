"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building2, Terminal, Sparkles, Server, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export function CurrentRole() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="current-role" className="py-12 md:py-16 border-t border-border/40">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-5xl transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-6 md:p-10 shadow-xl backdrop-blur-md">
          {/* Subtle background glow effect */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 gap-1.5 px-3 py-1 font-medium text-xs">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
                  Current Chapter & Industry Work
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  2025 - Present
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span>Backend & AI/ML Engineer</span>
                </h3>
                <p className="mt-1 text-lg font-semibold text-primary flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  Pathvex Digital Solutions
                  <span className="text-xs font-normal text-muted-foreground">(pathvex.in)</span>
                </p>
              </div>

              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                Driving backend engineering and technical innovation at{" "}
                <strong className="text-foreground font-semibold">Pathvex Digital Solutions</strong>.
                Architecting high-concurrency microservices, robust RESTful APIs, intelligent data pipelines,
                and scalable cloud infrastructure for modern enterprise clients.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Backend Systems", "Python & Django", "FastAPI", "PostgreSQL", "Next.js", "AI/ML Integration", "Cloud Architecture"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md bg-secondary/60 px-2.5 py-1 text-xs font-medium text-secondary-foreground border border-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[210px] md:items-end justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-md gap-2 group">
                <Link
                  href="https://pathvex.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Pathvex Digital Solutions official website"
                >
                  <span>Visit Pathvex.in</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-border/80 hover:bg-accent/20"
              >
                <Link href="/journey">
                  View Career Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { homePageData } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export function About() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="about" className="py-16 md:py-24">
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-3xl text-center transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {homePageData.about.sectionTitle}
        </h2>
        <div className="mt-6 space-y-6 text-lg leading-8 text-foreground/80">
            {homePageData.about.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
            ))}
        </div>
        <div className="mt-10">
            <Button asChild size="lg">
                <Link href="mailto:your-email@example.com">
                    Hire Me
                    <Send className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { journeyData } from "@/lib/placeholder-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export function JourneyTimeline() {
  const { ref, inView } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        "relative max-w-3xl mx-auto transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      {/* The vertical line */}
      <div className="absolute left-5 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
      <ul className="space-y-12">
        {journeyData.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative flex items-start gap-6">
              {/* Dot and Icon */}
              <div className="flex flex-col items-center">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Card Content */}
              <Card className="w-full shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-accent">{item.date}</p>
                      <CardTitle className="text-xl font-bold mt-1">{item.title}</CardTitle>
                      <p className="text-md text-muted-foreground mt-1">{item.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{item.description}</p>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

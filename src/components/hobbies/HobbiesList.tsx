"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hobbiesData, hobbiesPageData } from "@/lib/placeholder-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export function HobbiesList() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section
      id="hobbies"
      ref={ref}
      className={cn(
        "py-16 md:py-24 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
       <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {hobbiesPageData.list.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          {hobbiesPageData.list.description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hobbiesData.map((hobby) => (
            <Card key={hobby.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {hobby.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={hobby.imageUrl}
                    alt={hobby.title}
                    data-ai-hint={hobby.imageHint}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold">{hobby.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData, projectsSectionData } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Calendar, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

export function Work() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="work" className="py-16 md:py-24 border-t">
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {projectsSectionData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            {projectsSectionData.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 3).map((project) => (
              <Card key={project.id} className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {project.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      data-ai-hint={project.imageHint}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <div className="absolute bottom-4 right-4">
                        <span className="inline-block rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm">
                            {project.category}
                        </span>
                     </div>
                  </div>
                )}
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                  <CardDescription className="pt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                   <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                   <Button asChild variant="outline" className="w-full group/button">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

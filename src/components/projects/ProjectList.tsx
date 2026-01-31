"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Search, LayoutGrid, List, Calendar, ArrowUpRight, Clock } from "lucide-react";
import { projectsData } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
} from "@/components/ui/card";

export const projectsSectionData = {
  title: "Projects",
  description: "A selection of projects that I'm proud of."
};

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">("grid");
  const { ref, inView } = useScrollAnimation();

  const filteredProjects = useMemo(() => {
    if (!searchTerm) {
      return projectsData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return projectsData.filter((project) => {
      const { title, description, tags, year, category } = project;
      return (
        title.toLowerCase().includes(lowercasedTerm) ||
        description.toLowerCase().includes(lowercasedTerm) ||
        year.toLowerCase().includes(lowercasedTerm) ||
        category.toLowerCase().includes(lowercasedTerm) ||
        tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
      );
    });
  }, [searchTerm]);

  const projectsByYear = useMemo(() => {
    const grouped: Record<string, typeof projectsData> = {};
    filteredProjects.forEach(project => {
      if (!grouped[project.year]) {
        grouped[project.year] = [];
      }
      grouped[project.year].push(project);
    });
    // Sort years descending (newest first)
    return Object.entries(grouped).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredProjects]);

  return (
    <section id="work" className="py-24 md:py-24">
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

        <div className="sticky top-16 z-30 -mx-4 px-4 py-6 mb-8 transition-all">
          <div className="max-w-4xl mx-auto flex flex-row gap-2 items-center">
            <div className="flex-1 min-w-0 relative rounded-full border bg-card p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full rounded-full border-none bg-transparent pl-10 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex shrink-0 bg-muted p-1 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={cn("gap-2 px-3 transition-all", viewMode === "grid" && "shadow-sm")}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={cn("gap-2 px-3 transition-all", viewMode === "list" && "shadow-sm")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">List</span>
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "ghost"}
                size="sm"
                className={cn("gap-2 px-3 transition-all", viewMode === "timeline" && "shadow-sm")}
                onClick={() => setViewMode("timeline")}
              >
                <Clock className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Timeline</span>
              </Button>
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          viewMode === "timeline" ? (
            <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 md:translate-x-0" />

              {projectsByYear.map(([year, projects]) => (
                <div key={year} className="mb-12 relative">
                  {/* Year Marker */}
                  <div className="sticky top-32 z-20 mb-8 md:mb-12 flex justify-start md:justify-center">
                    <div className="bg-background border border-border px-4 py-1 rounded-full text-lg font-bold shadow-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {year}
                    </div>
                  </div>

                  <div className="space-y-8">
                    {projects.map((project, index) => (
                      <div key={project.id} className={cn(
                        "relative flex flex-col md:flex-row gap-8 items-center",
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      )}>
                        {/* Timeline Dot */}
                        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-[calc(50%+0.5px)] border-4 border-background shadow-sm z-10" />

                        {/* Content Side */}
                        <div className="w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0">
                          <ProjectCard project={project} className="hover:-translate-y-1 transition-transform" />
                        </div>

                        {/* Empty Side for alignment */}
                        <div className="hidden md:block w-[calc(50%-2rem)]" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={cn(
              "grid gap-8",
              viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredProjects.map((project) => (
                viewMode === "grid" ? (
                  <ProjectCard key={project.id} project={project} />
                ) : (
                  <Card key={project.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow">
                    {project.imageUrl && (
                      <div className="relative w-full md:w-64 aspect-video md:aspect-auto">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 md:hidden">
                          <span className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm",
                            project.status === 'completed' ? "bg-green-500/80 text-white" : "bg-yellow-500/80 text-white"
                          )}>
                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent border border-accent/20">
                              {project.category}
                            </span>
                            <span className={cn(
                              "hidden md:inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                              project.status === 'completed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            )}>
                              {project.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          <Link href={`/projects/${project.id}`} className="hover:underline decoration-primary decoration-2 underline-offset-4">
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                          </Link>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap ml-4">
                          <Calendar className="mr-1 h-3 w-3" />
                          {project.year}
                        </div>
                      </div>
                      <p className="mt-2 text-muted-foreground line-clamp-2 md:line-clamp-none flex-grow">
                        {project.description}
                      </p>
                      <div className="mt-auto grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-end">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 5).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {project.alternativeLink && (
                            <Link
                              href={project.alternativeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground underline hover:text-primary mb-1"
                            >
                              Alternative Link
                            </Link>
                          )}
                          <div className="flex gap-3">
                            <Button asChild size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                              <Link href={`/projects/${project.id}`}>
                                View Details
                              </Link>
                            </Button>
                            {project.liveUrl && project.liveUrl !== '#' && (
                              <Button asChild size="sm" variant="outline">
                                <Link href={project.liveUrl} target="_blank">
                                  Live Demo <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                            {project.githubUrl && project.githubUrl !== '#' && (
                              <Button asChild size="sm" variant="secondary">
                                <Link href={project.githubUrl} target="_blank">
                                  GitHub <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No projects found for &quot;{searchTerm}&quot;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            className={cn(
                "group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                className
            )}
        >
            {project.imageUrl && (
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        data-ai-hint={project.imageHint}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4">
                        <span className="inline-block rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm">
                            {project.category}
                        </span>
                        <span
                            className={cn(
                                "ml-2 inline-block rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm",
                                project.status === "completed"
                                    ? "bg-green-500/80 text-white"
                                    : "bg-yellow-500/80 text-white"
                            )}
                        >
                            {project.status === "completed" ? "Completed" : "In Progress"}
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
                <div className="pt-2">
                    <CardDescription
                        className={cn(
                            "text-muted-foreground transition-all duration-300",
                            !isExpanded && "line-clamp-2"
                        )}
                    >
                        {project.description}
                    </CardDescription>
                    <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 mt-1 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <span className="flex items-center">
                                Show less <ChevronUp className="ml-1 h-3 w-3" />
                            </span>
                        ) : (
                            <span className="flex items-center">
                                Show more <ChevronDown className="ml-1 h-3 w-3" />
                            </span>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                {project.alternativeLink && (
                    <div className="mt-4 text-xs">
                        <Link
                            href={project.alternativeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground underline hover:text-primary"
                        >
                            Alternative Link
                        </Link>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                {project.liveUrl && project.liveUrl !== "#" && (
                    <Button asChild variant="outline" className="flex-1 group/button">
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
                        </Link>
                    </Button>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                    <Button asChild variant="secondary" className="flex-1 group/button">
                        <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

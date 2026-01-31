"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Calendar,
    Github,
    Globe,
    Tag,
    ArrowUpRight,
} from "lucide-react";
import { projectsData } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params?.id as string;

    const project = projectsData.find((p) => p.id === id);

    if (!project) {
        return (
            <Container className="py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                <p className="text-muted-foreground mb-8">The project you are looking for does not exist.</p>
                <Button asChild>
                    <Link href="/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                    </Link>
                </Button>
            </Container>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-muted">
                {project.imageUrl && (
                    <>
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover opacity-30 blur-sm scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </>
                )}

                <Container className="relative h-full flex flex-col justify-end pb-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge className="bg-primary/90 hover:bg-primary text-md py-1 px-3">
                                {project.category}
                            </Badge>
                            <Badge variant={project.status === "completed" ? "default" : "secondary"} className={cn(
                                "text-md py-1 px-3",
                                project.status === "completed" ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"
                            )}>
                                {project.status === "completed" ? "Completed" : "In Progress"}
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{project.title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground text-lg">
                            <Calendar className="h-5 w-5" />
                            <span>{project.year}</span>
                        </div>
                    </motion.div>
                </Container>
            </div>

            <Container className="pt-12">
                <div className="grid md:grid-cols-[2fr,1fr] gap-12">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-xl">
                            {project.imageUrl && (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )}
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Tag className="h-5 w-5" /> Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                            <h3 className="font-semibold text-lg mb-2">Project Links</h3>

                            {project.liveUrl && project.liveUrl !== "#" && (
                                <Button className="w-full" asChild>
                                    <Link href={project.liveUrl} target="_blank">
                                        <Globe className="mr-2 h-4 w-4" /> Live Demo
                                    </Link>
                                </Button>
                            )}

                            {project.githubUrl && project.githubUrl !== "#" && (
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={project.githubUrl} target="_blank">
                                        <Github className="mr-2 h-4 w-4" /> View Code
                                    </Link>
                                </Button>
                            )}

                            {!project.liveUrl && !project.githubUrl && (
                                <p className="text-sm text-muted-foreground italic">No public links available.</p>
                            )}

                            {project.alternativeLink && (
                                <Button variant="ghost" className="w-full text-xs text-muted-foreground" asChild>
                                    <Link href={project.alternativeLink} target="_blank">
                                        Alternative Link <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        <div className="pt-4">
                            <Button variant="ghost" className="w-full" asChild>
                                <Link href="/projects">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}

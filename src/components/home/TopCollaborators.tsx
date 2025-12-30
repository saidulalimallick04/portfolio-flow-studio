"use client";

import Image from "next/image";
import Link from "next/link";
import { collaboratorsData } from "@/lib/placeholder-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Twitter, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopCollaborators() {
    const { ref, inView } = useScrollAnimation();

    // Sort by collaboration count descending and take top 4
    const topCollaborators = [...collaboratorsData]
        .sort((a, b) => (b.collaboration_count || 0) - (a.collaboration_count || 0))
        .slice(0, 4);

    return (
        <section className="py-16 md:py-24 border-t relative overflow-hidden">
            {/* Background Decorative Blob */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

            <div
                ref={ref}
                className={cn(
                    "transition-all duration-700 container mx-auto px-4",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
            >
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center justify-center gap-3">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        Top Collaborators
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                        Celebrating the brilliant minds I&apos;ve had the privilege to work with most frequently.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topCollaborators.map((collaborator, index) => (
                        <Card key={collaborator.id} className="group overflow-hidden border-muted bg-background/60 backdrop-blur-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                                    <Avatar className="h-24 w-24 border-2 border-background relative">
                                        <AvatarImage
                                            src={collaborator.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${collaborator.name}`}
                                            alt={collaborator.name}
                                            className="object-cover"
                                        />
                                        <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        {collaborator.collaboration_count} Collabs
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg mb-1">{collaborator.name}</h3>
                                <p className="text-sm text-accent font-medium mb-3">{collaborator.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                                    {collaborator.summary}
                                </p>

                                <div className="flex gap-3 mt-auto">
                                    {collaborator.twitter && (
                                        <Link href={collaborator.twitter} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                                            <Twitter className="h-4 w-4" />
                                        </Link>
                                    )}
                                    {collaborator.linkedin && (
                                        <Link href={collaborator.linkedin} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                                            <Linkedin className="h-4 w-4" />
                                        </Link>
                                    )}
                                    {collaborator.github && (
                                        <Link href={collaborator.github} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                                            <Github className="h-4 w-4" />
                                        </Link>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

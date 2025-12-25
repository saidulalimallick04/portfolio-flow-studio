
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { projectsPageData } from "@/lib/placeholder-data";
import heroImages from "@/lib/placeholder-images.json";
import { ProjectList } from "@/components/projects/ProjectList";
import type { HeroImage } from "@/lib/types";

export default function ProjectsPage() {
  const [heroBg, setHeroBg] = useState<HeroImage | null>(null);

  useEffect(() => {
    const heroBackgrounds = heroImages.projects as HeroImage[];
    setHeroBg(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]);
  }, []);

  return (
    <>
      <div className="relative h-[40vh] min-h-[300px] w-full">
        {heroBg && (
          <Image
            src={heroBg.imageUrl}
            alt={projectsPageData.title}
            data-ai-hint={heroBg.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="animated-aurora" />
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-black text-primary-foreground md:text-6xl">{projectsPageData.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {projectsPageData.description}
          </p>
        </Container>
      </div>
      <Container>
        <ProjectList />
      </Container>
    </>
  );
};

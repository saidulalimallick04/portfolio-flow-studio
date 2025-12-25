
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { HobbiesList } from "@/components/hobbies/HobbiesList";
import { hobbiesPageData } from "@/lib/placeholder-data";
import heroImages from "@/lib/placeholder-images.json";
import type { HeroImage } from "@/lib/types";

export default function HobbiesPage() {
  const [heroBg, setHeroBg] = useState<HeroImage | null>(null);

  useEffect(() => {
    const heroBackgrounds = heroImages.hobbies as HeroImage[];
    setHeroBg(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]);
  }, []);

  return (
    <>
      <div className="relative h-[40vh] min-h-[300px] w-full">
        {heroBg && (
          <Image
            src={heroBg.imageUrl}
            alt={hobbiesPageData.title}
            data-ai-hint={heroBg.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="animated-aurora" />
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-black text-primary-foreground md:text-6xl">{hobbiesPageData.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {hobbiesPageData.description}
          </p>
        </Container>
      </div>

      <Container>
        <HobbiesList />
      </Container>
    </>
  );
};

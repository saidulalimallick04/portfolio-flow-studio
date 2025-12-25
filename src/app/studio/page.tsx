
"use client";

import { useState, useEffect } from "react";
import { StudioHero } from "@/components/studio/StudioHero";
import { Container } from "@/components/shared/Container";
import { StudioGallery } from "@/components/studio/StudioGallery";
import heroImages from "@/lib/placeholder-images.json";
import type { HeroImage } from "@/lib/types";

export default function StudioPage() {
  const [heroBg, setHeroBg] = useState<HeroImage | null>(null);

  useEffect(() => {
    const heroBackgrounds = heroImages.studio as HeroImage[];
    setHeroBg(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]);
  }, []);

  return (
    <>
      <StudioHero heroBg={heroBg} />
      <Container className="py-16 md:py-24">
        <StudioGallery />
      </Container>
    </>
  );
};

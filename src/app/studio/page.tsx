
"use client";

import { useState, useEffect } from "react";
import { StudioHero } from "@/components/studio/StudioHero";
import { Container } from "@/components/shared/Container";
import { StudioGallery } from "@/components/studio/StudioGallery";
import heroImages from "@/lib/placeholder-images.json";
import type { HeroImage } from "@/lib/types";

export default function StudioPage() {
  return (
    <>
      <StudioHero />
      <Container className="py-8 md:py-24">
        <StudioGallery />
      </Container>
    </>
  );
};

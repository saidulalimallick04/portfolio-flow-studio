
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { homePageData } from "@/lib/placeholder-data";
import heroImages from "@/lib/placeholder-images.json";
import { Container } from "../shared/Container";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import type { HeroImage } from "@/lib/types";

export function Hero() {
  const [heroBg, setHeroBg] = useState<HeroImage | null>(null);
  const [profilePic, setProfilePic] = useState<HeroImage | null>(null);

  useEffect(() => {
    const heroBackgrounds = heroImages.home.backgrounds as HeroImage[];
    const profilePictures = heroImages.home.profilePictures as HeroImage[];
    
    setHeroBg(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]);
    setProfilePic(profilePictures[Math.floor(Math.random() * profilePictures.length)]);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
       {heroBg && (
        <>
          <Image
            src={heroBg.imageUrl}
            alt={heroBg.imageHint}
            data-ai-hint={heroBg.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="animated-aurora absolute inset-0" />
        </>
      )}
      <Container className="relative z-10 py-20 sm:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left">
            <p className="text-lg font-medium uppercase tracking-widest text-accent">
              {homePageData.about.title}
            </p>
            <h1 className="glow-name mt-4 font-black">
              {homePageData.about.name}
            </h1>
            <p className="mt-6 text-lg text-foreground/80">
              {homePageData.about.bio}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#about">
                  More About Me
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative mx-auto w-96 h-96">
            <div className="absolute inset-0 -rotate-3 transform rounded-2xl bg-secondary/50 shadow-2xl shadow-accent/20 transition-transform duration-3000 hover:rotate-0 animate-spin-slow"></div>
            <div className="absolute inset-0 rotate-3 transform rounded-2xl bg-accent/30 shadow-2xl shadow-primary/20 transition-transform duration-3000 hover:rotate-0 animate-spin-slower"></div>
            {profilePic && (
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={profilePic.imageUrl}
                  alt={homePageData.about.name}
                  data-ai-hint={profilePic.imageHint}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

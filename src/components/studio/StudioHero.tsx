
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { studioPageData } from "@/lib/placeholder-data";
import type { HeroImage } from "@/lib/types";

export function StudioHero({ heroBg }: { heroBg: HeroImage | null }) {
  return (
    <div className="relative overflow-hidden bg-primary">
      <div className="animated-aurora" />
      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:py-32">
        <div className="text-primary-foreground">
          <h1 className="text-4xl font-black md:text-6xl">
            {studioPageData.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {studioPageData.description}
          </p>
        </div>
        <div className="relative aspect-video rounded-lg shadow-2xl">
          {heroBg && (
            <Image
              src={heroBg.imageUrl}
              alt={studioPageData.title}
              data-ai-hint={heroBg.imageHint}
              fill
              className="rounded-lg object-cover"
            />
          )}
        </div>
      </Container>
    </div>
  );
}

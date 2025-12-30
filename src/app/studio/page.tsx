
import { StudioHero } from "@/components/studio/StudioHero";
import { Container } from "@/components/shared/Container";
import { StudioGallery } from "@/components/studio/StudioGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Studio | PortfolioFlow",
  description: "A showcase of my creative works, media, and design experiments.",
};

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

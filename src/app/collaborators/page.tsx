
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { CollaboratorsList } from "@/components/collaborators/CollaboratorsList";
import { collaboratorsPageData, collaboratorsData } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

export const metadata = {
  title: "Collaborators | PortfolioFlow",
  description: "People I've had the pleasure to work with.",
};

const CollaboratorsPage = () => {
  return (
    <>
      <div className="relative mx-4 mt-24 h-[600px] overflow-hidden rounded-3xl border shadow-2xl">
        <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-background [mask-image:linear-gradient(to_bottom,transparent_10%,black_40%,black_60%,transparent_90%)]">
          <div className="flex h-[150%] w-[150%] -rotate-12 flex-col gap-4 opacity-50 transition-all duration-500 hover:opacity-100">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Marquee
                key={rowIndex}
                pauseOnHover
                reverse={rowIndex % 2 === 1}
                className="[--duration:40s]"
              >
                {/* Repeat data to ensure smooth scrolling */}
                {[...collaboratorsData, ...collaboratorsData, ...collaboratorsData, ...collaboratorsData].map((collaborator, i) => (
                  <div key={`${rowIndex}-${i}`} className="relative h-48 w-48 overflow-hidden rounded-xl border border-border/50 bg-muted/20 shadow-sm transition-transform hover:scale-105">
                    <Image
                      src={collaborator.imageUrl}
                      alt={collaborator.name} // Use name as alt
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Marquee>
            ))}
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-background/90 via-background/40 to-background/90 p-6 text-center backdrop-blur-[1px]">
          <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl">
            {collaboratorsPageData.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            {collaboratorsPageData.description}
          </p>
        </div>
      </div>

      <Container>
        <CollaboratorsList />
      </Container>
    </>
  );
};

export default CollaboratorsPage;

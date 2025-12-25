
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { CollaboratorsList } from "@/components/collaborators/CollaboratorsList";
import { collaboratorsPageData } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

export const metadata = {
  title: "Collaborators | PortfolioFlow",
  description: "People I've had the pleasure to work with.",
};

const CollaboratorImage = ({
  imageUrl,
  imageHint,
  className,
}: {
  imageUrl: string;
  imageHint: string;
  className?: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-44 h-44 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt=""
        data-ai-hint={imageHint}
        fill
        className="object-cover rounded-md"
      />
    </figure>
  );
};

const CollaboratorsPage = () => {
  const firstRow = collaboratorsPageData.heroImages.slice(
    0,
    collaboratorsPageData.heroImages.length / 2
  );
  const secondRow = collaboratorsPageData.heroImages.slice(
    collaboratorsPageData.heroImages.length / 2
  );

  return (
    <div className="bg-background text-foreground">
      <div className="relative overflow-hidden py-16 md:py-24">
        <div className="animated-aurora" />
        <Container className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {collaboratorsPageData.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              {collaboratorsPageData.description}
            </p>
          </div>
          
          <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-3xl">
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstRow.map((collaborator, i) => (
                <CollaboratorImage key={`p1-${i}`} {...collaborator} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
              {secondRow.map((collaborator, i) => (
                <CollaboratorImage key={`p2-${i}`} {...collaborator} />
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
          </div>
        </Container>
      </div>

      <Container>
        <CollaboratorsList />
      </Container>
    </div>
  );
};

export default CollaboratorsPage;

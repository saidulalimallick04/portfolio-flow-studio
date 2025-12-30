
import { Container } from "@/components/shared/Container";
import { journeyPageData } from "@/lib/placeholder-data";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journey | PortfolioFlow",
  description: "Tracing my professional path, from education to career milestones.",
};

export default function JourneyPage() {

  return (
    <>
      <Container className="py-36">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {journeyPageData.timeline.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            {journeyPageData.timeline.description}
          </p>
        </div>
        <JourneyTimeline />
      </Container>
    </>
  );
};

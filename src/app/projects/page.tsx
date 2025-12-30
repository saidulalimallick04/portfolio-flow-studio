
import { Container } from "@/components/shared/Container";
import { ProjectList } from "@/components/projects/ProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | PortfolioFlow",
  description: "A showcase of my technical projects and experiments.",
};

export default function ProjectsPage() {
  return (
    <>
      <Container>
        <ProjectList />
      </Container>
    </>
  );
};

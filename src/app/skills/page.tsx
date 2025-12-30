
import { Container } from "@/components/shared/Container";
import { SkillsList } from "@/components/skills/SkillsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Expertise | PortfolioFlow",
  description: "A comprehensive overview of my technical skills and proficiency levels.",
};

export default function SkillsPage() {
  return (
    <>
      <Container>
        <SkillsList />
      </Container>
    </>
  );
};

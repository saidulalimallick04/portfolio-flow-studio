
import { Container } from "@/components/shared/Container";
import { HobbiesList } from "@/components/hobbies/HobbiesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hobbies & Interests | PortfolioFlow",
  description: "Exploring my personal interests and hobbies outside of coding.",
};

export default function HobbiesPage() {
  return (
    <>
      <Container>
        <HobbiesList />
      </Container>
    </>
  );
};

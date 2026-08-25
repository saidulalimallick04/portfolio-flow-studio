import { About } from "@/components/home/About";
import { CurrentRole } from "@/components/home/CurrentRole";
import { Hero } from "@/components/home/Hero";
import { Profiles } from "@/components/home/Profiles";
import { Work } from "@/components/home/Work";
import { TopSkills } from "@/components/home/TopSkills";
import { TopCollaborators } from "@/components/home/TopCollaborators";
import { Container } from "@/components/shared/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <About />
        <CurrentRole />
        <TopSkills />
        <Work />
        <TopCollaborators />
        <Profiles />
      </Container>
    </>
  );
}

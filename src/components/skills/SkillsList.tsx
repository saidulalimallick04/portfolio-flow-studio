"use client";

import { skillsData } from "@/lib/placeholder-data";
import type { Skill } from "@/lib/types";
import { SkillCard } from "./SkillCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const SkillSection = ({ title, skills }: { title: string, skills: Skill[] }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={cn(
        "py-12 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export function SkillsList() {
  const topSkills = [...skillsData]
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 6);

  const skillTypes = [...new Set(skillsData.map((skill) => skill.type))];

  return (
    <div id="skills" className="py-16 md:py-24">
      <SkillSection title="Top Skills" skills={topSkills} />

      {skillTypes.map((type) => (
        <SkillSection
          key={type}
          title={`${type} Skills`}
          skills={skillsData.filter((skill) => skill.type === type)}
        />
      ))}
    </div>
  );
}

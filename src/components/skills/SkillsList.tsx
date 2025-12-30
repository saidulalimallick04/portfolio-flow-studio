"use client";

import { useState } from "react";
import { skillsData } from "@/lib/placeholder-data";
import type { Skill } from "@/lib/types";
import { SkillCard } from "./SkillCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  List,
  CircleDashed,
  Code2,
  Database,
  Layout,
  Terminal,
  GitBranch,
  Cpu,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Map skill names to Lucide icons (Consistent with Home Page)
const skillIcons: Record<string, any> = {
  "Python": Code2,
  "Django": Globe,
  "C": Terminal,
  "Java": Code2,
  "SQL": Database,
  "HTML": Layout,
  "CSS": Layout,
  "JavaScript": Code2,
  "Bootstrap": Layout,
  "PostgreSQL": Database,
  "MySQL": Database,
  "Machine Learning": Cpu,
  "Deep Learning": Cpu,
  "Git & GitHub": GitBranch,
  "VS Code": Terminal,
};

type ViewMode = 'grid' | 'list';

const SkillListRow = ({ skill }: { skill: Skill }) => {
  const Icon = skillIcons[skill.name] || Code2;

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:bg-accent/5 hover:scale-[1.01]">
      <div className="relative h-12 w-12 shrink-0 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold truncate">{skill.name}</h3>
          <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            transition={{ duration: 1, delay: 0.1 }}
            className="bg-accent h-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const SkillSection = ({ title, skills, view }: { title: string, skills: Skill[], view: ViewMode }) => {
  const { ref, inView } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={cn(
        "py-8 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl border-l-4 border-primary pl-4">
          {title}
        </h2>
      </div>

      {view === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {skills.map((skill) => (
            <SkillListRow key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
};

export function SkillsList() {
  const [view, setView] = useState<ViewMode>('grid');

  const topSkills = [...skillsData]
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 6);

  const skillTypes = [...new Set(skillsData.map((skill) => skill.type))];

  return (
    <div className="min-h-screen">
      {/* Sticky View Control - Positioned below the main header */}
      <div className="sticky top-24 z-40 mb-8 flex justify-end">
        <div className="inline-flex items-center rounded-lg border bg-background/80 p-1 backdrop-blur-md shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView('grid')}
            className={cn(
              "h-8 px-3 gap-2",
              view === 'grid' ? "bg-accent text-accent-foreground shadow-sm" : "hover:bg-transparent hover:text-foreground/70"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="text-xs font-medium">Grid</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView('list')}
            className={cn(
              "h-8 px-3 gap-2",
              view === 'list' ? "bg-accent text-accent-foreground shadow-sm" : "hover:bg-transparent hover:text-foreground/70"
            )}
          >
            <List className="h-4 w-4" />
            <span className="text-xs font-medium">List</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="h-8 px-3 gap-2 opacity-50 cursor-not-allowed"
            title="Coming Soon"
          >
            <CircleDashed className="h-4 w-4" />
            <span className="text-xs font-medium">Wheel</span>
          </Button>
        </div>
      </div>

      <div id="skills" className="pb-24 space-y-12">
        <SkillSection title="Top Skills" skills={topSkills} view={view} />

        {skillTypes.map((type) => (
          <SkillSection
            key={type}
            title={`${type} Skills`}
            skills={skillsData.filter((skill) => skill.type === type)}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}

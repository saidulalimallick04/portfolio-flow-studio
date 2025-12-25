
"use client";

import { useEffect, useState } from "react";
import { projectsData } from "@/lib/placeholder-data";
import type { Skill } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SkillCard({ skill }: { skill: Skill }) {
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const count = projectsData.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === skill.name.toLowerCase())
    ).length;
    setProjectCount(count);
  }, [skill.name]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{skill.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Proficiency</p>
            <span className="text-sm font-bold text-accent">
              {skill.proficiency}%
            </span>
          </div>
          <Progress value={skill.proficiency} className="h-2" />
        </div>
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value={`item-${skill.id}`} className="border-b-0">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">
              Skill Details
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pt-2">
              <p>{skill.description}</p>
              <p className="mt-2 font-medium text-foreground">
                Used in{" "}
                <span className="font-bold text-accent">{projectCount}</span>{" "}
                project(s).
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

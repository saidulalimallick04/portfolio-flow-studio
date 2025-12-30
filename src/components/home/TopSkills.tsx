"use client";

import { skillsData } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Code2, Database, Layout, Terminal, GitBranch, Cpu, Globe } from "lucide-react";

// Map skill names to Lucide icons
const skillIcons: Record<string, any> = {
    "Python": Code2,
    "Django": Globe, // Web framework
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

export function TopSkills() {
    const { ref, inView } = useScrollAnimation();
    const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

    // Select top skills based on proficiency (e.g., > 60) and limit to a reasonable number
    const topSkills = skillsData
        .filter(skill => skill.proficiency > 60)
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 6);

    return (
        <section className="py-16 md:py-24 border-t">
            <div
                ref={ref}
                className={cn(
                    "transition-all duration-700 container mx-auto px-4",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
            >
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        My Top Skills
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                        A closer look at the core technologies defining my technical expertise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topSkills.map((skill, index) => {
                        const Icon = skillIcons[skill.name] || Code2;
                        const isExpanded = expandedSkill === skill.id;

                        return (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-accent/50 transition-all group overflow-hidden"
                            >
                                <div
                                    className="p-6 cursor-pointer"
                                    onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                                {skill.name}
                                            </h3>
                                        </div>
                                        <Badge variant="secondary">{skill.type}</Badge>
                                    </div>

                                    <div className="w-full bg-secondary/50 rounded-full h-2 mb-4 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.proficiency}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="bg-accent h-full rounded-full"
                                        />
                                    </div>

                                    <div className="flex items-center justify-center pt-2">
                                        <ChevronDown className={cn(
                                            "h-5 w-5 text-muted-foreground transition-transform duration-300",
                                            isExpanded ? "rotate-180" : ""
                                        )} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-muted-foreground leading-relaxed pt-2 border-t text-sm">
                                                {skill.description}
                                                {" In this domain, I have successfully delivered multiple robust solutions, optimizing performance and ensuring scalability."}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

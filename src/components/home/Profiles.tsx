"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Facebook, Instagram, Mail } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { profilesData } from "@/lib/placeholder-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const profilesPageData = {
  title: "Find Me Online",
  description: "Connect with me on these platforms.",
};

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  email: Mail,
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-50, 50], [10, -10]);
  const rotateY = useTransform(mouseX, [-50, 50], [-10, 10]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-full w-full perspective-1000"
    >
      {children}
    </motion.div>
  );
}

export function Profiles() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="profiles" className="py-16 md:py-24 border-t relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />

      <div
        ref={ref}
        className={cn(
          "transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {profilesPageData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            {profilesPageData.description}
          </p>
        </div>

        {/* 
            Mobile: grid-cols-3 (3 per row)
            Desktop: grid-cols-3 (Big 3D Cards) or grid-cols-6 (Flow)
            User asked for "More intersting" on big screens.
            Let's keep grid-cols-3 md:grid-cols-6 to make them a single row on very large screens,
            or grid-cols-3 on desktop for bigger touch targets/visuals. 
            User said "mobile 2 row 3 column" -> implies 6 items.
            Let's use grid-cols-3 for mobile, and md:grid-cols-3 lg:grid-cols-6 for desktop?
            No, lg:grid-cols-3 allows for bigger, nicer cards.
        */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 lg:grid-cols-3 max-w-5xl mx-auto px-4">
          {profilesData.map((profile, i) => {
            const Icon = iconMap[profile.icon];
            return (
              <Link href={profile.url} key={profile.id} target="_blank" rel="noopener noreferrer" className="group block h-full">
                {/* Desktop 3D Tilt Wrapper */}
                <div className="hidden md:block h-full">
                  <TiltCard>
                    <Card className="flex h-full flex-col items-center justify-center p-6 border-muted bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-accent/50 group-hover:scale-[1.02]">
                      <CardContent className="p-0 text-center flex flex-col items-center gap-4">
                        <div className="relative p-4 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                          <Icon className="h-8 w-8 md:h-12 md:w-12 transition-transform duration-500" />
                        </div>
                        <p className="text-lg font-bold group-hover:text-accent transition-colors">{profile.name}</p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </div>

                {/* Mobile Simple Card (No Tilt, Compact) */}
                <div className="block md:hidden h-full">
                  <Card className="flex h-full flex-col items-center justify-center p-3 border-muted bg-background/50 backdrop-blur-sm active:scale-95 transition-transform">
                    <CardContent className="p-0 text-center flex flex-col items-center gap-2">
                      <div className="p-2 rounded-full bg-accent/10 text-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium truncate w-full">{profile.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

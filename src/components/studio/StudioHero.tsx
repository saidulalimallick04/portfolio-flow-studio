"use client";

import Image from "next/image";
import { studioPageData, studioData } from "@/lib/placeholder-data";
import Marquee from "@/components/ui/marquee";

export function StudioHero() {
  // Split data into 3 columns for variety
  const firstCol = studioData.slice(0, 3);
  const secondCol = studioData.slice(3, 6);
  const thirdCol = studioData.slice(6, 9);

  return (
    <div className="relative mx-4 mt-24 h-[400px] overflow-hidden rounded-3xl border shadow-2xl bg-background md:h-[600px]">
      <div className="absolute inset-0 z-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]" />

      {/* Header Content Overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/30 text-center backdrop-blur-[2px]">
        <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl dark:text-white drop-shadow-sm">
          {studioPageData.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-medium text-foreground/90 md:text-xl drop-shadow-sm">
          {studioPageData.description}
        </p>
      </div>

      {/* 3D Tilted Vertical Marquees */}
      <div className="absolute inset-0 z-0 flex h-[150%] w-[120%] -translate-x-[10%] -rotate-6 flex-row items-center justify-center gap-4 opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
        <Marquee vertical pauseOnHover className="[--duration:30s] flex-1">
          {firstCol.map((item) => (
            <StudioCard key={item.id} item={item} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="[--duration:40s] flex-1">
          {secondCol.map((item) => (
            <StudioCard key={item.id} item={item} />
          ))}
        </Marquee>
        <Marquee vertical pauseOnHover className="[--duration:35s] flex-1">
          {thirdCol.map((item) => (
            <StudioCard key={item.id} item={item} />
          ))}
        </Marquee>
        <Marquee vertical reverse pauseOnHover className="[--duration:45s] flex-1 hidden md:flex">
          {secondCol.map((item) => (
            <StudioCard key={`dup-${item.id}`} item={item} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background to-transparent z-20" />
    </div>
  );
}

const StudioCard = ({ item }: { item: any }) => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20 shadow-sm">
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover"
      />
    </div>
  );
};

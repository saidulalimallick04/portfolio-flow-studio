"use client";

import { useState } from "react";
import Image from "next/image";
import { studioData } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Grid, Camera, Video, Palette, List as ListIcon, LayoutGrid, Youtube, ExternalLink } from "lucide-react";
import Link from "next/link";

const tabItems = [
  { value: "All", label: "All", icon: Grid },
  { value: "Photography", label: "Photography", icon: Camera },
  { value: "Videography", label: "Videography", icon: Video },
  { value: "Creative Arts", label: "Creative Arts", icon: Palette },
];

export function StudioGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems =
    activeTab === "All"
      ? studioData
      : studioData.filter((item) => item.category === activeTab);

  return (
    <div className={cn("transition-all duration-700 pt-5")}>
      <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
        {/* Sticky Header with Filter & View Toggle */}
        <div className="sticky top-24 z-40 mb-8 flex flex-row items-center justify-between gap-2 py-2 rounded-2xl bg-background/60 backdrop-blur-md border px-4 shadow-sm w-full">

          {/* Category Filter */}
          <TabsList className="h-auto bg-transparent p-0 flex flex-nowrap justify-start gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            {tabItems.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-2 rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={cn(
                "h-8 w-8 rounded-full p-0 transition-all",
                viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={cn(
                "h-8 w-8 rounded-full p-0 transition-all",
                viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
              )}
            >
              <ListIcon className="h-4 w-4" />
              <span className="sr-only">List View</span>
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}
          >
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "group flex overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/50",
                  viewMode === "grid" ? "flex-col hover:-translate-y-1" : "flex-col sm:flex-row items-stretch"
                )}
              >
                {/* Image Section */}
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === "grid" ? "aspect-video w-full" : "h-64 sm:h-auto sm:w-1/3 shrink-0"
                )}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.imageHint}
                    width={600}
                    height={400} // Ensuring consistent aspect
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-4 md:p-6 justify-between">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-sm md:text-base line-clamp-3 mb-4">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </div>

                  {/* Action Buttons */}
                  {(item.youtubeUrl || item.alternativeUrl) && (
                    <CardFooter className="p-0 pt-4 flex flex-wrap gap-2 mt-auto border-t border-border/50">
                      {item.youtubeUrl && (
                        <Button size="sm" variant="default" className="gap-2 rounded-full" asChild>
                          <Link href={item.youtubeUrl} target="_blank">
                            <Youtube className="h-4 w-4" />
                            Watch
                          </Link>
                        </Button>
                      )}
                      {item.alternativeUrl && (
                        <Button size="sm" variant="outline" className="gap-2 rounded-full" asChild>
                          <Link href={item.alternativeUrl} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                            Visit
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  )}
                </div>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";
import { studioData } from "@/lib/placeholder-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Grid, Camera, Video, Palette } from "lucide-react";

const tabItems = [
  { value: "All", label: "All", icon: Grid },
  { value: "Photography", label: "Photography", icon: Camera },
  { value: "Videography", label: "Videography", icon: Video },
  { value: "Creative Arts", label: "Creative Arts", icon: Palette },
];

export function StudioGallery() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems =
    activeTab === "All"
      ? studioData
      : studioData.filter((item) => item.category === activeTab);

  return (
    <div
      className={cn(
        "transition-all duration-700 pt-5",
      )}
    >
      <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
        {/* Sticky Tab Header */}
        <div className="sticky top-20 z-40 mb-8 flex justify-center py-2">
          <div className="rounded-full border bg-background/80 p-1 backdrop-blur-md shadow-sm">
            <TabsList className="h-auto bg-transparent p-0">
              {tabItems.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center gap-2 rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item) => (
              <Card key={item.id} className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.imageHint}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-block rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

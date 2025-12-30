"use client";

import { useCursor } from "./CursorContext";
import { BreathingCanvas } from "./BreathingCanvas";
import { ThunderPattern } from "@/lib/cursor-patterns/ThunderPattern";
import { HinokamiPattern } from "@/lib/cursor-patterns/HinokamiPattern";
import { BeastPattern } from "@/lib/cursor-patterns/BeastPattern";
import { useMemo } from "react";

export function CursorManager() {
  const { cursorType } = useCursor();

  const pattern = useMemo(() => {
    switch (cursorType) {
      case "hinokami":
        return new HinokamiPattern();
      case "beast":
        return new BeastPattern();
      case "none":
        return null;
      case "thunder":
      default:
        return new ThunderPattern();
    }
  }, [cursorType]);

  return <BreathingCanvas pattern={pattern} />;
}

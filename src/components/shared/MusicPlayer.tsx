
"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { musicTracks } from "@/lib/music-data";
import type { MusicTrack } from "@/lib/music-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);

  useEffect(() => {
    // 1. Select a random track on mount
    const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
    setCurrentTrack(randomTrack);

    const audio = audioRef.current;
    if (!audio) return;

    // 2. Assign the source but DO NOT play
    audio.src = randomTrack.url;
    audio.volume = 0.5;
    audio.loop = true;

    // 3. Sync state with audio events (in case of external pauses/interruptions)
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.error("Playback failed:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto"></audio>
      <div className="flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="rounded-full h-12 w-12"
                disabled={!currentTrack}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span className="sr-only">Toggle Music</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pause Music" : "Play Music"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

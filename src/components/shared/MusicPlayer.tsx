"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Pause, SkipBack, SkipForward, X, Volume2, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { musicTracks } from "@/lib/music-data";
import type { MusicTrack } from "@/lib/music-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLongPress } from "@/hooks/use-long-press";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Deterministic random start positions for animation
const directions = [
  { x: -200, y: -200 }, // Top-Left-Far
  { x: 200, y: 100 },   // Bottom-Right
  { x: -150, y: 150 },  // Bottom-Left
  { x: 150, y: -150 },  // Top-Right
  { x: 0, y: 300 },     // Bottom-Far
  { x: 300, y: 0 },     // Right-Far
  { x: -300, y: 0 },    // Left-Far
];

// Format seconds to MM:SS
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 1. Select a random track on mount
    const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
    setCurrentTrack(randomTrack);

    const audio = audioRef.current;
    if (!audio) return;

    // 2. Assign source and defaults
    audio.src = randomTrack.url;
    audio.volume = volume;
    audio.loop = true;

    // 3. Sync state with audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Update volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    isPlaying ? audio.pause() : audio.play().catch(console.error);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = musicTracks.findIndex(t => t.url === currentTrack.url);
    const nextIndex = (currentIndex + 1) % musicTracks.length;
    changeTrack(musicTracks[nextIndex]);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = musicTracks.findIndex(t => t.url === currentTrack.url);
    const prevIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    changeTrack(musicTracks[prevIndex]);
  };

  const changeTrack = (track: MusicTrack) => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTrack(track);
    audio.src = track.url;
    audio.play().catch(console.error);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const { onMouseDown, onTouchStart, onMouseUp, onMouseLeave, onTouchEnd } = useLongPress(
    () => setIsFullPlayerOpen(true),
    () => togglePlayPause(),
    { delay: 500 }
  );

  const FullPlayerOverlay = (
    <AnimatePresence>
      {isFullPlayerOpen && currentTrack && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-6"
          onClick={() => setIsFullPlayerOpen(false)}
        >
          <div className="w-full max-w-lg grid grid-cols-4 gap-4" onClick={e => e.stopPropagation()}>

            {/* 1. Album Art (Col span 2, Row span 2) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[0].x, y: directions[0].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.1 }}
              className="col-span-2 row-span-2 aspect-square relative rounded-3xl bg-card border shadow-xl overflow-hidden flex items-center justify-center p-6 group"
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50",
                isPlaying && "animate-pulse"
              )} />
              <Music2 className={cn(
                "h-20 w-20 text-muted-foreground/50 transition-all duration-700",
                isPlaying && "scale-110 text-primary"
              )} />
            </motion.div>

            {/* 2. Track Info (Col span 2) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[1].x, y: directions[1].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.15 }}
              className="col-span-2 bg-card border rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setIsFullPlayerOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-bold leading-tight truncate w-full px-2" title={currentTrack.title}>{currentTrack.title}</h3>
              <p className="text-muted-foreground text-xs font-medium truncate w-full">{currentTrack.artist}</p>
            </motion.div>

            {/* 3. Volume (Col span 2) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[2].x, y: directions[2].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="col-span-2 bg-card border rounded-2xl p-4 flex items-center gap-3 shadow-lg"
            >
              <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <Slider
                defaultValue={[0.5]}
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={(vals) => setVolume(vals[0])}
                className="cursor-pointer"
              />
            </motion.div>

            {/* 4. Progress Bar (Col span 4) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[3].x, y: directions[3].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.25 }}
              className="col-span-4 bg-card border rounded-2xl p-4 shadow-lg flex flex-col justify-center gap-2"
            >
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                <span>{formatTime(currentTime)}</span>
                <span>Duration</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </motion.div>

            {/* 5. Prev Button (Col span 1) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[4].x, y: directions[4].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.3 }}
              className="col-span-1"
            >
              <Button
                variant="outline"
                className="w-full h-full rounded-2xl border-2 hover:bg-accent hover:border-accent shadow-sm py-4"
                onClick={prevTrack}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* 6. Play/Pause (Col span 2) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[5].x, y: directions[5].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.35 }}
              className="col-span-2"
            >
              <Button
                className="w-full h-full rounded-2xl shadow-xl text-primary-foreground text-lg py-4"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
            </motion.div>

            {/* 7. Next Button (Col span 1) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: directions[6].x, y: directions[6].y }}
              animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.4 }}
              className="col-span-1"
            >
              <Button
                variant="outline"
                className="w-full h-full rounded-2xl border-2 hover:bg-accent hover:border-accent shadow-sm py-4"
                onClick={nextTrack}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <audio ref={audioRef} preload="auto"></audio>

      {/* Mini Player / Trigger Button */}
      <div className="flex items-center gap-2 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur-sm relative z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-12 w-12 hover:scale-105 transition-transform"
                disabled={!currentTrack}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchEnd={onTouchEnd}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span className="sr-only">Toggle Music</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Hold for Full Player</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {mounted && createPortal(FullPlayerOverlay, document.body)}
    </>
  );
}

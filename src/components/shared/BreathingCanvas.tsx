"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { BreathingPattern } from '@/lib/cursor-patterns/types';

interface BreathingCanvasProps {
    pattern: BreathingPattern | null;
}

export function BreathingCanvas({ pattern }: BreathingCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !resolvedTheme || !pattern) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isDarkMode = resolvedTheme === 'dark';

        // Initialize pattern
        pattern.init(canvas);
        pattern.updateTheme(isDarkMode);

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (pattern) pattern.resize(canvas.width, canvas.height);
        }

        const handleResize = () => resizeCanvas();
        const handleMouseMove = (e: MouseEvent) => {
            if (pattern) pattern.handleMouseMove(e);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initial resize
        resizeCanvas();

        let animationFrameId: number;

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (pattern) pattern.update(ctx);
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (pattern) pattern.destroy();
        };
    }, [pattern, resolvedTheme]);

    if (!pattern) return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
        ></canvas>
    );
}

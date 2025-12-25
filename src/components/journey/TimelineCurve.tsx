'use client';

import { useEffect, useState } from 'react';

export function TimelineCurve() {
  const [pathLength, setPathLength] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const path = document.querySelector('#timeline-path') as SVGPathElement;
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }
  }, []);

  const handleScroll = () => {
    // We calculate scroll progress relative to the main content area, not the whole body,
    // to make the animation feel more connected to the timeline items.
    const timelineElement = document.querySelector('.md\\:col-span-2');
    if (!timelineElement) return;

    const { top, height } = timelineElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the timeline container is visible
    const visibleHeight = Math.min(height + top, windowHeight) - Math.max(top, 0);
    const progress = visibleHeight / (height * 0.8); // Adjust the denominator to control animation speed
    
    // A simpler alternative based on overall scroll:
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const overallProgress = window.scrollY / totalHeight;

    setScrollPosition(overallProgress * 1.5); // Multiplier to speed up drawing
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const path = document.querySelector('#timeline-path') as SVGPathElement;
    if (path && pathLength > 0) {
      const drawLength = pathLength * Math.min(scrollPosition, 1); // Cap progress at 1
      path.style.strokeDashoffset = `${pathLength - drawLength}`;
    }
  }, [scrollPosition, pathLength]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 800"
      preserveAspectRatio="none"
      className="absolute top-0 right-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Background Path */}
      <path
        d="M 100,0 C 200,100 0,200 100,300 C 200,400 0,500 100,600 C 200,700 0,800 100,800"
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="2"
      />
      {/* Foreground (Drawing) Path */}
      <path
        id="timeline-path"
        d="M 100,0 C 200,100 0,200 100,300 C 200,400 0,500 100,600 C 200,700 0,800 100,800"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

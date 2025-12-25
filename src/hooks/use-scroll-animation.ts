
"use client";

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set inView to true if the element is intersecting.
        // This will also handle the case where the element is already in view on load.
        if (entry.isIntersecting) {
          setInView(true);
          // Once in view, we can stop observing.
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    observer.observe(element);

    return () => {
      // Clean up the observer on component unmount.
      observer.disconnect();
    };
  }, []);

  return { ref, inView };
}

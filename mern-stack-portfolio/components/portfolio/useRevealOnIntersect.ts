"use client";

import { useEffect, useRef } from "react";

export default function useRevealOnIntersect<T extends HTMLElement>() {
  const refs = useRef<Array<T | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.7,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    refs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (index: number) => (node: T | null) => {
    refs.current[index] = node;
  };

  return setRef;
}

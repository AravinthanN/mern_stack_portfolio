"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { experience } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function ExperienceSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      ref={setSectionRef(0)}
      className="reveal-up [animation-delay:280ms] bg-surface-2 border-soft rounded-3xl border p-7 lift-hover"
    >
      <SectionTitle>Experience</SectionTitle>
      <div className="bg-card-soft border-strong mt-4 rounded-2xl border p-5 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_18px_45px_-28px_rgba(34,197,94,0.5)]">
        <p className="text-primary text-lg font-semibold">
          {experience.role} | {experience.company}
        </p>
        <p className="text-muted text-sm">{experience.period}</p>
        <ul className="text-secondary mt-4 space-y-2">
          {experience.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

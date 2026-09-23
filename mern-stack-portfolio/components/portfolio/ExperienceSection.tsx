"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { experience } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function ExperienceSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      ref={setSectionRef(0)}
      className="reveal-up [animation-delay:280ms] bg-surface-2 border-soft rounded-[28px] border p-7 lift-hover"
    >
      <SectionTitle>Experience</SectionTitle>
      <div className="bg-card-soft border-strong mt-5 rounded-2xl border p-5 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_18px_45px_-28px_rgba(74,222,128,0.7)]">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-primary text-lg font-semibold">{experience.role}</p>
          <span className="text-muted">|</span>
          <p className="text-primary text-lg font-semibold">{experience.company}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted">
          <span>{experience.period}</span>
          <span>•</span>
          <span>{experience.location}</span>
        </div>
        <ul className="text-secondary mt-5 space-y-3">
          {experience.points.map((point) => (
            <li key={point} className="flex gap-3 leading-7">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4ade80]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { skills, summary } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function SummaryAndSkillsSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section className="grid gap-7 lg:grid-cols-[1.5fr_1fr]">
      <article
        ref={setArticleRef(0)}
        className="reveal-right [animation-delay:120ms] bg-surface-2 border-soft rounded-[28px] border p-7 lift-hover"
      >
        <SectionTitle>Summary</SectionTitle>
        <p className="text-secondary mt-4 text-base leading-8">{summary}</p>
      </article>

      <article
        ref={setArticleRef(1)}
        className="reveal-left [animation-delay:220ms] bg-surface-2 border-soft rounded-[28px] border p-7 lift-hover"
      >
        <SectionTitle light>Technical Stack</SectionTitle>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-card-soft border-strong text-primary rounded-full border px-3 py-1.5 text-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(74,222,128,0.8)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}

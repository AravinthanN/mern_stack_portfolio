"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { skills, summary } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function SummaryAndSkillsSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section className="grid gap-7 lg:grid-cols-5">
      <article
        ref={setArticleRef(0)}
        className="reveal-right [animation-delay:120ms] bg-surface-2 border-soft rounded-3xl border p-7 lg:col-span-3 lift-hover"
      >
        <SectionTitle>Summary</SectionTitle>
        <p className="text-secondary mt-4 leading-7">{summary}</p>
      </article>

      <article
        ref={setArticleRef(1)}
        className="reveal-left [animation-delay:220ms] bg-surface-2 border-soft rounded-3xl border p-7 lg:col-span-2 lift-hover"
      >
        <SectionTitle light>Technical Stack</SectionTitle>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-card-soft border-strong text-primary rounded-full border px-3 py-1 text-sm transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(34,197,94,0.5)]">
              {skill}
            </span>
          ))}
        </div>
      </article>
    </section>
  );
}

"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { highlights, projects } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function ProjectsAndAchievementsSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section className="grid gap-7 lg:grid-cols-2">
      <article
        ref={setArticleRef(0)}
        className="reveal-right [animation-delay:340ms] bg-surface-2 border-soft rounded-3xl border p-7 lift-hover"
      >
        <SectionTitle>Projects Delivered</SectionTitle>
        <div className="mt-4 space-y-4">
          {projects.map((project) => (
            <div key={project.name} className="bg-card-soft border-strong rounded-2xl border p-4 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_18px_45px_-28px_rgba(34,197,94,0.5)]">
              <h3 className="text-primary text-base font-semibold">{project.name}</h3>
              <p className="text-secondary mt-1 text-sm leading-6">{project.description}</p>
            </div>
          ))}
        </div>
      </article>

      <article
        ref={setArticleRef(1)}
        className="reveal-left [animation-delay:420ms] bg-surface-2 border-soft rounded-3xl border p-7 lift-hover"
      >
        <SectionTitle>Achievements</SectionTitle>
        <ul className="text-secondary mt-4 space-y-3">
          {highlights.map((item) => (
            <li key={item} className="bg-card-soft border-strong rounded-2xl border p-4 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_18px_45px_-28px_rgba(34,197,94,0.5)]">
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

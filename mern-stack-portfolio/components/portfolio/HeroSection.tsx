"use client";

import { profile } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function HeroSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      ref={setSectionRef(0)}
      className="reveal-up [animation-delay:80ms] bg-surface-2 border-soft rounded-3xl border p-8 backdrop-blur-xl shadow-[0_30px_120px_-35px_rgba(34,197,94,0.22)] sm:p-10 lift-hover"
    >
      <p className="border-soft bg-chip text-secondary inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
        {profile.role}
      </p>
      <h1 className="text-primary mt-5 font-[family-name:var(--font-sora)] text-3xl font-bold leading-tight sm:text-5xl">{profile.name}</h1>
      <p className="text-secondary mt-3 max-w-2xl text-base sm:text-lg">{profile.tagline}</p>
      <div className="text-secondary mt-6 flex flex-wrap gap-3 text-sm">
        <a className="bg-card-soft border-strong rounded-full border px-4 py-2 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(34,197,94,0.5)]" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="bg-card-soft border-strong rounded-full border px-4 py-2 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(34,197,94,0.5)]" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
          {profile.phone}
        </a>
        <span className="bg-card-soft border-strong rounded-full border px-4 py-2 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(34,197,94,0.5)]">{profile.location}</span>
      </div>
    </section>
  );
}

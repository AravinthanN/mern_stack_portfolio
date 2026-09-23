"use client";

import { profile } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function HeroSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      ref={setSectionRef(0)}
      className="reveal-up [animation-delay:80ms] bg-surface-2 border-soft rounded-[28px] border p-6 shadow-[0_30px_120px_-35px_rgba(74,222,128,0.25)] backdrop-blur-xl sm:p-8 lg:p-10 lift-hover"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="border-soft bg-card-soft text-secondary inline-flex rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em]">
            {profile.role}
          </p>
          <h1 className="text-primary mt-5 font-[family-name:var(--font-sora)] text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="text-secondary mt-4 max-w-xl text-base leading-7 sm:text-lg">{profile.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              className="bg-card-soft border-strong rounded-full border px-4 py-2.5 text-primary transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(74,222,128,0.8)]"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <a
              className="bg-card-soft border-strong rounded-full border px-4 py-2.5 text-primary transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_14px_32px_-24px_rgba(74,222,128,0.8)]"
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            >
              {profile.phone}
            </a>
            <span className="bg-card-soft border-strong rounded-full border px-4 py-2.5 text-primary">
              {profile.location}
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-emerald-400/25 bg-card-soft p-5 shadow-[0_20px_50px_-35px_rgba(74,222,128,0.9)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7f3d0]">Profile Snapshot</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-emerald-400/20 bg-[#0f1d1a] p-3">
              <p className="text-2xl font-bold text-primary">2+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Years</p>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-[#0f1d1a] p-3">
              <p className="text-2xl font-bold text-primary">8+</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Modules</p>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-[#0f1d1a] p-3">
              <p className="text-2xl font-bold text-primary">AWS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Deploy</p>
            </div>
            <div className="rounded-xl border border-emerald-400/20 bg-[#0f1d1a] p-3">
              <p className="text-2xl font-bold text-primary">MQTT</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">Realtime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { experience } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function ExperienceSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section
      id="experience"
      ref={setSectionRef(0)}
      className="reveal-up [animation-delay:280ms] experience-panel"
    >
      <div className="experience-topline">
        <div>
          <div className="section-kicker"><span>03</span> THE PROFESSIONAL CHAPTER</div>
          <h2 className="section-heading">Where I make<br /><em>things happen.</em></h2>
        </div>
        <div className="experience-index">01 <span>/</span> NOW</div>
      </div>
      <div className="experience-content">
        <div className="experience-role-card">
          <span className="experience-live"><i /> CURRENT ROLE</span>
          <h3>{experience.role}</h3>
          <p className="experience-company">{experience.company}</p>
          <div className="experience-meta"><span>{experience.period}</span><span>{experience.location}</span></div>
          <div className="experience-stat-row">
            <div><strong>30–40%</strong><span>less data latency</span></div>
            <div><strong>90+</strong><span>Lighthouse score</span></div>
          </div>
        </div>
        <div className="experience-timeline">
          {experience.points.map((point, index) => (
            <div key={point} className="experience-point">
              <span className="experience-point-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="experience-point-dot" />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

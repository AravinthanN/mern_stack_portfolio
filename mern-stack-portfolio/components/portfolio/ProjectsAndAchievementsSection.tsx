"use client";

import { highlights, projects } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function ProjectsAndAchievementsSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section id="work" className="projects-layout">
      <article
        id="projects"
        ref={setArticleRef(0)}
        className="reveal-right [animation-delay:340ms] projects-panel"
      >
        <div className="projects-heading">
          <div><div className="section-kicker"><span>04</span> A FEW THINGS I’VE BUILT</div><h2 className="section-heading">Selected <em>work.</em></h2></div>
          <span className="projects-count">0{projects.length} PROJECTS</span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.name} className={`project-card${index === 0 ? " project-card-featured" : ""}`}>
              <div className={`project-art project-art-${index + 1}`} aria-hidden="true">
                <span className="project-art-orbit project-art-orbit-one" />
                <span className="project-art-orbit project-art-orbit-two" />
                <span className="project-art-core">{["✳", "↗", "◌", "⌁", "▦"][index]}</span>
                <span className="project-art-index">0{index + 1} / 0{projects.length}</span>
              </div>
              <div className="project-card-copy">
                <span className="project-category">{["INDUSTRIAL IOT · PLATFORM", "ENERGY · ANALYTICS", "ENVIRONMENT · MONITORING", "PRODUCTION · REPORTING", "OPERATIONS · INVENTORY"][index]}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {index === 0 && <div className="project-tech"><span>React / Next.js</span><span>GraphQL</span><span>MQTT</span><span>MongoDB</span></div>}
              </div>
              <span className="project-card-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </article>

      <article
        id="achievements"
        ref={setArticleRef(1)}
        className="reveal-left [animation-delay:420ms] achievements-panel"
      >
        <div className="section-kicker"><span>05</span> THE RECEIPTS</div>
        <h2 className="section-heading">Small details.<br /><em>Real impact.</em></h2>
        <div className="achievement-list">
          {highlights.map((item, index) => (
            <div key={item} className="achievement-item">
              <span className="achievement-number">0{index + 1}</span>
              <p>{item}</p>
              <span className="achievement-spark" aria-hidden="true">✳</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

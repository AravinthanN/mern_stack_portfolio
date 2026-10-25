"use client";

import { skills, summary } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

const skillGroups = [
  { title: "Interface", note: "01 / FRONTEND", skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "HTML5", "CSS3", "Highcharts"] },
  { title: "Application", note: "02 / BACKEND", skills: ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "JWT", "Role-Based Access Control (RBAC)"] },
  { title: "Data & state", note: "03 / SYSTEMS", skills: ["MongoDB", "MQTT", "Redux", "Redux Toolkit", "Zustand"] },
  { title: "Ship & quality", note: "04 / DELIVERY", skills: ["AWS", "Docker", "CI/CD", "Git", "GitHub", "Jest"] },
] as const;

export default function SummaryAndSkillsSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section className="grid gap-7 lg:grid-cols-[1.5fr_1fr]">
      <article
        id="about"
        ref={setArticleRef(0)}
        className="reveal-right [animation-delay:120ms] about-panel"
      >
        <div className="section-kicker"><span>01</span> A LITTLE ABOUT HOW I WORK</div>
        <h2 className="about-headline">Good software<br />should feel <em>effortless.</em></h2>
        <p className="about-copy">{summary}</p>
        <div className="about-signoff"><span className="about-signoff-mark">✳</span><span>Thoughtful by design.<br /><strong>Reliable by nature.</strong></span></div>
      </article>

      <article
        id="skills"
        ref={setArticleRef(1)}
        className="reveal-left [animation-delay:220ms] skills-panel"
      >
        <div className="section-kicker"><span>02</span> THE TOOLKIT</div>
        <div className="skills-heading-row"><h2 className="section-heading">Tools of<br /><em>the trade.</em></h2><span className="skills-total">{skills.length}<small> skills</small></span></div>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <div className="skill-group-heading"><h3>{group.title}</h3><span>{group.note}</span></div>
              <div className="skill-list">
                {group.skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

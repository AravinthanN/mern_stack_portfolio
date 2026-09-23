"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { certification, education } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

const sectionItems = [
  {
    title: "Education",
    wrapperClassName: "reveal-right [animation-delay:500ms]",
    heading: education.degree,
    subheading: education.institute,
  },
  {
    title: "Certificates",
    wrapperClassName: "reveal-left [animation-delay:580ms]",
    heading: certification.name,
    subheading: certification.provider,
  },
] as const;

export default function EducationAndCertificatesSection() {
  const setArticleRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section className="grid gap-7 lg:grid-cols-2">
      {sectionItems.map((item, index) => (
        <article
          key={item.title}
          ref={setArticleRef(index)}
          className={`${item.wrapperClassName} bg-surface-2 border-soft rounded-[28px] border p-7 lift-hover`}
        >
          <SectionTitle>{item.title}</SectionTitle>
          <div className="bg-card-soft border-strong mt-5 rounded-2xl border p-5 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 hover:bg-card hover:shadow-[0_18px_45px_-28px_rgba(74,222,128,0.7)]">
            <p className="text-primary font-medium">{item.heading}</p>
            <p className="text-secondary mt-2">{item.subheading}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

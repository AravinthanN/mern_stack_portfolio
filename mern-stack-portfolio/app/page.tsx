import EducationAndCertificatesSection from "@/components/portfolio/EducationAndCertificatesSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsAndAchievementsSection from "@/components/portfolio/ProjectsAndAchievementsSection";
import SummaryAndSkillsSection from "@/components/portfolio/SummaryAndSkillsSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      <div className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-[#22c55e]/20 blur-3xl glow-pulse" />
      <div className="pointer-events-none absolute -right-28 bottom-16 h-80 w-80 rounded-full bg-[#d8caa3]/28 blur-3xl float-slow" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <HeroSection />
        <SummaryAndSkillsSection />
        <ExperienceSection />
        <ProjectsAndAchievementsSection />
        <EducationAndCertificatesSection />
      </div>
    </main>
  );
}

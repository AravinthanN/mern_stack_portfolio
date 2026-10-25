import EducationAndCertificatesSection from "@/components/portfolio/EducationAndCertificatesSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import GoofyBuddy from "@/components/portfolio/GoofyBuddy";
import HeroSection from "@/components/portfolio/HeroSection";
import ProjectsAndAchievementsSection from "@/components/portfolio/ProjectsAndAchievementsSection";
import SummaryAndSkillsSection from "@/components/portfolio/SummaryAndSkillsSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden px-4 pb-8 pt-3 sm:px-8 sm:pb-12 lg:px-16">
      <GoofyBuddy />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <HeroSection />
        <SummaryAndSkillsSection />
        <ExperienceSection />
        <ProjectsAndAchievementsSection />
        <EducationAndCertificatesSection />
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Aravinthan N</span>
          <span>Designed with curiosity · Built with care</span>
          <a href="mailto:aravinthankpt@gmail.com">Say hello ↗</a>
        </footer>
      </div>
    </main>
  );
}

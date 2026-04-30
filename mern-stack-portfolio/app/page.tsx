const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "GraphQL",
  "MongoDB",
  "MQTT",
  "AWS (EC2, S3)",
  "Docker",
  "CI/CD",
];

const projects = [
  {
    name: "EMS - Energy Management System",
    description:
      "Built KPI-driven energy dashboards, trend analytics, and export workflows for plant-level operational insights.",
  },
  {
    name: "EQMS - Environmental Quality Management System",
    description:
      "Implemented real-time pressure and temperature monitoring with reporting tools for compliance and audit readiness.",
  },
  {
    name: "NGU - Monitoring & Reporting",
    description:
      "Developed live oil flow and production tracking with improved alerting and reporting for faster decisions.",
  },
  {
    name: "Tool Dashboard & Inventory Tracking",
    description:
      "Created a unified operations dashboard with role-based visibility, stock tracking, and movement logs.",
  },
];

const highlights = [
  "Reduced live dashboard latency by 30-40% using MQTT-based streaming architecture.",
  "Deployed secure, scalable GraphQL-driven modules on AWS for multi-system business operations.",
  "Built reusable UI systems in React + Tailwind for consistent, responsive experiences.",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
      <div className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-[#8d7b68]/25 blur-3xl glow-pulse" />
      <div className="pointer-events-none absolute -right-28 bottom-16 h-80 w-80 rounded-full bg-[#f1dec9]/20 blur-3xl float-slow" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <section className="reveal-up rounded-3xl border border-[#faf5ef]/35 bg-[#54363b]/55 p-8 backdrop-blur-xl shadow-[0_30px_120px_-35px_rgba(250,245,239,0.5)] sm:p-10 lift-hover">
          <p className="inline-flex rounded-full border border-[#faf5ef]/40 bg-[#8d7b68]/35 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#faf5ef]">
            Full Stack Developer
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-sora)] text-4xl font-bold leading-tight text-white sm:text-6xl">
            ARAVINTHAN N
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#f1dec9] sm:text-lg">
            2 Years Experience | React.js, Node.js, GraphQL, AWS, MongoDB
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#faf5ef]">
            <a className="rounded-full bg-[#c8b6a6]/20 px-4 py-2 transition hover:bg-[#c8b6a6]/35 hover:scale-105" href="mailto:aravinthankpt@gmail.com">
              aravinthankpt@gmail.com
            </a>
            <a className="rounded-full bg-[#c8b6a6]/20 px-4 py-2 transition hover:bg-[#c8b6a6]/35 hover:scale-105" href="tel:+918637435264">
              +91 8637435264
            </a>
            <span className="rounded-full bg-[#c8b6a6]/20 px-4 py-2">Chennai, India</span>
          </div>
        </section>

        <section className="grid gap-7 lg:grid-cols-5">
          <article className="reveal-right rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/65 p-7 lg:col-span-3 lift-hover" style={{ animationDelay: "120ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Summary</h2>
            <p className="mt-4 leading-7 text-[#f1dec9]">
              Results-driven Full-Stack Developer with 1.9 years of experience building scalable Industrial IoT
              platforms. I design secure GraphQL APIs, build real-time MQTT-powered dashboards, and deliver
              high-performance applications with React, TypeScript, and Node.js. I focus on maintainable
              architecture, clean code, and reliable deployments on AWS.
            </p>
          </article>

          <article className="reveal-left rounded-3xl border border-[#faf5ef]/25 bg-[#8d7b68]/35 p-7 lg:col-span-2 lift-hover" style={{ animationDelay: "220ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-white">Technical Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-[#faf5ef]/35 bg-[#ceadae]/20 px-3 py-1 text-sm text-white transition hover:scale-105 hover:bg-[#f1dec9]/30">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="reveal-up rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/70 p-7 lift-hover" style={{ animationDelay: "280ms" }}>
          <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Experience</h2>
          <div className="mt-4 rounded-2xl border border-[#faf5ef]/25 bg-[#9a7b78]/20 p-5 transition hover:-translate-y-1">
            <p className="text-lg font-semibold text-white">Full Stack Developer | MJ Tech Solutions, Chennai</p>
            <p className="text-sm text-[#f1dec9]">July 2024 - Present</p>
            <ul className="mt-4 space-y-2 text-[#faf5ef]">
              <li>Developed scalable Industrial IoT modules with role-based access for admin and customer workflows.</li>
              <li>Built JWT-secured GraphQL APIs and real-time MQTT integrations for dashboards and alerts.</li>
              <li>Managed AWS deployments on EC2 and S3 with Dockerized services and CI/CD pipelines.</li>
              <li>Delivered reporting exports (Excel/PDF) for analytics, audits, and operational decision support.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-7 lg:grid-cols-2">
          <article className="reveal-right rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/70 p-7 lift-hover" style={{ animationDelay: "340ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Projects Delivered</h2>
            <div className="mt-4 space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="rounded-2xl border border-[#faf5ef]/20 bg-[#a4907c]/20 p-4 transition hover:-translate-y-1 hover:bg-[#c8b6a6]/25">
                  <h3 className="text-base font-semibold text-white">{project.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#f1dec9]">{project.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="reveal-left rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/70 p-7 lift-hover" style={{ animationDelay: "420ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Achievements</h2>
            <ul className="mt-4 space-y-3 text-[#faf5ef]">
              {highlights.map((item) => (
                <li key={item} className="rounded-2xl border border-[#faf5ef]/20 bg-[#a4907c]/20 p-4 transition hover:-translate-y-1 hover:bg-[#c8b6a6]/25">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid gap-7 lg:grid-cols-2">
          <article className="reveal-right rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/70 p-7 lift-hover" style={{ animationDelay: "500ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Education</h2>
            <div className="mt-4 rounded-2xl border border-[#faf5ef]/20 bg-[#9a7b78]/18 p-5 transition hover:-translate-y-1">
              <p className="text-white">B.E. Mechatronics Engineering (CGPA: 8.9) | 2019-2023</p>
              <p className="mt-1 text-[#f1dec9]">SNS College of Technology</p>
            </div>
          </article>

          <article className="reveal-left rounded-3xl border border-[#faf5ef]/25 bg-[#54363b]/70 p-7 lift-hover" style={{ animationDelay: "580ms" }}>
            <h2 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#faf5ef]">Certificates</h2>
            <div className="mt-4 rounded-2xl border border-[#faf5ef]/20 bg-[#9a7b78]/18 p-5 transition hover:-translate-y-1">
              <p className="text-white">Full Stack Development Course Completion Certificate</p>
              <p className="mt-1 text-[#f1dec9]">Besant Technologies</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

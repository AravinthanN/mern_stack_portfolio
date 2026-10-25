"use client";

import { profile } from "@/data/portfolio";
import useRevealOnIntersect from "./useRevealOnIntersect";

export default function HeroSection() {
  const setSectionRef = useRevealOnIntersect<HTMLElement>();

  return (
    <section ref={setSectionRef(0)} className="reveal-up hero-shell">
      <nav className="hero-nav" aria-label="Main navigation">
        <a className="brand-mark" href="#top" aria-label="Aravinthan, home">AN<span>.</span></a>
        <div className="hero-nav-links">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href={`mailto:${profile.email}`} className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <div className="hero-content" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {profile.role} <span className="eyebrow-divider">/</span> {profile.location}</p>
          <h1 className="hero-title">Making the<br />complex feel <span>simple.</span></h1>
          <p className="hero-description">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="button-text" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero-note">Currently building thoughtful software at <strong>MJ Tech Solutions</strong></p>
        </div>

        <div className="orb-scene" aria-label="Abstract animated 3D sculpture" role="img">
          <div className="orb-glow" />
          <div className="orb-ring orb-ring-one" />
          <div className="orb-ring orb-ring-two" />
          <div className="orb-ring orb-ring-three" />
          <div className="orb-core"><span>✳</span></div>
          <div className="orb-label orb-label-top">CURIOUS BY NATURE</div>
          <div className="orb-label orb-label-bottom">BUILT WITH INTENTION</div>
          <div className="orb-spark orb-spark-one">✦</div>
          <div className="orb-spark orb-spark-two">✳</div>
        </div>
      </div>

      <div className="hero-bottomline">
        <span>SCROLL TO EXPLORE</span><span className="bottomline-rule" /><span>01 — 05</span>
      </div>
    </section>
  );
}

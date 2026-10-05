import { useState, useEffect } from "react";
import BackgroundField from "@/components/BackgroundField";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import CommandPalette from "@/components/CommandPalette";

export const Home = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer to handle reveal animations gracefully
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-cyan/30">
      {/* Background Grid, Glow, and Drifting Math Field */}
      <BackgroundField />

      {/* Glassmorphism Header Nav */}
      <Navigation onOpenPalette={() => setPaletteOpen(true)} />

      {/* Hero & Interactive Console Widget */}
      <HeroSection />

      {/* Infinite Tech Marquee Ticker */}
      <Marquee />

      {/* Toolkit / Skills & 3D Planetary Orbit */}
      <SkillsSection />

      {/* Track Record & Experience Timeline */}
      <ExperienceSection />

      {/* Selected Work & Case Study Modals */}
      <ProjectsSection />

      {/* Credentials & Certifications */}
      <CertificationsSection />

      {/* Education */}
      <EducationSection />

      {/* Contact & Footer */}
      <ContactSection />

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
};
export default Home;
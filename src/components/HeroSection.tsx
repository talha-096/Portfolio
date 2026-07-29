import { useEffect, useState } from "react";
import { ArrowUpRight, Download, ArrowDown } from "lucide-react";
import ConsoleWidget from "./ConsoleWidget";

export const HeroSection = () => {
  const [typedRole, setTypedRole] = useState("a QA Engineer");
  const [scrambledText, setScrambledText] = useState("Engineering robust AI systems & automated test suites at scale.");

  const roles = [
    "a QA Engineer",
    "an AI/ML Engineer",
    "building automated test suites",
    "designing ML pipelines",
    "a passionate Software Engineer"
  ];

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeLoop = () => {
      const currentRole = roles[roleIdx];

      if (!isDeleting) {
        charIdx++;
        setTypedRole(currentRole.slice(0, charIdx));

        if (charIdx === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(typeLoop, 1600);
          return;
        }
        timer = setTimeout(typeLoop, 70);
      } else {
        charIdx--;
        setTypedRole(currentRole.slice(0, charIdx));

        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timer = setTimeout(typeLoop, 200);
          return;
        }
        timer = setTimeout(typeLoop, 35);
      }
    };

    timer = setTimeout(typeLoop, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="hero" data-screen-label="01 Hero">
      <div className="hero-orb" />

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Bio & Headline */}
          <div className="hero-left">
            <div className="hero-status">
              <span className="avatar">TG</span>
              <span>Talha Ghafoor</span>
              <span className="sep">/</span>
              <span>Pakistan</span>
              <span className="ring" title="Available for SQA & AI/ML Opportunities" />
            </div>

            <div className="hero-name mono">
              SOFTWARE QA · AUTOMATED TESTING · AI/ML ENGINEERING · FULL-STACK
            </div>

            <h1 className="hero-headline">
              <span className="line">
                <span>Architecting &amp;</span>
              </span>
              <span className="line">
                <span>
                  <em>verifying</em> AI systems
                </span>
              </span>
              <span className="line">
                <span>built to perform in</span>
              </span>
              <span className="line">
                <span>
                  <em>production.</em>
                </span>
              </span>
            </h1>

            <div className="hero-subline">
              <span className="arrow">▸</span>
              <span>{typedRole}</span>
              <span className="typed-cursor" />
            </div>

            <p className="hero-desc">
              Software Engineering student at HITEC University specializing in SQA automation, machine learning model evaluation, and full-stack API development. Experienced in Cypress, Postman, PyTorch, FastAPI, React, AWS, and Docker.{" "}
              <span className="scramble">{scrambledText}</span>
            </p>

            <div className="hero-ctas">
              <a
                className="btn btn-primary"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("contact");
                }}
              >
                Let's build something
                <ArrowUpRight className="w-4 h-4 ml-1 btn-arrow" />
              </a>

              <a
                className="btn btn-ghost"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("projects");
                }}
              >
                See selected work
              </a>

              <a
                className="btn btn-ghost"
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-1" />
                Download CV
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="num">84%</div>
                <div className="lbl">ML F1-Score</div>
              </div>
              <div className="hero-stat">
                <div className="num">2</div>
                <div className="lbl">AI Internships</div>
              </div>
              <div className="hero-stat">
                <div className="num">2</div>
                <div className="lbl">Certifications</div>
              </div>
              <div className="hero-stat">
                <div className="num">4+</div>
                <div className="lbl">Major Projects</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Console Widget */}
          <div className="hero-right">
            <div className="hero-chip chip-1">
              <span className="dot" /> cypress::pass ✓
            </div>
            <div className="hero-chip chip-2">
              <span className="dot violet" /> PyTorch + RoBERTa
            </div>
            <div className="hero-chip chip-3">
              <span className="dot mint" /> Postman API contract
            </div>
            <div className="hero-chip chip-4">
              <span className="dot amber" /> aws:fargate ✓
            </div>

            <ConsoleWidget />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;

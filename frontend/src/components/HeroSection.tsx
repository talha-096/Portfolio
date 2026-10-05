import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import ConsoleWidget from "./ConsoleWidget";

// Module scope: a new array identity on every render would either restart the
// typing loop or (as before) force the effect to lie about its dependencies.
const roles = [
  "a Software Engineer",
  "a Python Backend Developer",
  "focused on Software Quality Assurance",
  "building and testing REST APIs"
];

export const HeroSection = () => {
  const [typedRole, setTypedRole] = useState(roles[0]);

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
          {/* Left Column: Bio, Headline & Profile Photo Card */}
          <div className="hero-left">
            <div className="hero-status">
              <img
                src="/profile.jpg"
                alt="Talha Ghafoor"
                className="w-7 h-7 rounded-full object-cover border border-cyan/60 shadow-md"
              />
              <span>Talha Ghafoor</span>
              <span className="sep">/</span>
              <span>Pakistan</span>
              <span className="sep">/</span>
              <span className="text-cyan font-mono text-xs">BS SE (2022 – 2026)</span>
              <span className="ring" title="Available for Python Backend & SQA Opportunities" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start mb-6">
              {/* Profile Headshot Featured Badge Card */}
              <div className="relative group shrink-0 self-center sm:self-start">
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden border-2 border-cyan/40 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:border-cyan">
                  <img
                    src="/profile.jpg"
                    alt="Talha Ghafoor Portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-primary opacity-30 blur-md group-hover:opacity-70 transition-opacity" />
              </div>

              <div className="w-full">
                <div className="hero-name mono">
                  SOFTWARE ENGINEER · PYTHON BACKEND · SQA
                </div>

                <h1 className="hero-headline text-balance">
                  <span className="line">
                    <span>Building &amp;</span>
                  </span>
                  <span className="line">
                    <span>
                      <em>testing</em> software
                    </span>
                  </span>
                  <span className="line">
                    <span>from APIs to</span>
                  </span>
                  <span className="line">
                    <span>
                      <em>applications.</em>
                    </span>
                  </span>
                </h1>
              </div>
            </div>

            <div className="hero-subline">
              <span className="arrow">▸</span>
              <span>{typedRole}</span>
              <span className="typed-cursor" />
            </div>

            <p className="hero-desc font-sans text-sm sm:text-base">
              Software Engineer focused on Python backend development and Software Quality Assurance. I build REST APIs with Flask and FastAPI, test applications with Selenium, Cypress and Postman, and bring hands-on experience in AI-powered projects.
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
                <div className="num">3</div>
                <div className="lbl">Internships</div>
              </div>
              <div className="hero-stat">
                <div className="num">2</div>
                <div className="lbl">ML Internships</div>
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
              <span className="dot" /> Selenium + Cypress
            </div>
            <div className="hero-chip chip-2">
              <span className="dot violet" /> PyTorch + RoBERTa
            </div>
            <div className="hero-chip chip-3">
              <span className="dot mint" /> Flask + REST APIs
            </div>
            <div className="hero-chip chip-4">
              <span className="dot amber" /> Celery + Redis
            </div>

            <ConsoleWidget />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;

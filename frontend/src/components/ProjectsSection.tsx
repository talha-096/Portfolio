import React, { useState } from "react";
import CaseStudyModal, { ProjectData } from "./CaseStudyModal";

// The card grid needs the presentational fields on top of ProjectData, and `img`
// is required here (unlike on ProjectData) because every card renders a thumbnail.
type ProjectCard = ProjectData & {
  id: string;
  num: string;
  catClass: string;
  tint: string;
  img: string;
};

const ProjectCardImage = ({ p, onOpenModal }: { p: ProjectCard; onOpenModal: () => void }) => {
  const images = p.images && p.images.length > 0 ? p.images : [p.img];
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="project-img-wrap group cursor-pointer relative" onClick={onOpenModal}>
      <span className="project-cat">{p.category}</span>
      <span className="project-num">{p.num}</span>
      <img
        loading="lazy"
        decoding="async"
        src={images[currentIdx]}
        alt={p.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/banner.png";
        }}
      />
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-2.5 flex justify-between items-center px-3 z-10">
          <button
            onClick={prevImg}
            className="w-7 h-7 rounded-full bg-black/80 text-white hover:bg-cyan hover:text-black transition-all shadow-md flex items-center justify-center font-bold text-sm"
            title="Previous picture"
          >
            ‹
          </button>
          <span className="text-[10px] font-mono bg-black/80 text-cyan px-2.5 py-0.5 rounded-full border border-cyan/30 font-bold backdrop-blur-sm">
            Pic {currentIdx + 1} of {images.length}
          </span>
          <button
            onClick={nextImg}
            className="w-7 h-7 rounded-full bg-black/80 text-white hover:bg-cyan hover:text-black transition-all shadow-md flex items-center justify-center font-bold text-sm"
            title="Next picture"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  const [activePFilter, setActivePFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectCard[] = [
    {
      id: "genmark",
      num: "01",
      catClass: "genai",
      tint: "tint-mint",
      category: "Generative AI & SQA",
      title: "GenMark: AI-Powered Marketing Platform",
      subtitle: "AI Microservices + Cypress E2E & Postman Contract Test Suite",
      img: "/projects/genmark/media__1782301041222.png",
      images: [
        "/projects/genmark/media__1782301041222.png",
        "/projects/genmark/media__1782301049086.png",
        "/projects/genmark/media__1782301055994.png",
        "/projects/genmark/media__1782301063284.png",
        "/projects/genmark/media__1782301072169.png"
      ],
      metrics: [
        { label: "Role", value: "AI & SQA Engineer" },
        { label: "Stack", value: "LLMs + Flask + React" },
        { label: "Testing", value: "Cypress + Postman" }
      ],
      description:
        "Final Year Project: AI marketing platform featuring automated content generation, brand kit orchestration, and serverless AWS microservices verified via Cypress E2E suites.",
      features: [
        "Automated Cypress E2E test coverage for React authentication and prompt workflows.",
        "Postman API contract verification for FastAPI endpoints on AWS Fargate & Lambda."
      ],
      tech: ["Python", "Flask", "FastAPI", "React", "AWS", "Docker", "Cypress", "Postman"],
      github: "https://github.com/talha-096/GenMark",
      demo: "https://gen-mark-kappa.vercel.app/"
    },
    {
      id: "ecommerce",
      num: "02",
      catClass: "fullstack",
      tint: "tint-cyan",
      category: "Full-Stack",
      title: "E-Commerce Web Application",
      subtitle: "PHP (Laravel 7) + SQLite/MySQL + Localized Shipping & Nationwide COD",
      img: "/projects/ecommerce/homepage.png",
      images: [
        "/projects/ecommerce/homepage.png",
        "/projects/ecommerce/about.png",
        "/projects/ecommerce/shop-grid.png",
        "/projects/ecommerce/shop-list.png"
      ],
      metrics: [
        { label: "Framework", value: "Laravel 7" },
        { label: "Location", value: "Islamabad, PK" },
        { label: "Payment", value: "Nationwide COD" }
      ],
      description:
        "Full-featured online shopping platform built specifically for the Pakistani e-commerce market, providing localized shipping options and nationwide Cash on Delivery (COD).",
      features: [
        "Localized shopping with prices in PKR and city-tailored shipping options across Pakistan.",
        "Complete product catalog with live search, category filtering, cart, wishlist & discount coupons.",
        "Comprehensive Admin Dashboard for stock management, order status, PDF invoices & analytics."
      ],
      tech: ["PHP", "Laravel 7", "SQLite", "MySQL", "Bootstrap 4", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/talha-096/Ecommerce-Project",
      demo: "https://github.com/talha-096/Ecommerce-Project"
    },
    {
      id: "nlp",
      num: "03",
      catClass: "ml",
      tint: "tint-violet",
      category: "Machine Learning",
      title: "Mental Health NLP Affect Classifier",
      subtitle: "PyTorch + RoBERTa Transformers + SHAP Explainability & SMOTE",
      img: "/projects/nlp/classification-metrics.jpg",
      images: [
        "/projects/nlp/classification-metrics.jpg",
        "/projects/nlp/confusion-matrix-normalized.png",
        "/projects/nlp/confusion-matrix-counts.png",
        "/projects/nlp/shap-feature-importance.jpg",
        "/projects/nlp/shap-waterfall.png"
      ],
      metrics: [
        { label: "Accuracy", value: "83.83% F1" },
        { label: "Explainability", value: "SHAP Interpret" },
        { label: "Imbalance Fix", value: "SMOTE Recall 83%" }
      ],
      description:
        "4-class mental health NLP model using PyTorch and RoBERTa embeddings, optimized with SMOTE resampling to fix minority class imbalance.",
      features: [
        "SMOTE class-imbalance fix boosting minority recall from 71% to 83%.",
        "SHAP token interpretability highlighting key clinical indicator words."
      ],
      tech: ["Python", "PyTorch", "RoBERTa", "SHAP", "SMOTE", "scikit-learn"],
      github: "https://github.com/talha-096/NLP-Mental-Health-Classification-System",
      demo: "#"
    },
    {
      id: "keythm",
      num: "04",
      catClass: "web",
      tint: "tint-mint",
      category: "Frontend Web",
      title: "Keythm – Mechanical Typing Speed App",
      subtitle: "Next.js 16 + React 19 + Web Audio API + Tailwind CSS v4",
      img: "/projects/keythm/keythm.png",
      images: ["/projects/keythm/keythm.png"],
      metrics: [
        { label: "Framework", value: "Next.js 16" },
        { label: "Audio Engine", value: "Web Audio API" },
        { label: "UI Library", value: "React 19 / Base UI" }
      ],
      description:
        "Sleek frontend typing speed web application featuring realistic mechanical keyboard audio synthesis, real-time WPM/accuracy tracking, interactive virtual keyboard, and custom theme presets.",
      features: [
        "Web Audio API per-key audio synthesis with realistic mechanical feedback.",
        "Interactive virtual keyboard with live key highlighting and WPM analytics charts.",
        "Multiple test modes (Time, Words, Quotes, Zen) and 6 customizable color themes."
      ],
      tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Web Audio API", "Base UI", "Recharts", "Motion"],
      github: "https://github.com/talha-096/Keythm",
      demo: "https://github.com/talha-096/Keythm"
    }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activePFilter === "all") return true;
    return p.catClass === activePFilter;
  });

  return (
    <section id="projects" className="section-pad" data-screen-label="04 Projects">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-tag">
              <span className="square" />
              04 / Selected work
            </div>
            <h2>
              Verified systems, <span className="gradient">proven performance</span>
            </h2>
          </div>
          <div className="section-meta">GenAI · Frontend · Full-Stack · ML</div>
        </div>

        {/* Project Filter Bar */}
        <div className="pfilter-bar reveal">
          <button
            className={`pfilter-btn ${activePFilter === "all" ? "active" : ""}`}
            onClick={() => setActivePFilter("all")}
          >
            All Projects
          </button>
          <button
            className={`pfilter-btn ${activePFilter === "web" ? "active" : ""}`}
            onClick={() => setActivePFilter("web")}
          >
            Frontend / Web
          </button>
          <button
            className={`pfilter-btn ${activePFilter === "genai" ? "active" : ""}`}
            onClick={() => setActivePFilter("genai")}
          >
            Generative AI
          </button>
          <button
            className={`pfilter-btn ${activePFilter === "fullstack" ? "active" : ""}`}
            onClick={() => setActivePFilter("fullstack")}
          >
            Full-Stack
          </button>
          <button
            className={`pfilter-btn ${activePFilter === "ml" ? "active" : ""}`}
            onClick={() => setActivePFilter("ml")}
          >
            Machine Learning
          </button>
        </div>

        <div className="projects-stack">
          {filteredProjects.map((p) => (
            <article key={p.id} className={`project-card ${p.tint} reveal`}>
              <ProjectCardImage p={p} onOpenModal={() => setSelectedProject(p)} />

              <div className="project-body">
                <h3>{p.title}</h3>

                <div className="project-metrics">
                  {p.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="project-metric">
                      <span className="v gradient">{m.value}</span>
                      <span className="l">{m.label}</span>
                    </div>
                  ))}
                </div>

                <p>{p.description}</p>

                <ul className="project-feature-list">
                  {p.features.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx}>{f}</li>
                  ))}
                </ul>

                <div className="project-tech">
                  {p.tech.map((t, tIdx) => (
                    <span key={tIdx}>{t}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {p.github && (
                    <a
                      className="project-link"
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      view on github →
                    </a>
                  )}

                  <button
                    className="btn-case-study"
                    onClick={() => setSelectedProject(p)}
                  >
                    Read Case Study 🔍
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
export default ProjectsSection;

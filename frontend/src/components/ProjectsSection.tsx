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
      title: "GenMark — Multi-Modal AI Marketing Content Platform",
      subtitle: "Final-Year Project · 2025–2026 · Three-member team",
      img: "/projects/genmark/media__1782301041222.png",
      images: [
        "/projects/genmark/media__1782301041222.png",
        "/projects/genmark/media__1782301049086.png",
        "/projects/genmark/media__1782301055994.png",
        "/projects/genmark/media__1782301063284.png",
        "/projects/genmark/media__1782301072169.png"
      ],
      metrics: [
        { label: "Role", value: "Backend Developer & Sole Tester" },
        { label: "Stack", value: "LLMs + Flask + React" },
        { label: "Testing", value: "Selenium · Cypress · Postman" }
      ],
      description:
        "Built Python backend services and served as the sole tester in a three-member team developing an AI marketing content platform at HITEC University.",
      features: [
        "Developed Flask REST APIs with MongoDB and asynchronous tasks using Celery and Redis.",
        "Performed functional and API testing with Selenium, Cypress and Postman; contributed to Docker packaging, CI/CD and technical documentation."
      ],
      tech: ["Python", "Flask", "REST APIs", "MongoDB", "Celery", "Redis", "Docker", "React", "Selenium", "Cypress", "Postman"],
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
      github: "https://github.com/talha-096/Ecommerce-Project"
    },
    {
      id: "nlp",
      num: "03",
      catClass: "ml",
      tint: "tint-violet",
      category: "Machine Learning",
      title: "Hybrid Transformer–Affective Mental Health Classification",
      subtitle: "RoBERTa + Sentiment + Emotion Features · Personal Project · 2025",
      img: "/projects/nlp/classification-metrics.jpg",
      images: [
        "/projects/nlp/classification-metrics.jpg",
        "/projects/nlp/confusion-matrix-normalized.png",
        "/projects/nlp/confusion-matrix-counts.png",
        "/projects/nlp/shap-feature-importance.jpg",
        "/projects/nlp/shap-waterfall.png"
      ],
      metrics: [
        { label: "Accuracy", value: "83.83%" },
        { label: "Macro F1", value: "83.73%" },
        { label: "Dataset", value: "~10,000 Posts" }
      ],
      description:
        "Research project combining RoBERTa with sentiment and emotion features to classify approximately 10,000 Reddit posts across four categories. Achieved 83.83% accuracy and 83.73% macro F1-score.",
      features: [
        "Used class-weighted loss to address class imbalance; achieved 94% F1-score for the Anxious category.",
        "Explored model predictions with SHAP and documented the work in a research manuscript."
      ],
      tech: ["Python", "PyTorch", "RoBERTa", "SHAP", "Class-weighted Loss", "scikit-learn"],
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
      github: "https://github.com/talha-096/Keythm"
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
              Software built, <span className="gradient">tested &amp; documented</span>
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
            <article key={p.id} className={`project-card ${p.tint}`}>
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

                  {p.demo && p.demo !== "#" && (
                    <a className="project-link" href={p.demo} target="_blank" rel="noopener noreferrer">live demo →</a>
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
        <div className="mt-10 p-6 border border-line rounded-2xl bg-panel">
          <h3 className="text-xl mb-5">Additional projects</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-text-2">
            <div><h4 className="text-text font-medium mb-2">Fake News Detector</h4><p>Python, TF-IDF, Logistic Regression and scikit-learn, with a Streamlit interface.</p></div>
            <div><h4 className="text-text font-medium mb-2">Heart Disease Prediction Pipeline</h4><p>Python and scikit-learn pipeline using SMOTE to address class imbalance. Minority-class recall improved from approximately 71% to 83%.</p></div>
            <div><h4 className="text-text font-medium mb-2">Flutter Fitness App</h4><p>Mobile fitness application built with Dart and Flutter, including a chatbot integrated with the Claude API.</p></div>
          </div>
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

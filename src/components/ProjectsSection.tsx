import { useState } from "react";
import CaseStudyModal, { ProjectData } from "./CaseStudyModal";

export const ProjectsSection = () => {
  const [activePFilter, setActivePFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: Array<ProjectData & { id: string; num: string; catClass: string; tint: string; img: string }> = [
    {
      id: "genmark",
      num: "01",
      catClass: "genai",
      tint: "tint-mint",
      category: "Generative AI & SQA",
      title: "GenMark: AI-Powered Marketing Platform",
      subtitle: "AI Microservices + Cypress E2E & Postman Contract Test Suite",
      img: "/projects/genmark/media__1782301041222.png",
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
      title: "Multi-Vendor E-Commerce Platform",
      subtitle: "Next.js 15 + Hono.js Serverless API + Supabase & Stripe QA",
      img: "/banner.png",
      metrics: [
        { label: "Framework", value: "Next.js 15" },
        { label: "Payment QA", value: "Stripe Webhooks" },
        { label: "Database", value: "PostgreSQL / Drizzle" }
      ],
      description:
        "Multi-vendor store featuring role-based dashboards (Admin, Vendor, Customer), serverless Hono.js routes, and verified Stripe checkout payment sync.",
      features: [
        "Stripe webhook test suite confirming real-time PostgreSQL order status updates.",
        "Role-based Supabase authentication middleware with Drizzle ORM models."
      ],
      tech: ["Next.js 15", "Supabase", "Drizzle ORM", "Hono.js", "Stripe", "TailwindCSS"],
      github: "https://github.com/talha-096/E-commerce-Website",
      demo: "#"
    },
    {
      id: "nlp",
      num: "03",
      catClass: "ml",
      tint: "tint-violet",
      category: "Machine Learning",
      title: "Mental Health NLP Affect Classifier",
      subtitle: "PyTorch + RoBERTa Transformers + SHAP Explainability & SMOTE",
      img: "/banner.png",
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
      id: "fakenews",
      num: "04",
      catClass: "ml",
      tint: "tint-mint",
      category: "Machine Learning",
      title: "Fake News Detection Engine",
      subtitle: "NLP TF-IDF Classification + Interactive Web App",
      img: "/banner.png",
      metrics: [
        { label: "Algorithm", value: "TF-IDF + LogReg" },
        { label: "Deployment", value: "Streamlit App" },
        { label: "Validation", value: "Precision / Recall" }
      ],
      description:
        "Real-time news credibility classifier featuring text preprocessing, TF-IDF vectorization, and a deployed interactive Streamlit dashboard.",
      features: [
        "End-to-end text tokenization pipeline with Logistic Regression classifier.",
        "Deployed web interface providing instant article credibility scoring."
      ],
      tech: ["Python", "NLP", "Streamlit", "scikit-learn", "TF-IDF"],
      github: "https://github.com/talha-096/Fake-News-Detector",
      demo: "#"
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
          <div className="section-meta">GenAI · SQA · Full-Stack · ML</div>
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
              <div className="project-img-wrap">
                <span className="project-cat">{p.category}</span>
                <span className="project-num">{p.num}</span>
                <img
                  loading="lazy"
                  decoding="async"
                  src={p.img}
                  alt={p.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/banner.png";
                  }}
                />
              </div>

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

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
      title: "GenMark: AI-Powered Marketing Generation",
      subtitle: "AI Model Integration & Microservices + Cypress & Postman SQA Suite",
      img: "/projects/genmark/media__1782301041222.png",
      metrics: [
        { label: "Primary Role", value: "AI & SQA Engineer" },
        { label: "AI & Stack", value: "LLMs + Flask + React" },
        { label: "QA & Infra", value: "Cypress + Postman + AWS" }
      ],
      description:
        "Final Year Project. GenMark is an advanced platform designed to streamline marketing workflows through AI-driven content generation, brand identity management, and automated project orchestration. Engineered with dual AI/Full-Stack and SQA responsibilities.",
      features: [
        "AI Content Generation & Brand Kit Management: Leveraging LLMs for marketing copy, slogans, and consistent brand identity.",
        "Decoupled Microservice Architecture built with React, Vite, TypeScript, Flask, FastAPI, MongoDB, JWT, Gunicorn, and Nginx.",
        "Automated E2E Cypress test suites covering React UI authentication, project workflows, and content generation.",
        "Postman API contract testing for backend services on AWS (ECS Fargate, Lambda, API Gateway, S3, ECR)."
      ],
      tech: ["Python", "Flask", "FastAPI", "React", "TypeScript", "MongoDB", "JWT", "AWS", "Docker", "Cypress", "Postman", "Nginx"],
      github: "https://github.com/talha-096/GenMark",
      demo: "https://gen-mark-kappa.vercel.app/"
    },
    {
      id: "ecommerce",
      num: "02",
      catClass: "fullstack",
      tint: "tint-cyan",
      category: "Full-Stack",
      title: "Full-Stack Multi-Vendor E-Commerce",
      subtitle: "Next.js 15 + Hono.js Serverless API + Supabase & Stripe Webhooks",
      img: "/banner.png",
      metrics: [
        { label: "Framework", value: "Next.js 15" },
        { label: "Payment QA", value: "Stripe Webhooks" },
        { label: "Database", value: "PostgreSQL / Drizzle" }
      ],
      description:
        "Scalable multi-vendor e-commerce platform with role-based dashboards (admin, seller, customer), email verification gates, secure payment flows, and serverless Hono.js API routes.",
      features: [
        "Functional manual and automated testing across checkout, product discovery, and order management.",
        "Stripe webhook integration validation ensuring real-time order/payment state synchronization.",
        "Role-based authentication & session flow with Supabase Auth and custom Next.js Middleware.",
        "PostgreSQL database models configured with Drizzle ORM and TanStack React Query."
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
      title: "Hybrid Transformer Mental Health Detection",
      subtitle: "Multiclass Affective NLP Model + SHAP Explainability & SMOTE",
      img: "/banner.png",
      metrics: [
        { label: "Accuracy", value: "83.83% F1" },
        { label: "Explainability", value: "SHAP Interpret" },
        { label: "Imbalance Fix", value: "SMOTE Recall 83%" }
      ],
      description:
        "Deep learning system for multiclass mental health detection from social media text using PyTorch, HuggingFace, RoBERTa embeddings, sentiment/emotion fusion, and SHAP explainability.",
      features: [
        "4-Class Classification: Normal, Anxious, Depressed, and Suicidal crisis language detection.",
        "Hybrid Architecture fusing RoBERTa embeddings (768-dim) with 7 emotion and 3 sentiment scores.",
        "Class-imbalance defect correction using SMOTE, boosting minority recall from 71% to 83%.",
        "SHAP explainability revealing exact clinical trigger keywords per classification."
      ],
      tech: ["Python", "PyTorch", "RoBERTa", "SHAP", "SMOTE", "scikit-learn", "HuggingFace"],
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
      subtitle: "NLP TF-IDF Classification + Interactive Streamlit Web Dashboard",
      img: "/banner.png",
      metrics: [
        { label: "Algorithm", value: "TF-IDF + LogReg" },
        { label: "Deployment", value: "Streamlit App" },
        { label: "Validation", value: "Precision/Recall" }
      ],
      description:
        "Machine learning classifier for real-time fake news detection featuring full text preprocessing, TF-IDF vectorization, and a deployed Streamlit web dashboard.",
      features: [
        "Full ML pipeline with TF-IDF tokenization and Logistic Regression classifier.",
        "Deployed Streamlit dashboard allowing visitors to paste articles for instant credibility scoring.",
        "Precision, recall, and F1-score model validation across balanced dataset benchmarks."
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

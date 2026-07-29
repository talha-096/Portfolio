import { useState } from "react";
import OrbitCard from "./OrbitCard";

export const SkillsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const skillCategories = [
    {
      id: "sqa",
      title: "Quality Assurance & Automated Testing",
      count: "07",
      headClass: "",
      category: "sqa",
      skills: [
        "Cypress (E2E/Frontend)",
        "Postman API Testing",
        "AI-Assisted Automation",
        "Test Case Design",
        "Regression Testing",
        "Model/Data Evaluation (F1, Recall, AUC-ROC)",
        "SMOTE Class-Imbalance Fix"
      ]
    },
    {
      id: "ml",
      title: "AI & Machine Learning",
      count: "09",
      headClass: "violet",
      category: "ml",
      skills: [
        "Python",
        "scikit-learn",
        "NLP & Tokenization",
        "Computer Vision & CNN",
        "HuggingFace Transformers",
        "Stable Diffusion",
        "Qwen LLM",
        "PyTorch & TensorFlow",
        "SHAP Explainability"
      ]
    },
    {
      id: "web",
      title: "Core Languages & Full-Stack Web",
      count: "10",
      headClass: "mint",
      category: "web",
      skills: [
        "Python & JavaScript",
        "React & Vite",
        "Next.js 15",
        "FastAPI & Flask",
        "Laravel & PHP",
        "REST APIs",
        "Tailwind CSS",
        "Java, C++, Dart"
      ]
    },
    {
      id: "infra",
      title: "Databases, Cloud & MLOps",
      count: "08",
      headClass: "amber",
      category: "infra",
      skills: [
        "PostgreSQL (Supabase)",
        "MongoDB & MySQL",
        "AWS (ECS Fargate, Lambda, API Gateway)",
        "AWS S3 & ECR",
        "Oracle Cloud (OCI)",
        "Docker & Nginx",
        "Git & GitHub",
        "Jupyter Notebook & VS Code"
      ]
    }
  ];

  // Skill experience proficiency matrix
  const skillExperienceMatrix = [
    { name: "Cypress & E2E Test Automation", category: "sqa", experience: "2+ Years Hands-on", level: 90, detail: "Wrote & executed E2E Cypress test suites for React frontends & GenMark platform." },
    { name: "Postman API Contract Testing", category: "sqa", experience: "2+ Years Hands-on", level: 92, detail: "Validated FastAPI & REST API request/response schemas, status codes & payload routes." },
    { name: "Model Evaluation (F1, Precision, Recall, AUC-ROC)", category: "sqa", experience: "Practical AI QA", level: 88, detail: "Evaluated TF-IDF + LogReg & CNN classifiers, applied SMOTE to boost recall from 71% → 83%." },
    { name: "Python & Machine Learning (scikit-learn, PyTorch)", category: "ml", experience: "Academic & Projects", level: 86, detail: "Developed multi-class NLP Mental Health Detection, Fake News Classifier, and image vision pipelines." },
    { name: "Generative AI & LLMs (Transformers, Qwen, Stable Diffusion)", category: "ml", experience: "Applied GenAI", level: 84, detail: "Built on-demand lazy-loaded model inference for multi-modal marketing content generation." },
    { name: "React, Next.js & Frontend Engineering", category: "web", experience: "Full-Stack Dev", level: 88, detail: "Built responsive UI components, state management, and modern glassmorphic web apps." },
    { name: "FastAPI, Flask & Laravel REST APIs", category: "web", experience: "Backend Systems", level: 85, detail: "Built decoupled microservice backends, authentication middleware, and database ORM routes." },
    { name: "Cloud & MLOps (AWS Fargate, Lambda, Docker, Supabase)", category: "infra", experience: "Cloud Deployment", level: 82, detail: "Deployed containerized serverless API gateways, S3 storage buckets, and PostgreSQL DBs." }
  ];

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeFilter !== "all" && cat.category !== activeFilter) return false;
    if (searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase();
    const matchesTitle = cat.title.toLowerCase().includes(query);
    const matchesSkill = cat.skills.some((s) => s.toLowerCase().includes(query));
    return matchesTitle || matchesSkill;
  });

  const filteredMatrix = skillExperienceMatrix.filter((item) => {
    if (activeFilter !== "all" && item.category !== activeFilter) return false;
    if (searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.detail.toLowerCase().includes(query) ||
      item.experience.toLowerCase().includes(query)
    );
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="skills" className="section-pad" data-screen-label="02 Skills">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-tag">
              <span className="square" />
              02 / Toolkit &amp; Skill Experience
            </div>
            <h2>
              The stack &amp; experience behind <span className="gradient">production AI &amp; QA</span>
            </h2>
          </div>
          <div className="section-meta">~ 30+ tools across SQA, ML &amp; Web Engineering</div>
        </div>

        {/* Filter & Search Bar */}
        <div className="skills-filter-container reveal">
          <div className="filter-bar">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Tech Stack
            </button>
            <button
              className={`filter-btn ${activeFilter === "sqa" ? "active" : ""}`}
              onClick={() => setActiveFilter("sqa")}
            >
              SQA &amp; Testing
            </button>
            <button
              className={`filter-btn ${activeFilter === "ml" ? "active" : ""}`}
              onClick={() => setActiveFilter("ml")}
            >
              AI &amp; Machine Learning
            </button>
            <button
              className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
              onClick={() => setActiveFilter("web")}
            >
              Full-Stack &amp; Web
            </button>
            <button
              className={`filter-btn ${activeFilter === "infra" ? "active" : ""}`}
              onClick={() => setActiveFilter("infra")}
            >
              Cloud &amp; MLOps
            </button>
          </div>

          <div className="skill-search-wrap">
            <input
              type="text"
              placeholder="Search technology (e.g. Cypress, Postman, PyTorch)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="skills-grid mb-16">
          {/* Skill Cards Grid */}
          <div className="skill-stack">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="skill-card reveal"
                onMouseMove={handleMouseMove}
              >
                <div className={`skill-card-head ${cat.headClass}`}>
                  <h3>
                    <span className="dot-icon" />
                    {cat.title}
                  </h3>
                  <span className="num">/ {cat.count}</span>
                </div>
                <div className="skill-list">
                  {cat.skills.map((skill, idx) => (
                    <span key={idx} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3D Orbit Stage */}
          <OrbitCard />
        </div>

        {/* Skill Experience & Practical Competency Breakdown */}
        <div className="p-8 border border-line rounded-2xl bg-panel reveal">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-line">
            <div>
              <div className="text-cyan text-xs mono uppercase mb-1">// PRACTICAL COMPETENCY</div>
              <h3 className="text-2xl font-medium text-text">Applied Skill Experience Matrix</h3>
            </div>
            <div className="text-xs text-muted mono">
              Verified through Internship &amp; Project Engineering
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMatrix.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-line/60 bg-bg-2/60 hover:border-line-2 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text text-sm">{item.name}</span>
                  <span className="text-xs text-cyan mono font-semibold">{item.experience}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-line rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${item.level}%` }}
                  />
                </div>

                <p className="text-xs text-text-2 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;

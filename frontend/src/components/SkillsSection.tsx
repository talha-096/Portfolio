import { useState } from "react";
import OrbitCard from "./OrbitCard";

export const SkillsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const skillCategories = [
    {
      id: "ml_ai",
      title: "ML/AI",
      count: "08",
      headClass: "violet",
      category: "ml_ai",
      skills: [
        "PyTorch & TensorFlow",
        "scikit-learn",
        "NLP & Tokenization",
        "HuggingFace Transformers",
        "SHAP Explainability & Interpretability",
        "Computer Vision & CNNs",
        "Generative AI & LLMs",
        "SMOTE Class-Imbalance Modeling"
      ]
    },
    {
      id: "python_dev",
      title: "Python Developer",
      count: "07",
      headClass: "mint",
      category: "python_dev",
      skills: [
        "Python (v3.10+)",
        "FastAPI",
        "Flask",
        "Async Python & Coroutines",
        "RESTful API Development",
        "Pandas & NumPy Data Processing",
        "Python Scripting & Automation"
      ]
    },
    {
      id: "qa_engineer",
      title: "QA Engineer",
      count: "07",
      headClass: "",
      category: "qa_engineer",
      skills: [
        "Cypress (E2E & UI Automation)",
        "Postman API Contract Testing",
        "Test Case Design & Execution",
        "Functional & Manual Testing",
        "Regression Testing & Bug Tracking",
        "Integration & Webhook Validation",
        "Model Evaluation (F1, Precision, Recall)"
      ]
    },
    {
      id: "fullstack_dev",
      title: "Full Stack Web Developer",
      count: "08",
      headClass: "amber",
      category: "fullstack_dev",
      skills: [
        "React & Vite",
        "Next.js 15 (App Router)",
        "TypeScript & JavaScript",
        "PHP & Laravel 7",
        "Tailwind CSS & Bootstrap 4",
        "HTML5 & CSS3",
        "PostgreSQL (Supabase) & Drizzle ORM",
        "MongoDB & SQLite / MySQL"
      ]
    }
  ];

  // Skill experience proficiency matrix mapped strictly to the 4 domains
  const skillExperienceMatrix = [
    {
      name: "PyTorch, Transformers & ML/AI Models",
      category: "ml_ai",
      experience: "ML/AI Specialist",
      level: 90,
      detail: "Developed 4-class mental health detection with RoBERTa embeddings, SHAP explainability plots, and SMOTE imbalance correction."
    },
    {
      name: "FastAPI, Flask & Python Backend Systems",
      category: "python_dev",
      experience: "Python Developer",
      level: 92,
      detail: "Built high-performance FastAPI/Flask microservices, custom Pydantic contract schemas, and automated request logging telemetry."
    },
    {
      name: "Cypress E2E & Postman API Automation",
      category: "qa_engineer",
      experience: "QA Engineer",
      level: 94,
      detail: "Authored end-to-end Cypress test suites for React workflows and executed Postman API contract verification suites."
    },
    {
      name: "React, Next.js, Laravel & Full Stack Web",
      category: "fullstack_dev",
      experience: "Full Stack Developer",
      level: 88,
      detail: "Built responsive web applications including localized Laravel 7 e-commerce, Next.js serverless routes, and interactive UI dashboards."
    }
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
              02 / Technical Stack &amp; Domains
            </div>
            <h2>
              Core technical stack across <span className="gradient">ML/AI, Python, QA &amp; Full Stack</span>
            </h2>
          </div>
          <div className="section-meta">Targeted expertise in ML/AI · Python · QA · Full Stack Web</div>
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
              className={`filter-btn ${activeFilter === "ml_ai" ? "active" : ""}`}
              onClick={() => setActiveFilter("ml_ai")}
            >
              ML/AI
            </button>
            <button
              className={`filter-btn ${activeFilter === "python_dev" ? "active" : ""}`}
              onClick={() => setActiveFilter("python_dev")}
            >
              Python Developer
            </button>
            <button
              className={`filter-btn ${activeFilter === "qa_engineer" ? "active" : ""}`}
              onClick={() => setActiveFilter("qa_engineer")}
            >
              QA Engineer
            </button>
            <button
              className={`filter-btn ${activeFilter === "fullstack_dev" ? "active" : ""}`}
              onClick={() => setActiveFilter("fullstack_dev")}
            >
              Full Stack Web Developer
            </button>
          </div>

          <div className="skill-search-wrap">
            <input
              type="text"
              placeholder="Search technology (e.g. PyTorch, FastAPI, Cypress, React)..."
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
        <div className="p-4 sm:p-6 md:p-8 border border-line rounded-2xl bg-panel reveal overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-line">
            <div>
              <div className="text-cyan text-xs mono uppercase mb-1">// PRACTICAL COMPETENCY</div>
              <h3 className="text-xl sm:text-2xl font-medium text-text">Domain Experience Matrix</h3>
            </div>
            <div className="text-xs text-muted mono">
              Verified across ML/AI, Python, QA &amp; Full Stack Development
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

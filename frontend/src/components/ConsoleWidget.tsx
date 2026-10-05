import { useState } from "react";

const highlights = [
  {
    name: "Backend",
    title: "GenMark / Python Backend",
    detail: "Backend developer and sole tester in a three-member final-year project team.",
    lines: ["Flask REST APIs + MongoDB", "Celery + Redis asynchronous processing", "Docker containers + CI/CD contributions", "Requirements, app flow and schema documentation"],
  },
  {
    name: "Testing",
    title: "GenMark / Software Quality Assurance",
    detail: "Functional testing, API testing and test automation across the application.",
    lines: ["Selenium + Cypress browser automation", "Postman API testing", "Test-case design + defect reporting", "Software Testing Life Cycle (STLC)"],
  },
  {
    name: "ML",
    title: "Mental Health / NLP Research",
    detail: "Personal classification project using approximately 10,000 Reddit posts across four categories.",
    lines: ["RoBERTa + sentiment + emotion features", "Accuracy: 83.83% | Macro F1: 83.73%", "Class-weighted loss for imbalance", "SHAP explanations + research manuscript"],
  },
];

export const ConsoleWidget = () => {
  const [active, setActive] = useState(0);
  const selected = highlights[active];
  return (
    <div className="console">
      <div className="console-head">
        <div className="console-dots"><span /><span /><span /></div>
        <div className="console-title">talha / <b>selected work</b></div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap gap-2 mb-7" role="tablist" aria-label="Project highlights">
          {highlights.map((item, index) => (
            <button key={item.name} id={`highlight-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="highlight-panel"
              className={`filter-btn ${active === index ? "active" : ""}`} onClick={() => setActive(index)}>{item.name}</button>
          ))}
        </div>
        <div id="highlight-panel" role="tabpanel" aria-labelledby={`highlight-tab-${active}`}>
          <div className="text-xs mono text-cyan mb-3">// PROJECT NOTES</div>
          <h2 className="text-xl sm:text-2xl font-medium mb-4">{selected.title}</h2>
          <p className="text-text-2 text-sm leading-relaxed mb-7">{selected.detail}</p>
          <ul className="space-y-4 text-sm mono mb-8">
            {selected.lines.map((line) => <li className="flex gap-3" key={line}><span className="text-mint" aria-hidden="true">›</span><span>{line}</span></li>)}
          </ul>
        </div>
        <div className="flex flex-wrap gap-5 border-t border-line pt-5 text-sm">
          <a className="text-cyan hover:underline" href="https://gen-mark-kappa.vercel.app/" target="_blank" rel="noopener noreferrer">Explore GenMark ↗</a>
          <a className="text-cyan hover:underline" href="https://www.linkedin.com/in/talha-ghafoor-475aa926a/" target="_blank" rel="noopener noreferrer">LinkedIn profile ↗</a>
        </div>
      </div>
      <div className="console-foot"><span className="seg">Python · Backend · SQA</span></div>
    </div>
  );
};
export default ConsoleWidget;

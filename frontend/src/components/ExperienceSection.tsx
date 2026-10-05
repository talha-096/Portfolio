export const ExperienceSection = () => {
  const experiences = [
  {
    "role": "WordPress Developer & SEO Intern",
    "company": "Alev Digital",
    "period": "AUG 2026 - PRESENT",
    "isCurrent": true,
    "points": [
      "Build and maintain client WordPress websites and responsive pages.",
      "Apply on-page SEO through page titles, meta descriptions, heading structure and internal linking.",
      "Support ongoing website updates and maintenance."
    ],
    "impactTags": [
      "Client Websites",
      "Responsive Pages",
      "On-page SEO"
    ],
    "tech": [
      "WordPress",
      "HTML",
      "CSS",
      "SEO"
    ]
  },
  {
    "role": "Machine Learning Intern",
    "company": "Digital Empowerment Network",
    "period": "JUL 2025 - SEP 2025",
    "isCurrent": false,
    "points": [
      "Built a mental-health text classifier using TF-IDF and Logistic Regression, achieving approximately 84% F1-score.",
      "Applied SMOTE to a heart-disease prediction pipeline, improving minority-class recall from approximately 71% to 83%.",
      "Prepared data, evaluated accuracy, precision, recall, F1 and AUC-ROC, and documented and presented findings."
    ],
    "impactTags": [
      "~84% F1-score",
      "Heart-disease recall ~71% → 83%"
    ],
    "tech": [
      "Python",
      "scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "SMOTE"
    ]
  },
  {
    "role": "Machine Learning Intern",
    "company": "DevelopersHub Corporation",
    "period": "JUN 2025 - JUL 2025",
    "isCurrent": false,
    "points": [
      "Developed and evaluated a CNN image classifier, achieving approximately 89% validation accuracy.",
      "Preprocessed and labeled approximately 6,000 images for model training and evaluation.",
      "Tracked experiments and documented results in weekly reports, using Git and GitHub for version control."
    ],
    "impactTags": [
      "~89% Validation Accuracy",
      "~6,000 Images"
    ],
    "tech": [
      "Python",
      "CNN",
      "Image Classification",
      "Git",
      "GitHub"
    ]
  }
];

  return (
    <section id="experience" className="section-pad" data-screen-label="03 Experience">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-tag">
              <span className="square" />
              03 / Track record
            </div>
            <h2>
              Practical experience in <span className="gradient">web development &amp; ML</span>
            </h2>
          </div>
          <div className="section-meta">2025–2026 · 3 Internships</div>
        </div>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`tl-item ${exp.isCurrent ? "current" : ""} reveal`}>
              <div className="tl-dot" />
              <div className="tl-row">
                <div className="tl-period">
                  {exp.period}
                  {exp.isCurrent && (
                    <div>
                      <span className="badge">● CURRENT</span>
                    </div>
                  )}
                </div>

                <div className="tl-body">
                  <h3>{exp.role}</h3>
                  <div className="company">{exp.company}</div>
                  
                  <div className="tl-impact-tags">
                    {exp.impactTags.map((tag, i) => (
                      <span key={i} className="tag-impact">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-4 text-sm text-text-2 list-disc ml-4">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="tl-tech">
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ExperienceSection;

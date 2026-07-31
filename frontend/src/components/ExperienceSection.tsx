export const ExperienceSection = () => {
  const experiences = [
    {
      role: "AI and Machine Learning Engineering Intern",
      company: "Digital Empowerment Network",
      period: "JUL 2025 - SEP 2025",
      isCurrent: true,
      points: [
        "Designed and executed test cases to validate a mental health detection model (TF-IDF + Logistic Regression), achieving ~84% F1-score through threshold tuning.",
        "Identified class-imbalance defect in heart disease detection pipeline; applied SMOTE as corrective fix and verified improvement via regression testing (minority recall ~71% → 83%).",
        "Authored structured QA evaluation reports (precision, recall, AUC-ROC) and presented findings to engineering leadership."
      ],
      impactTags: [
        "⚡ ~84% F1-Score Achieved",
        "🎯 SMOTE Class-Imbalance Fix",
        "📊 Regression & AUC-ROC QA"
      ],
      tech: ["Python", "scikit-learn", "TF-IDF", "Logistic Regression", "SMOTE", "Postman", "QA Metrics"]
    },
    {
      role: "AI and Machine Learning Engineering Intern",
      company: "DevelopersHub Corporation",
      period: "JUN 2025 - JUL 2025",
      isCurrent: false,
      points: [
        "Conducted systematic testing and validation of a CNN-based image classifier, confirming ~89% validation accuracy against target benchmarks.",
        "Performed data quality testing on a ~6,000-image dataset (cleaning, labeling, flagging inconsistencies) to prevent overfitting.",
        "Documented test results and error patterns across training runs in structured progress reports."
      ],
      impactTags: [
        "🖼️ CNN Image Classifier QA",
        "🧹 6,000-Image Data Cleaning",
        "📈 ~89% Accuracy Benchmark"
      ],
      tech: ["Python", "PyTorch", "CNN", "Data Quality QA", "OpenCV", "Image Classification"]
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
              From model validation to <span className="gradient">production QA</span>
            </h2>
          </div>
          <div className="section-meta">2025 · 2 Engineering Internships</div>
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
                      <span className="badge">● INTERNSHIP</span>
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

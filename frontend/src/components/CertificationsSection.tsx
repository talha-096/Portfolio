export const CertificationsSection = () => {
  const certs = [
    {
      icon: "🧠",
      badge: "Oracle Cloud",
      badgeClass: "",
      title: "OCI 2025 Certified AI Foundations Associate",
      desc: "Validated expertise in AI foundations, machine learning concepts, deep neural networks, and Oracle Cloud AI infrastructure.",
      issuer: "Oracle Corporation",
      status: "Verified ✓"
    },
    {
      icon: "🐍",
      badge: "Python & ML",
      badgeClass: "violet",
      title: "Certified Python & Machine Learning",
      desc: "Hands-on training in Python programming, data structures, scikit-learn models, data preprocessing, and model evaluation metrics.",
      issuer: "Mars Computer Academy",
      status: "Verified ✓"
    },
    {
      icon: "🧪",
      badge: "Software QA",
      badgeClass: "mint",
      title: "Software QA & Automation Testing",
      desc: "Manual and automated test suite design (Cypress, Postman), test case execution, regression testing, and defect logging.",
      issuer: "HITEC University CS Department",
      status: "Honor ★"
    },
    {
      icon: "☁️",
      badge: "AWS & Cloud",
      badgeClass: "amber",
      title: "AWS Cloud & Microservices Deployment",
      desc: "Building and verifying containerized serverless microservices on AWS ECS Fargate, Lambda, API Gateway, and Docker.",
      issuer: "Amazon Web Services / HITEC",
      status: "Verified ✓"
    }
  ];

  return (
    <section id="certifications" className="section-pad" data-screen-label="05 Certifications">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-tag">
              <span className="square" />
              05 / Credentials
            </div>
            <h2>
              Validated expertise &amp; <span className="gradient">certifications</span>
            </h2>
          </div>
          <div className="section-meta">Verified Cloud &amp; AI Credentials</div>
        </div>

        <div className="certs-grid">
          {certs.map((c, idx) => (
            <div key={idx} className={`cert-card reveal reveal-delay-${idx % 3}`}>
              <div className="cert-icon">{c.icon}</div>
              <div className={`cert-badge ${c.badgeClass}`}>{c.badge}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="cert-footer">
                <span className="cert-issuer">{c.issuer}</span>
                <span className="cert-status">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CertificationsSection;

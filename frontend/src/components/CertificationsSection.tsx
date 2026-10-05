export const CertificationsSection = () => {
  const certs = [
  {
    "icon": "🧠",
    "badge": "Oracle Cloud",
    "badgeClass": "",
    "title": "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    "desc": "AI and machine learning foundations.",
    "issuer": "Oracle University",
    "status": "Certification"
  },
  {
    "icon": "🐍",
    "badge": "Python & ML",
    "badgeClass": "violet",
    "title": "Certified Python & Machine Learning",
    "desc": "Python programming and machine learning training.",
    "issuer": "Mars Computer Academy",
    "status": "Certification"
  },
  {
    "icon": "🎮",
    "badge": "Product Management",
    "badgeClass": "mint",
    "title": "Electronic Arts Product Management Job Simulation",
    "desc": "Completed the Electronic Arts virtual job simulation in August 2025.",
    "issuer": "Forage",
    "status": "Job Simulation"
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
              Continued learning &amp; <span className="gradient">certifications</span>
            </h2>
          </div>
          <div className="section-meta">Certifications &amp; Professional Learning</div>
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

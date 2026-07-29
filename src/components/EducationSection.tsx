export const EducationSection = () => {
  const eduList = [
    {
      short: "BS SE",
      title: "Bachelor of Science in Software Engineering",
      inst: "HITEC University, Taxila — Department of Computer Science",
      period: "2022 - 2026",
      isActive: true,
      desc: "Relevant Coursework: Software Quality Assurance, Machine Learning, Cloud Computing, Web Engineering, Data Structures & Algorithms, Database Systems."
    },
    {
      short: "ICS",
      title: "Intermediate in Computer Science",
      inst: "KRL College, Kahuta",
      period: "2020 - 2022",
      isActive: false,
      desc: "Focus on Computer Science fundamentals, Mathematics, and Physics."
    },
    {
      short: "Matric",
      title: "Matriculation in Computer Science",
      inst: "Mumtaz Grammar School, Wazirabad",
      period: "2018 - 2020",
      isActive: false,
      desc: "Foundation in Computer Science and natural sciences."
    }
  ];

  return (
    <section id="education" className="section-pad" data-screen-label="06 Education">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-tag">
              <span className="square" />
              06 / Education
            </div>
            <h2>
              Formal training, <span className="gradient">always learning</span>
            </h2>
          </div>
          <div className="section-meta">2018 - 2026</div>
        </div>

        <div className="edu-grid">
          {eduList.map((edu, idx) => (
            <div key={idx} className={`edu-card ${edu.isActive ? "current" : ""} reveal reveal-delay-${idx}`}>
              <div className="edu-short">{edu.short}</div>
              <h3>{edu.title}</h3>
              <div className="inst">{edu.inst}</div>
              <div className="meta">
                <span>{edu.period}</span>
                <p className="mt-2 text-text-2 text-xs leading-relaxed">{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EducationSection;

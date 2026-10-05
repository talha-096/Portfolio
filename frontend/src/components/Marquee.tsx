export const Marquee = () => {
  const items = [
    "Software Engineer",
    "Python Backend",
    "QA Engineer",
    "Selenium",
    "PyTorch & Transformers",
    "FastAPI & Flask",
    "Cypress E2E",
    "Postman API QA",
    "React & Next.js",
    "Laravel 7 & PHP",
    "scikit-learn & SHAP",
    "PostgreSQL & MongoDB"
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`a-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
        {/* Seamless Duplicate Set */}
        {items.map((item, index) => (
          <span key={`b-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
export default Marquee;

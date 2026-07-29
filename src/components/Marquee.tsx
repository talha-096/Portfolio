export const Marquee = () => {
  const items = [
    "Python",
    "Cypress QA",
    "Postman API",
    "FastAPI",
    "React & Vite",
    "AWS Serverless",
    "Docker",
    "PyTorch",
    "scikit-learn",
    "Next.js 15",
    "Supabase",
    "TailwindCSS",
    "Streamlit"
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

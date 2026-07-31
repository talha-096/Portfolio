import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

export const Skills = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  return <Home />;
};
export default Skills;
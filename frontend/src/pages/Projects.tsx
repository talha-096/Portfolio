import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

export const Projects = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);

  return <Home />;
};
export default Projects;
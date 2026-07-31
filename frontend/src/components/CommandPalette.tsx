import { useEffect, useState } from "react";
import { Search, FileText, Code, Layers, User, Briefcase, GraduationCap, Award, Mail, Github, Linkedin, X } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { id: "about", title: "About & Hero Overview", tag: "Section", icon: <User className="w-4 h-4" />, action: () => scrollToSection("about") },
    { id: "skills", title: "Skills & Technical Toolkit", tag: "Section", icon: <Layers className="w-4 h-4" />, action: () => scrollToSection("skills") },
    { id: "experience", title: "Experience & Internships", tag: "Section", icon: <Briefcase className="w-4 h-4" />, action: () => scrollToSection("experience") },
    { id: "projects", title: "Selected Projects (GenMark, NLP, E-Commerce)", tag: "Section", icon: <Code className="w-4 h-4" />, action: () => scrollToSection("projects") },
    { id: "certifications", title: "Certifications & Credentials", tag: "Section", icon: <Award className="w-4 h-4" />, action: () => scrollToSection("certifications") },
    { id: "education", title: "Education & Degree", tag: "Section", icon: <GraduationCap className="w-4 h-4" />, action: () => scrollToSection("education") },
    { id: "contact", title: "Contact & Social Links", tag: "Section", icon: <Mail className="w-4 h-4" />, action: () => scrollToSection("contact") },
    { id: "cv-pdf", title: "Download Talha Ghafoor CV (PDF)", tag: "Action", icon: <FileText className="w-4 h-4" />, action: () => window.open("/CV.pdf", "_blank") },
    { id: "cv-docx", title: "Download Talha Ghafoor CV (Word DOCX)", tag: "Action", icon: <FileText className="w-4 h-4" />, action: () => window.open("/Talha_Ghafoor_CV_AIML.docx", "_blank") },
    { id: "github", title: "GitHub Profile (talha-096)", tag: "Link", icon: <Github className="w-4 h-4" />, action: () => window.open("https://github.com/talha-096", "_blank") },
    { id: "linkedin", title: "LinkedIn Profile (Talha Ghafoor)", tag: "Link", icon: <Linkedin className="w-4 h-4" />, action: () => window.open("https://www.linkedin.com/in/talha-ghafoor-475aa926a/", "_blank") }
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state trigger
        }
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter" && filteredItems[activeIndex]) {
        e.preventDefault();
        filteredItems[activeIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredItems, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`palette-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="palette-card" onClick={(e) => e.stopPropagation()}>
        <div className="palette-head">
          <Search className="w-5 h-5 text-cyan" />
          <input
            id="palette-search"
            type="text"
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="text-muted hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="palette-results">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-muted text-sm mono">No results matching "{query}"</div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`palette-item ${index === activeIndex ? "active" : ""}`}
                onClick={item.action}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="p-icon text-cyan">{item.icon}</div>
                <div className="p-title">{item.title}</div>
                <div className="p-tag">{item.tag}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default CommandPalette;

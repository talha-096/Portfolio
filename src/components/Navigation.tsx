import { useState, useEffect } from "react";
import { Command, Download, Menu, X, FileText } from "lucide-react";

interface NavigationProps {
  onOpenPalette: () => void;
}

export const Navigation = ({ onOpenPalette }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState("about");

  const navItems = [
    { id: "about", label: "about" },
    { id: "skills", label: "skills" },
    { id: "experience", label: "experience" },
    { id: "projects", label: "projects" },
    { id: "certifications", label: "certifications" },
    { id: "education", label: "education" },
    { id: "contact", label: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const mid = window.scrollY + window.innerHeight * 0.35;

      let current = "about";
      for (const s of sections) {
        if (s && s.offsetTop <= mid) {
          current = s.id;
        }
      }
      setActiveTarget(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("about");
            }}
            className="logo"
          >
            <span className="logo-mark">TG</span>
            <span>Talha Ghafoor</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeTarget === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="cmd-trigger-btn"
              onClick={onOpenPalette}
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="cmd-kbd">Ctrl K</kbd>
            </button>

            <a
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-cv"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
            </a>

            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                document.body.classList.toggle("menu-open", !mobileOpen);
              }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <nav className="mobile-menu-inner">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`m-link ${activeTarget === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                document.body.classList.remove("menu-open");
                scrollTo(item.id);
              }}
            >
              <span className="idx">0{idx + 1}</span>
              <span>{item.label}</span>
              <span className="m-arrow">→</span>
            </a>
          ))}
          <div className="m-channels">
            <a href="mailto:talhaghafoor096@gmail.com">talhaghafoor096@gmail.com</a>
            <a href="https://github.com/talha-096" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/talha-ghafoor-475aa926a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navigation;
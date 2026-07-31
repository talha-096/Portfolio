import { X, ExternalLink, Github } from "lucide-react";

export interface ProjectData {
  title: string;
  subtitle: string;
  category: string;
  metrics: Array<{ label: string; value: string }>;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
  markdownDetails?: string;
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const CaseStudyModal = ({ project, onClose }: CaseStudyModalProps) => {
  if (!project) return null;

  return (
    <div className={`modal-overlay ${project ? "open" : ""}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X className="w-6 h-6" />
        </button>

        <div className="modal-body">
          <div className="modal-subtitle">// CASE STUDY EXPLORER</div>
          <h2>{project.title}</h2>
          <div className="text-cyan text-sm mono mb-6">{project.subtitle}</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-xl bg-panel border border-line mb-6">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] sm:text-xs text-muted mono uppercase">{m.label}</span>
                <span className="text-base sm:text-lg font-bold text-cyan">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="modal-section">
            <h4>Overview &amp; Purpose</h4>
            <p>{project.description}</p>
          </div>

          <div className="modal-section">
            <h4>Key Features &amp; SQA Verification</h4>
            <ul className="list-disc ml-5 space-y-1 text-xs sm:text-sm text-text-2">
              {project.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h4>Technology Stack</h4>
            <div className="modal-tech-pills">
              {project.tech.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-line">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-xs sm:text-sm py-2.5 px-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Github className="w-4 h-4" />
                View Code on GitHub
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-xs sm:text-sm py-2.5 px-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Live Product Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CaseStudyModal;

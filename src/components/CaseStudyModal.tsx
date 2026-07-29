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

          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-panel border border-line mb-6">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xs text-muted mono uppercase">{m.label}</span>
                <span className="text-lg font-bold text-cyan">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="modal-section">
            <h4>Overview &amp; Purpose</h4>
            <p>{project.description}</p>
          </div>

          <div className="modal-section">
            <h4>Key Features &amp; SQA Verification</h4>
            <ul className="list-disc ml-5 space-y-1 text-sm text-text-2">
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

          <div className="flex gap-4 mt-8 pt-6 border-t border-line">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-sm py-2 px-4 inline-flex items-center gap-2"
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
                className="btn btn-primary text-sm py-2 px-4 inline-flex items-center gap-2"
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

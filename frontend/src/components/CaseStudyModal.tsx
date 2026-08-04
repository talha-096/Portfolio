import React, { useState, useEffect } from "react";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";

export interface ProjectData {
  id?: string;
  title: string;
  subtitle: string;
  category: string;
  metrics: Array<{ label: string; value: string }>;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
  img?: string;
  images?: string[];
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

const IMAGE_CAPTIONS: Record<string, string[]> = {
  ecommerce: [
    "🏠 Homepage & Hero Banner",
    "ℹ️ About Us Page",
    "🛒 Product Catalog & Shop Grid",
    "🛍️ Product View & Shop List"
  ],
  genmark: [
    "Dashboard Overview",
    "AI Brand Kit & Context Builder",
    "Multi-Modal Content Generation",
    "Cypress E2E Automation Suite",
    "Postman API Contract Testing"
  ],
  nlp: [
    "📊 Classification Metrics by Class",
    "🟢 Normalized Confusion Matrix (%)",
    "📈 Confusion Matrix Counts",
    "🔍 SHAP Feature Importance (Top 15)",
    "💡 SHAP Waterfall Plot (Why Anxious?)"
  ]
};

export const CaseStudyModal = ({ project, onClose }: CaseStudyModalProps) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project]);

  if (!project) return null;

  const projectImages = project.images && project.images.length > 0
    ? project.images
    : project.img
    ? [project.img]
    : [];

  const captions = project.id && IMAGE_CAPTIONS[project.id]
    ? IMAGE_CAPTIONS[project.id]
    : projectImages.map((_, i) => `Application Screenshot #${i + 1}`);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };

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

          {/* Interactive Image Gallery Carousel */}
          {projectImages.length > 0 && (
            <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-bg-2 border border-line">
              <div className="flex justify-between items-center mb-3 px-1 text-xs mono">
                <span className="flex items-center gap-2 text-text font-semibold text-xs sm:text-sm">
                  <ImageIcon className="w-4 h-4 text-cyan" />
                  {captions[activeImgIndex] || `Screenshot #${activeImgIndex + 1}`}
                </span>
                <span className="text-cyan bg-panel px-3 py-1 rounded-full border border-line font-bold">
                  {activeImgIndex + 1} / {projectImages.length}
                </span>
              </div>

              {/* Main Image View */}
              <div className="relative group rounded-xl overflow-hidden border border-line bg-black/40 min-h-[240px] sm:min-h-[340px] flex items-center justify-center">
                <img
                  src={projectImages[activeImgIndex]}
                  alt={`${project.title} screenshot ${activeImgIndex + 1}`}
                  className="w-full h-auto max-h-[420px] object-contain transition-all duration-300"
                />

                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 text-white hover:bg-cyan hover:text-black transition-all shadow-xl backdrop-blur-md cursor-pointer z-10"
                      aria-label="Previous screenshot"
                      title="Previous Picture"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 text-white hover:bg-cyan hover:text-black transition-all shadow-xl backdrop-blur-md cursor-pointer z-10"
                      aria-label="Next screenshot"
                      title="Next Picture"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <a
                  href={projectImages[activeImgIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/80 text-white/90 hover:text-white hover:bg-black transition-all text-xs font-mono flex items-center gap-1.5 shadow-md"
                  title="Open full image in new tab"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </a>
              </div>

              {/* Interactive Thumbnails Selection Bar */}
              {projectImages.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {projectImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-black/40 text-left cursor-pointer ${
                        activeImgIndex === idx
                          ? "border-cyan ring-2 ring-cyan/40 scale-[1.02]"
                          : "border-line opacity-60 hover:opacity-100 hover:border-line-2"
                      }`}
                    >
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/60">
                        <img
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-1 flex justify-between items-center px-1 text-[10px] font-mono text-muted">
                        <span className="truncate max-w-[80px]">
                          {captions[idx] ? captions[idx].replace(/^[^\w\s]+/, "").trim() : `Pic ${idx + 1}`}
                        </span>
                        <span className="text-cyan font-bold">#{idx + 1}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Metrics */}
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
            <h4>Key Features &amp; Capabilities</h4>
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

export type ProjectCategory = "Web Apps" | "AI / ML" | "Tools" | "Open Source";

export interface Project {
  id: string;
  name: string;
  oneliner: string;
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  tags: [string, string, string];
  image: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "genmark",
    name: "GenMark",
    oneliner:
      "Multi-Modal AI Marketing Content Platform — Final-Year Project using LLMs, Flask, and React.",
    liveUrl: "https://gen-mark-kappa.vercel.app/",
    githubUrl: "https://github.com/talha-096/GenMark",
    category: "AI / ML",
    tags: ["GenAI", "Flask", "SQA"],
    image: "/projects/genmark/media__1782301041222.png",
    featured: true,
  },
  {
    id: "nlp-mental-health",
    name: "Mental Health Classifier",
    oneliner:
      "Hybrid Transformer-based classification of mental health posts using RoBERTa and SHAP.",
    liveUrl: "#",
    githubUrl: "https://github.com/talha-096/NLP-Mental-Health-Classification-System",
    category: "AI / ML",
    tags: ["NLP", "PyTorch", "RoBERTa"],
    image: "/projects/nlp/classification-metrics.jpg",
    featured: true,
  },
  {
    id: "ecommerce",
    name: "E-Commerce App",
    oneliner:
      "Full-featured online shopping platform for the Pakistani market built with Laravel.",
    liveUrl: "#",
    githubUrl: "https://github.com/talha-096/Ecommerce-Project",
    category: "Web Apps",
    tags: ["PHP", "Laravel", "Full-Stack"],
    image: "/projects/ecommerce/homepage.png",
  },
  {
    id: "keythm",
    name: "Keythm",
    oneliner:
      "Mechanical typing speed app with Web Audio API and real-time analytics.",
    liveUrl: "#",
    githubUrl: "https://github.com/talha-096/Keythm",
    category: "Web Apps",
    tags: ["Next.js 16", "React 19", "Web Audio"],
    image: "/projects/keythm/keythm.png",
  },
];

export const FILTERS: { label: string; value: ProjectCategory | "All" }[] = [
  { label: "All Projects", value: "All" },
  { label: "Web Apps", value: "Web Apps" },
  { label: "AI / ML", value: "AI / ML" },
  { label: "Tools", value: "Tools" },
  { label: "Open Source", value: "Open Source" },
];

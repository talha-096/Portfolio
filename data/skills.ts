import type { ComponentType } from "react";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiWordpress,
} from "react-icons/si";
import { Bot, Brain, DatabaseZap, Layout, Search } from "lucide-react";

export type SkillCategory =
  | "Programming"
  | "Frontend"
  | "Backend"
  | "API"
  | "AI"
  | "Data"
  | "Developer Tools"
  | "Operating Systems"
  | "Databases"
  | "DevOps"
  | "Architecture"
  | "CMS";

export interface Skill {
  id: string;
  name: string;
  percent: number;
  category: SkillCategory;
  Icon: ComponentType<{ className?: string }>;
  iconColor: string;
  featured?: boolean;
}

export const SKILLS: Skill[] = [
  { id: "python", name: "Python", percent: 90, category: "Programming", Icon: SiPython, iconColor: "#3776AB", featured: true },
  { id: "nextjs", name: "Next.js", percent: 80, category: "Frontend", Icon: SiNextdotjs, iconColor: "#ffffff", featured: true },
  { id: "react", name: "React", percent: 80, category: "Frontend", Icon: SiReact, iconColor: "#61DAFB", featured: true },
  { id: "tailwind", name: "Tailwind CSS", percent: 85, category: "Frontend", Icon: SiTailwindcss, iconColor: "#38BDF8", featured: true },
  { id: "flask", name: "Flask", percent: 85, category: "Backend", Icon: SiFastapi, iconColor: "#009688", featured: true },
  { id: "pytorch", name: "PyTorch", percent: 75, category: "AI", Icon: Brain, iconColor: "#ee4c2c" },
  { id: "scikitlearn", name: "scikit-learn", percent: 80, category: "AI", Icon: Bot, iconColor: "#f89b2d" },
  { id: "mongodb", name: "MongoDB", percent: 75, category: "Databases", Icon: DatabaseZap, iconColor: "#47A248" },
  { id: "docker", name: "Docker", percent: 70, category: "DevOps", Icon: SiDocker, iconColor: "#2496ED" },
  { id: "git", name: "Git", percent: 90, category: "Developer Tools", Icon: SiGit, iconColor: "#F05032", featured: true },
  { id: "wordpress", name: "WordPress", percent: 85, category: "CMS", Icon: SiWordpress, iconColor: "#21759b", featured: true },
  { id: "elementor", name: "Elementor", percent: 80, category: "CMS", Icon: Layout, iconColor: "#E31B6D" },
  { id: "laravel", name: "Laravel", percent: 70, category: "Backend", Icon: SiFastapi, iconColor: "#ff2d20" },
  { id: "seo", name: "SEO", percent: 80, category: "Frontend", Icon: Search, iconColor: "#4caf50" },
];

export const SKILL_FILTERS: { label: string; value: SkillCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Programming", value: "Programming" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "API", value: "API" },
  { label: "AI", value: "AI" },
  { label: "Data", value: "Data" },
  { label: "Developer Tools", value: "Developer Tools" },
  { label: "Operating Systems", value: "Operating Systems" },
  { label: "Databases", value: "Databases" },
  { label: "DevOps", value: "DevOps" },
  { label: "Architecture", value: "Architecture" },
  { label: "CMS", value: "CMS" },
];

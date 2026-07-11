import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Database, Palette, Cpu, BarChart3, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import AIChat from "@/components/AIChat";

const Skills = () => {
  const skillCategories = [
    {
      title: "Machine Learning & AI",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        { name: "Python", level: 90 },
        { name: "scikit-learn", level: 88 },
        { name: "NLP", level: 85 },
        { name: "Computer Vision", level: 85 },
        { name: "HuggingFace", level: 80 },
        { name: "OpenCV", level: 82 }
      ]
    },
    {
      title: "Quality Assurance & Testing",
      icon: <ShieldCheck className="h-6 w-6" />,
      skills: [
        { name: "Manual & Exploratory Testing", level: 90 },
        { name: "Cypress (E2E Automation)", level: 88 },
        { name: "API Testing (Postman)", level: 88 },
        { name: "Regression Testing", level: 85 },
        { name: "AI-Assisted Test Automation", level: 80 },
        { name: "Model & Data Evaluation", level: 85 }
      ]
    },
    {
      title: "Web Development",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "React", level: 92 },
        { name: "FastAPI", level: 88 },
        { name: "Laravel / PHP", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "REST APIs", level: 90 }
      ]
    },
    {
      title: "Data & Core",
      icon: <BarChart3 className="h-6 w-6" />,
      skills: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 82 },
        { name: "MySQL", level: 85 },
        { name: "Java", level: 75 },
        { name: "C++", level: 70 },
        { name: "Dart", level: 65 }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "AWS (ECS, Lambda, S3)", level: 85 },
        { name: "Docker", level: 88 },
        { name: "Oracle Cloud (OCI)", level: 80 },
        { name: "Git & GitHub", level: 90 },
        { name: "Supabase", level: 85 },
        { name: "API Gateway", level: 82 }
      ]
    }
  ];

  const tools = [
    "Cypress", "Postman", "Git", "GitHub", "Docker", "AWS (ECS, Lambda, S3, API Gateway)",
    "Oracle Cloud Infrastructure", "Supabase", "VS Code", "Jupyter Notebook"
  ];

  const certifications = [
    {
      name: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
      issuer: "Oracle University",
      year: "August 2025"
    },
    {
      name: "Certified Python & Machine Learning",
      issuer: "Mars Computer Academy, Islamabad",
      year: "2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mountain">
      <FloatingElements />
      <Navigation />
      <AIChat />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">
              Skills & Expertise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and professional competencies
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => {
              const isLastOdd = categoryIndex === skillCategories.length - 1 && skillCategories.length % 2 !== 0;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className={isLastOdd ? "md:col-span-2" : ""}
                >
                  <Card className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold hero-text">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress 
                            value={skill.level} 
                            className="h-2 bg-secondary/50"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <Card className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold hero-text">Tools & Technologies</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-secondary/50 hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                    >
                      {tool}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Card className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold hero-text">Certifications</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="p-4 rounded-lg bg-secondary/30 border border-primary/20"
                  >
                    <h4 className="font-semibold mb-2">{cert.name}</h4>
                    <p className="text-primary text-sm mb-1">{cert.issuer}</p>
                    <p className="text-muted-foreground text-sm">{cert.year}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
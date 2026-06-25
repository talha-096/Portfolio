import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github, Brain, Sparkles, Database, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import AIChat from "@/components/AIChat";
import { projectsData as projects } from "@/data/projectsData";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full bg-background/50">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Machine Learning", "Generative AI", "Full-Stack Development"];

  const filteredProjects = projects.filter(p => activeCategory === "All" || p.category === activeCategory);
  const featuredProjects = filteredProjects.filter(p => p.featured);

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
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore my portfolio of innovative projects spanning AI, web development, and data science
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-gradient-primary glow-effect transition-all" : "border-primary/50 hover:bg-primary/10 transition-all"}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold hero-text">Featured Projects</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      layout
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="glass-card overflow-hidden hover:shadow-glow transition-all duration-300 group cursor-pointer">
                        <div className="aspect-video bg-gradient-secondary flex items-center justify-center relative overflow-hidden">
                          {project.images && project.images.length > 0 ? (
                            <ImageCarousel images={project.images} />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-primary opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                              <div className="text-6xl text-primary/50 group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            {project.icon}
                            <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                              {project.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-3 hero-text">{project.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech: string) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <Button variant="outline" size="sm" className="w-full">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </Button>
                            </a>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <Button size="sm" className="w-full bg-gradient-primary">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </Button>
                            </a>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold hero-text mb-2 flex items-center gap-2">
                          {project.icon} {project.title}
                        </DialogTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/20">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </DialogHeader>
                      <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 max-w-none mt-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {project.markdownDetails || project.description}
                        </ReactMarkdown>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* All Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                <Code className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold hero-text">All Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="glass-card overflow-hidden hover:shadow-glow transition-all duration-300 group h-full flex flex-col cursor-pointer">
                        <div className="aspect-video bg-gradient-secondary flex items-center justify-center relative overflow-hidden">
                          {project.images && project.images.length > 0 ? (
                            <ImageCarousel images={project.images} />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-primary opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                              <div className="text-4xl text-primary/50 group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs bg-secondary/50">
                              {project.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold mb-2 hero-text">{project.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 flex-1 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex gap-2 mt-auto">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <Button variant="outline" size="sm" className="w-full text-xs">
                                <Github className="h-3 w-3 mr-1" />
                                Code
                              </Button>
                            </a>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={(e) => e.stopPropagation()}>
                              <Button size="sm" className="w-full bg-gradient-primary text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Demo
                              </Button>
                            </a>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold hero-text mb-2 flex items-center gap-2">
                          {project.icon} {project.title}
                        </DialogTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/20">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </DialogHeader>
                      <div className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 max-w-none mt-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {project.markdownDetails || project.description}
                        </ReactMarkdown>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
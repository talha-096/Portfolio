import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Award, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import AIChat from "@/components/AIChat";

const About = () => {
  const achievements = [
    "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    "Certified Python & Machine Learning (Mars Computer Academy)"
  ];

  const experience = [
    {
      role: "AI and Machine Learning Engineering Intern",
      company: "Digital Empowerment Network",
      period: "July 2025 – September 2025",
      points: [
        "Built a mental health detection model using TF-IDF and Logistic Regression on unstructured text data, achieving approximately 84% F1-score after iterative feature engineering and threshold tuning.",
        "Developed a heart disease detection pipeline; applied SMOTE to address class imbalance in clinical datasets, improving minority-class recall from approximately 71% to 83%.",
        "Delivered end-of-internship evaluation reports covering accuracy, precision, recall, and AUC-ROC scores to the supervising engineering team."
      ]
    },
    {
      role: "AI and Machine Learning Engineering Intern",
      company: "DevelopersHub Corporation",
      period: "June 2025 – July 2025",
      points: [
        "Trained a CNN-based image classifier achieving approximately 89% validation accuracy through architecture tuning and data augmentation on a dataset of around 6,000 images.",
        "Cleaned, labeled, and augmented training data to reduce overfitting and improve generalization across unseen test samples.",
        "Documented model performance across training runs and submitted structured weekly progress reports."
      ]
    }
  ];

  const interests = [
    "Artificial Intelligence", "Machine Learning", "Data Science", 
    "Frontend Development", "Gen AI", "Research", "Innovation", "Technology"
  ];

  return (
    <div className="min-h-screen bg-gradient-mountain">
      <FloatingElements />
      <Navigation />
      <AIChat />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover my journey, passion, and vision for the future of technology
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div 
                  className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/50 glow-effect"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <User className="w-24 h-24 text-muted-foreground" />
                  </div>
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-4 hero-text">Talha Ghafoor</h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    I'm a Software Engineer focused on AI systems, NLP, and cloud-native ML deployment. 
                    I have strong experience building full-stack AI applications using Python, FastAPI, React, Docker, and AWS. 
                    My passion lies in ML pipeline development, serverless infrastructure, and end-to-end product engineering.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>HITEC University</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>2022 - 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Pakistan</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center md:justify-start">
                    <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download / View CV
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 hero-text flex items-center gap-3">
                <GraduationCap className="h-6 w-6" />
                Education
              </h3>
              <div className="space-y-6">
                <motion.div 
                  className="border-l-4 border-primary pl-6 mb-8"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-2">BS Software Engineering</h4>
                  <p className="text-primary font-medium mb-2">HITEC University, Taxila – Department of Computer Science</p>
                  <p className="text-muted-foreground mb-3">2022 - 2026</p>
                  <p className="leading-relaxed">
                    Relevant Coursework: Machine Learning, Cloud Computing, Web Engineering, Software Quality Assurance, Data Structures & Algorithms, Database Systems.
                  </p>
                </motion.div>

                <motion.div 
                  className="border-l-4 border-primary pl-6 mb-8"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-2">Intermediate – ICS (Computer Science)</h4>
                  <p className="text-primary font-medium mb-2">KRL College, Kahuta</p>
                  <p className="text-muted-foreground mb-3">2020 - 2022</p>
                </motion.div>

                <motion.div 
                  className="border-l-4 border-primary pl-6"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold mb-2">Matriculation – Computer Science</h4>
                  <p className="text-primary font-medium mb-2">Mumtaz Grammar School, Wazirabad</p>
                  <p className="text-muted-foreground mb-3">2018 - 2020</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 hero-text flex items-center gap-3">
                <Award className="h-6 w-6" />
                Professional Experience
              </h3>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <motion.div 
                    key={index}
                    className="border-l-4 border-primary pl-6"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-xl font-semibold mb-1">{exp.role}</h4>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mb-4">{exp.period}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc ml-4">
                      {exp.points.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 hero-text flex items-center gap-3">
                <Award className="h-6 w-6" />
                Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-primary/20 hover:bg-primary/10 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 animate-pulse" />
                    <span>{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="glass-card p-8 hover:shadow-glow transition-all duration-500">
              <h3 className="text-2xl font-bold mb-6 hero-text">Interests & Passions</h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-4 py-2 text-sm bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 cursor-default"
                    >
                      {interest}
                    </Badge>
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

export default About;
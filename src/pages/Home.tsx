import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Instagram, Mail, Download } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import AIChat from "@/components/AIChat";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import TechCloud from "@/components/TechCloud";

const Home = () => {
  const socialLinks = [
    { 
      icon: <Github className="h-6 w-6" />, 
      url: "https://github.com/talha-096",
      label: "GitHub"
    },
    { 
      icon: <Linkedin className="h-6 w-6" />, 
      url: "https://www.linkedin.com/in/talha-ghafoor-475aa926a/",
      label: "LinkedIn"
    },
    { 
      icon: <Instagram className="h-6 w-6" />, 
      url: "https://www.instagram.com/talha_9.91/",
      label: "Instagram"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-mountain relative overflow-hidden">
      <Scene3D />
      <FloatingElements />
      <Navigation />
      <AIChat />
      <TechCloud />
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-28 pb-32">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 hero-text"
              animate={{ 
                y: [0, -10, 0],
                textShadow: [
                  "0 0 20px hsl(var(--primary) / 0.5)",
                  "0 0 40px hsl(var(--primary) / 0.8)",
                  "0 0 20px hsl(var(--primary) / 0.5)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Welcome to My Universe
            </motion.h1>
            <div className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed h-[80px] flex flex-col items-center justify-center">
              <div>
                I'm <motion.span 
                  className="hero-text font-semibold inline-block"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    color: [
                      "hsl(var(--primary))",
                      "hsl(var(--primary-glow))",
                      "hsl(var(--primary))"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  Talha Ghafoor
                </motion.span>,
              </div>
              <TypeAnimation
                sequence={[
                  'a passionate Software Engineer',
                  2000,
                  'building AI-driven applications',
                  2000,
                  'crafting modern web experiences',
                  2000,
                  'exploring the limits of ML',
                  2000
                ]}
                wrapper="div"
                speed={50}
                className="text-primary/90 font-medium mt-2"
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12 w-full max-w-[280px] sm:max-w-none mx-auto relative z-20"
          >
            <Link to="/about" className="w-full sm:w-auto block">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.3)",
                    "0 0 40px hsl(var(--primary) / 0.6)",
                    "0 0 20px hsl(var(--primary) / 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg">
                  Explore My Journey
                </Button>
              </motion.div>
            </Link>
            <Link to="/projects" className="w-full sm:w-auto block">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  borderColor: [
                    "hsl(var(--primary) / 0.5)",
                    "hsl(var(--primary) / 0.8)",
                    "hsl(var(--primary) / 0.5)"
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10 px-8 py-3 text-lg">
                  View Projects
                </Button>
              </motion.div>
            </Link>
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  borderColor: [
                    "hsl(var(--primary) / 0.5)",
                    "hsl(var(--primary) / 0.8)",
                    "hsl(var(--primary) / 0.5)"
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10 px-8 py-3 text-lg flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download / View CV
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/20 hover:scale-110 transition-all duration-300 w-12 h-12"
                  aria-label={social.label}
                >
                  {social.icon}
                </Button>
              </motion.a>
            ))}
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-primary/20 hover:scale-110 transition-all duration-300 w-12 h-12"
                  aria-label="Contact"
                >
                  <Mail className="h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <Link to="/about" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
          <p className="text-sm">Scroll to explore</p>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Link>
      </motion.div>

      {/* Animated Background Mountain Image */}
      <motion.div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          filter: 'blur(1px)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Animated Background Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/10"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Home;
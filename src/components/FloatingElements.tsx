import { motion } from "framer-motion";
import { Code, Brain, Database, Sparkles, Zap, Cpu } from "lucide-react";

const FloatingElements = () => {
  const elements = [
    { icon: <Code className="h-6 w-6" />, delay: 0, duration: 8 },
    { icon: <Brain className="h-5 w-5" />, delay: 1, duration: 10 },
    { icon: <Database className="h-4 w-4" />, delay: 2, duration: 12 },
    { icon: <Sparkles className="h-6 w-6" />, delay: 3, duration: 9 },
    { icon: <Zap className="h-5 w-5" />, delay: 4, duration: 11 },
    { icon: <Cpu className="h-4 w-4" />, delay: 5, duration: 7 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0.5
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0, 0.8, 0.4, 0],
            rotate: [0, 180, 360, 540, 720],
            scale: [0.5, 1.2, 0.8, 1.5, 0.5]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
      
      {/* Enhanced Particle Effects */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10
          }}
          animate={{
            y: -10,
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            opacity: [0, 1, 0.5, 0],
            scale: [0.5, 1, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Floating Orbs */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute w-3 h-3 bg-gradient-primary rounded-full blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0, 0.6, 0.3, 0],
            scale: [0.8, 1.5, 1, 0.8]
          }}
          transition={{
            duration: Math.random() * 12 + 6,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
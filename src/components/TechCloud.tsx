import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Server, Cpu, Cloud, Brain, Container, Terminal } from "lucide-react";

const icons = [
  { icon: <Code2 />, color: "text-[#61DAFB]", label: "React" },
  { icon: <Cpu />, color: "text-[#3776AB]", label: "Python" },
  { icon: <Container />, color: "text-[#2496ED]", label: "Docker" },
  { icon: <Cloud />, color: "text-[#FF9900]", label: "AWS" },
  { icon: <Brain />, color: "text-[#EE4C2C]", label: "PyTorch" },
  { icon: <Terminal />, color: "text-[#009688]", label: "FastAPI" },
  { icon: <Database />, color: "text-[#47A248]", label: "MongoDB" },
  { icon: <Server />, color: "text-[#339933]", label: "Node.js" },
];

const TechCloud = () => {
  const radiusX = typeof window !== 'undefined' && window.innerWidth > 1024 ? 500 : 380;
  const radiusY = typeof window !== 'undefined' && window.innerWidth > 1024 ? 280 : 220;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 hidden md:flex">
      <motion.div 
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((item, index) => {
          const angle = (index / icons.length) * Math.PI * 2;
          
          return (
            <motion.div
              key={index}
              className={`absolute flex flex-col items-center justify-center ${item.color}`}
              style={{
                x: Math.cos(angle) * radiusX, 
                y: Math.sin(angle) * radiusY,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: 1,
                rotate: -360 
              }}
              transition={{
                opacity: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1 },
                rotate: { duration: 50, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background/70 backdrop-blur-lg border border-primary/40 rounded-full flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.6)]">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 sm:w-10 sm:h-10" })}
              </div>
              <span className="mt-4 text-base md:text-lg font-extrabold text-white tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{item.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechCloud;

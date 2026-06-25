import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" }
  ];

  const socialLinks = [
    { 
      icon: <Github className="h-4 w-4" />, 
      url: "https://github.com/",
      label: "GitHub"
    },
    { 
      icon: <Linkedin className="h-4 w-4" />, 
      url: "https://www.linkedin.com/in/talha-ghafoor-475aa926a",
      label: "LinkedIn"
    },
    { 
      icon: <Instagram className="h-4 w-4" />, 
      url: "https://www.instagram.com/talha_9.91/",
      label: "Instagram"
    }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card m-4 rounded-2xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hero-text">
            Talha Ghafoor
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    location.pathname === item.path 
                      ? "bg-gradient-primary text-primary-foreground glow-effect" 
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-primary rounded-md"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
            
            {/* Social Links */}
            <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-border/20">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Button>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden flex flex-col space-y-2 mt-4 pt-4 border-t border-border/20"
            >
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className={`w-full justify-start text-left ${
                      location.pathname === item.path 
                        ? "bg-gradient-primary text-primary-foreground glow-effect" 
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <div className="flex items-center space-x-2 pt-2 pb-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-primary/20 hover:text-primary transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Button>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
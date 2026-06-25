import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import FloatingElements from "@/components/FloatingElements";
import AIChat from "@/components/AIChat";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Message sent successfully! I'll get back to you soon.", {
      description: "Thank you for reaching out to me."
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "talhaghafoor84@gmail.com",
      link: "mailto:talhaghafoor84@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+92 349 9675845",
      link: "tel:+923499675845"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Islamabad, Pakistan",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      value: "@talha-096",
      link: "https://github.com/talha-096"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "Talha Ghafoor",
      link: "https://www.linkedin.com/in/talha-ghafoor-475aa926a/"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: "Instagram",
      value: "@talha_9.91",
      link: "https://www.instagram.com/talha_9.91/"
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
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's collaborate on something amazing! I'm always open to discussing new opportunities and innovative projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                    <Send className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold hero-text">Send Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-secondary/30 border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-secondary/30 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="bg-secondary/30 border-primary/20 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      placeholder="Tell me more about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      className="bg-secondary/30 border-primary/20 focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 py-3">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Contact Details */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6 hero-text">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-primary/20 hover:bg-primary/10 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card>

              {/* Social Links */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6 hero-text">Follow Me</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.title}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-primary/20 hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 group"
                    >
                      <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary-foreground/20 group-hover:scale-110 transition-all duration-300">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-medium">{social.title}</p>
                        <p className="text-sm opacity-80">{social.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </Card>

              {/* Availability */}
              <Card className="glass-card p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="font-bold mb-2 hero-text">Available for Work</h3>
                  <p className="text-sm text-muted-foreground">
                    I'm currently looking for new opportunities and exciting projects to work on.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
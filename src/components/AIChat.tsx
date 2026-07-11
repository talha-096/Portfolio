import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Talha's AI assistant. I can tell you about his skills, projects, experience, or anything else you'd like to know!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("qa") || lowerMessage.includes("test")) {
      return "Talha has strong expertise in Software Quality Assurance (Cypress E2E automation, Postman API testing, manual test case design, regression testing) and applied AI/ML engineering (Python, NLP, Computer Vision, model evaluation). He also has full-stack skills in React, FastAPI, Laravel, AWS, and Docker.";
    }
    
    if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      return "Talha has built and verified several key projects: 1) GenMark (FYP), a multi-modal AI generation platform validated with Cypress and Postman automated suites; 2) Multi-Vendor E-Commerce, manually tested for checkout flows and Stripe webhooks; and 3) NLP Mental Health Detection, evaluated rigorously with SMOTE and regression verification.";
    }
    
    if (lowerMessage.includes("education") || lowerMessage.includes("university") || lowerMessage.includes("study")) {
      return "Talha is currently pursuing his Bachelor's in Software Engineering at HITEC University (2022-2026). His coursework includes Software Quality Assurance, Machine Learning, Cloud Computing, and Web Engineering.";
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("hire") || lowerMessage.includes("work together") || lowerMessage.includes("email")) {
      return "You can reach Talha at talhaghafoor84@gmail.com or connect with him on LinkedIn at linkedin.com/in/talha-ghafoor-475aa926a. He is currently seeking QA Engineer or AI/ML Engineer roles!";
    }
    
    if (lowerMessage.includes("experience") || lowerMessage.includes("background") || lowerMessage.includes("intern")) {
      return "Talha's experience includes AI/ML Internships at Digital Empowerment Network (testing classification models, using SMOTE to resolve defects) and DevelopersHub Corporation (performing CNN validation and data quality testing). He has also earned the OCI Certified AI Foundations Associate credential.";
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Great to meet you! I'm here to tell you all about Talha Ghafoor - his skills in software QA, machine learning, projects, and achievements. What would you like to know?";
    }
    
    return "That's an interesting question! Talha is a Software Engineering student specializing in Quality Assurance & Testing and applied AI/ML. Feel free to ask about his skills, projects, experience, or certifications!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300 pulse-animation"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50"
          >
            <Card className="glass-card h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border/20 bg-gradient-primary rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">AI Assistant</h3>
                    <p className="text-xs text-primary-foreground/80">Ask me about Talha!</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {message.isUser ? (
                          <User className="h-3 w-3 text-primary-foreground" />
                        ) : (
                          <Bot className="h-3 w-3 text-secondary-foreground" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary/50 text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2 max-w-[80%]">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-secondary-foreground" />
                      </div>
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/20">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Talha..."
                    className="flex-1 bg-secondary/30 border-primary/20 focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
import { useState } from "react";
import { Server, Cpu, Database, ShieldCheck, Cloud, Globe, ArrowRight } from "lucide-react";

export const ArchitectureVisualizer = () => {
  const [activeArch, setActiveArch] = useState<"genmark" | "ecommerce">("genmark");
  const [selectedNode, setSelectedNode] = useState<string>("fargate");

  const archs = {
    genmark: {
      title: "GenMark Multi-Modal AI Platform Architecture",
      desc: "Decoupled serverless AI inference infrastructure on AWS with on-demand model lazy loading verified via Cypress & Postman suites.",
      nodes: [
        {
          id: "frontend",
          icon: <Globe className="w-5 h-5 text-cyan" />,
          title: "React & Vite Frontend",
          badge: "Client Layer",
          detail: "React SPA deployed on Vercel with real-time image preview, brand kit state management, and Cypress automated E2E test coverage."
        },
        {
          id: "apigateway",
          icon: <ShieldCheck className="w-5 h-5 text-violet" />,
          title: "AWS API Gateway",
          badge: "Security & Router",
          detail: "REST API Gateway enforcing JWT bearer token authentication, request rate limiting, and CORS routing."
        },
        {
          id: "fargate",
          icon: <Cpu className="w-5 h-5 text-amber" />,
          title: "AWS ECS Fargate & Lambda",
          badge: "AI Inference Engine",
          detail: "On-demand containerized Python & FastAPI microservices lazy-loading LLM and vision models into GPU memory upon user prompt invocation."
        },
        {
          id: "storage",
          icon: <Database className="w-5 h-5 text-mint" />,
          title: "AWS S3 & MongoDB Atlas",
          badge: "Data & Asset Layer",
          detail: "AWS S3 storage buckets storing generated visual marketing assets and MongoDB Atlas preserving project telemetry & user brand kits."
        }
      ]
    },
    ecommerce: {
      title: "E-Commerce Architecture (Laravel 7)",
      desc: "Full-stack PHP Laravel 7 architecture with SQLite/MySQL database, Bootstrap 4 frontend, localized Pakistani shipping logic, and Cash on Delivery (COD) checkout.",
      nodes: [
        {
          id: "laravel",
          icon: <Server className="w-5 h-5 text-cyan" />,
          title: "Laravel 7 Backend Framework",
          badge: "MVC Core",
          detail: "PHP 7/8 MVC framework managing authentication, order tracking, coupon calculations, and PDF invoice generation."
        },
        {
          id: "database",
          icon: <Database className="w-5 h-5 text-mint" />,
          title: "SQLite / MySQL Database",
          badge: "Relational Storage",
          detail: "Relational database schema managing users, products, categories, subcategories, tags, carts, wishlist, and orders."
        },
        {
          id: "bootstrap",
          icon: <Globe className="w-5 h-5 text-violet" />,
          title: "Bootstrap 4 & HTML5/CSS3",
          badge: "Responsive UI",
          detail: "Responsive e-commerce storefront with live search, price range filter, cart modal, and shop grid/list views."
        },
        {
          id: "shipping",
          icon: <ShieldCheck className="w-5 h-5 text-amber" />,
          title: "Pakistani Shipping & COD Engine",
          badge: "Localized Checkout",
          detail: "City-tailored shipping rate matrix for Pakistani cities (Islamabad, Rawalpindi, Lahore, Karachi) with Cash on Delivery (COD) processing."
        }
      ]
    }
  };

  const currentArch = archs[activeArch];
  const currentNodeDetail = currentArch.nodes.find((n) => n.id === selectedNode) || currentArch.nodes[0];

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-line bg-panel reveal mb-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2 text-amber font-mono text-xs uppercase mb-1">
            <Cloud className="w-4 h-4" />
            <span>// DECOUPLED CLOUD SYSTEM DESIGN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-text">Interactive AWS &amp; System Architecture Visualizer</h3>
        </div>

        <div className="grid grid-cols-1 sm:flex gap-2 w-full lg:w-auto">
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all text-center ${activeArch === "genmark" ? "bg-amber/20 border border-amber text-amber font-semibold" : "bg-panel border border-line text-muted hover:text-text"
              }`}
            onClick={() => { setActiveArch("genmark"); setSelectedNode("fargate"); }}
          >
            GenMark (AWS Serverless)
          </button>
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all text-center ${activeArch === "ecommerce" ? "bg-cyan/20 border border-cyan text-cyan font-semibold" : "bg-panel border border-line text-muted hover:text-text"
              }`}
            onClick={() => { setActiveArch("ecommerce"); setSelectedNode("laravel"); }}
          >
            E-Commerce Web Application (Laravel 7)
          </button>
        </div>
      </div>

      <p className="text-xs text-muted mb-6 leading-relaxed">
        {currentArch.desc} Click any node below to inspect data flow, security gates, and SQA validation points:
      </p>

      {/* Node Flow Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {currentArch.nodes.map((node, idx) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node.id)}
            className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${selectedNode === node.id
                ? "bg-bg-2 border-cyan shadow-glow scale-[1.02]"
                : "bg-bg-2/50 border-line hover:border-line-2"
              }`}
          >
            <div className="flex justify-between items-center mb-2 gap-2">
              {node.icon}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-panel border border-line text-muted shrink-0">
                {node.badge}
              </span>
            </div>
            <div className="font-medium text-xs sm:text-sm text-text mb-1">{node.title}</div>
            <div className="text-[11px] text-cyan font-mono flex items-center gap-1">
              <span>Inspect Flow</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Node Details Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-bg-2 border border-cyan/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 pb-2 border-b border-line gap-1">
          <div className="flex items-center gap-2">
            {currentNodeDetail.icon}
            <span className="font-semibold text-text text-xs sm:text-sm">{currentNodeDetail.title}</span>
          </div>
          <span className="text-xs font-mono text-cyan">{currentNodeDetail.badge}</span>
        </div>
        <p className="text-xs text-text-2 leading-relaxed font-sans">{currentNodeDetail.detail}</p>
      </div>
    </div>
  );
};
export default ArchitectureVisualizer;

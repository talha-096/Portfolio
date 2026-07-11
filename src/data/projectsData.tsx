import { Brain, Sparkles, Code } from "lucide-react";
import React from "react";

export const genMarkDetails = `
## GenMark: AI-Powered Marketing Generation

GenMark is an advanced platform designed to streamline marketing workflows through AI-driven content generation, brand identity management, and automated project orchestration. By leveraging advanced generative models, GenMark provides an end-to-end solution for generating high-quality marketing images and automatically extracting compelling captions, slogans, and descriptions directly from visual content.

### 🛠️ The Tech Stack

**Frontend:** React, Vite, TypeScript, TailwindCSS  
**Backend:** Python, FastAPI, Flask, MongoDB, JWT  
**Infrastructure:** AWS (ECS Fargate, Lambda, API Gateway, S3, ECR), Docker, Gunicorn, Nginx  

### 🌟 Key Features

* **AI Content Generation:** Leverage LLMs to generate high-performance marketing copy.
* **Brand Kit Management:** Maintain consistent brand identity across all generated content.
* **Project Analytics:** Real-time dashboarding for project status and generation metrics.
* **Microservice Architecture:** Decoupled frontend and backend for scalable deployment.

### 🧪 Quality Assurance & Testing

* **End-to-End Automation:** Wrote and executed automated Cypress test suites for the React frontend, covering key user flows like content generation, user auth, and preview.
* **API Contract Testing:** Tested FastAPI backend endpoints with Postman, validating request/response schemas, response times, status codes, and error routes.
* **AI-Assisted Testing:** Leveraged AI tools to quickly generate boundary-value test cases and maximize coverage across backend/frontend interaction paths.
* **Inference Validation:** Verified on-demand model lazy-loading across AWS ECS Fargate, Lambda, and API Gateway under concurrent test loads.

### ⚡ Local Development

**1. Prerequisites**
* Node.js: v18 or later
* Python: v3.10 or later
* MongoDB: Installed and running locally or on Atlas

**2. Backend Setup**
\`\`\`bash
cd Backend
python -m venv venv
# Windows: venv\\Scripts\\activate | Unix: source venv/bin/activate
pip install -r requirements.txt
flask --app run run
\`\`\`

**3. Frontend Setup**
\`\`\`bash
cd Frontend
npm install
npm run dev
\`\`\`
`;

export const ecommerceDetails = `
## Multi-Vendor E-Commerce Application

A modern, scalable Multi-Vendor E-Commerce platform built using the latest Next.js 15, Supabase, Drizzle ORM, and Hono.js. It features role-based dashboards (admin, seller, customer), email verification gates, secure transactions, and a serverless backend.

### 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Backend API:** Hono.js mounted on Next.js serverless routes
* **Database / Auth:** Supabase (PostgreSQL)
* **Database Client / ORM:** Drizzle ORM & postgres.js
* **State Management:** Zustand
* **Data Fetching:** TanStack React Query v5
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion & Swiper.js

### 🗄️ Database Models & Schema

The application database is designed using PostgreSQL and defined with Drizzle ORM:
* \`users.ts\`: Customer profiles containing name, email, avatar, role, status, and metadata.
* \`admin.ts\`: Admin configuration and permissions table.
* \`seller.ts\`: Seller store information, business name, address, tax details, and earnings.
* \`product.ts\`: Product details, vendor-association, pricing, description, category, brand, stock, and status.
* \`category.ts / brand.ts\`: Hierarchical organization for brand and category listings.
* \`cart.ts\`: Saved user shopping carts containing item lists and quantities.
* \`order.ts\`: Tracked transactions, user association, delivery details, amounts, status, and payment types.
* \`review.ts\`: Product ratings and review feedback.
* \`addresses.ts\`: Stored user address profiles for checkout.
* \`coupon.ts\`: Discount and promotion coupon definitions.

### 🔐 Authentication & Session Flow

The application implements a robust authentication state system using Supabase Auth and a custom Next.js Middleware:
* **Protected Routes:** Paths like \`/user\`, \`/vendor\`, \`/admin\`, and \`/cart/checkout\` require authentication.
* **Verification Gate:** Unverified users are automatically redirected to the \`/auth/confirm-otp\` screen.
* **Role Redirection:** Authenticated users trying to access auth pages are routed to their dashboards.
* **Google One Tap:** Built-in support for Google One Tap authentication using google-auth-library.

### Backend API & Modules

All API endpoints are unified under \`/api/*\` handled by Hono.js. The router is split into modular controllers:
* **Auth Module:** Sign-in, Sign-up, confirmation OTP handling.
* **Seller Module:** Dashboard and listing logic for vendors.
* **Admin Module:** Oversight actions.
* **Products Module:** Search and filter endpoints.
* **Orders & Reviews Module:** Submitting checkout and product feedback.

### 🧪 Quality Assurance & Verification

* **Functional Manual Testing:** Executed detailed test scenarios across core user flows, including product discovery, shopping cart modifications, checkout steps, and order verification.
* **Webhook & Integration Validation:** Tested Stripe webhook triggers and handlers to guarantee robust, real-time sync of order/payment states between Stripe and the backend.
* **API and Database Validation:** Verified serverless Hono.js API responses and database state changes in PostgreSQL via Supabase and Drizzle ORM.
`;

export const nlpDetails = `
## Hybrid Transformer-Affective Mental Health Detection

A deep learning system for multiclass mental health detection from social media text using Python, PyTorch, HuggingFace, and SHAP.

🏆 **Overall Accuracy:** 83.83% | 😰 **Anxiety F1:** 94% | 🔍 **SHAP Explainability**

### 🔍 Overview

This project implements a Hybrid Transformer + Affective Feature architecture to classify social media posts into four mental health categories:
* 🟢 **Normal** - No signs of mental health issues
* 🟡 **Anxious** - Signs of anxiety and worry
* 🔴 **Depressed** - Signs of depression and low mood
* ⚫ **Suicidal** - High-risk crisis language

**Key Contributions:**
* ✅ Extended from binary to 4-class classification
* ✅ Hybrid architecture — fuses RoBERTa embeddings + Sentiment scores + Emotion scores
* ✅ Explainable AI — SHAP shows why the model made each prediction
* ✅ Balanced training with class-weighted loss function
* ✅ Comparable accuracy (83.83%) on a harder task than the base paper

### ⚙️ How It Works

Input Text is passed through three parallel models:
1. **[RoBERTa Encoder]** (distilroberta-base): Captures meaning, context, word relationships (768-dim embedding).
2. **[Sentiment Model]** (twitter-roberta-base-sentiment): Captures Positive/Neutral/Negative polarity (3 scores).
3. **[Emotion Model]** (emotion-english-distilroberta-base): Captures 7 emotion scores (Anger, Fear, Sadness, etc.).

These outputs flow into a Feature Fusion Layer (778-dim combined vector) and then to a Classifier Head to produce the final prediction.

### 📊 Dataset

The dataset consists of ~10,000 real social media posts from Reddit, collected from mental health-related communities (e.g., r/AskReddit, r/anxiety, r/depression, r/SuicideWatch).

### 🧠 SHAP Explainability

SHAP (SHapley Additive eXplanations) reveals which words influenced the model's decision for each prediction. This allows us to see exactly which words (e.g. "hopeless", "worried") pushed the model toward a specific clinical classification.

### 🆚 Comparison with Base Paper

We achieve comparable accuracy on a significantly harder task (4-class instead of binary) while adding clinical interpretability through SHAP and utilizing 7 emotion + 3 sentiment features.

### 🧪 QA & Model Evaluation

* **Accuracy Validation:** Designed and executed test cases to validate the classification model against target criteria, achieving ~84% F1-score through iterative threshold tuning.
* **Imbalance Corrective Testing:** Identified class-imbalance defects in the detection pipeline; implemented SMOTE and verified recall improvement (from ~71% to 83%) via regression test runs.
* **Evaluation Metrics:** Generated comprehensive precision, recall, F1, and AUC-ROC evaluation reports for team review.
`;

export const fakeNewsDetails = `
## Fake News Detection System

A complete NLP and Machine Learning project to detect fake and real news using TF-IDF and Logistic Regression. 

### Overview
This project includes a full training pipeline, evaluation charts, and an interactive Streamlit web app for real-time credibility analysis. 

### Key Features
* **Machine Learning Pipeline:** Implemented text preprocessing, TF-IDF vectorization, and Logistic Regression classification.
* **Streamlit Web Application:** Deployed a live dashboard that allows users to paste articles and receive instant credibility scores and visualizations.
* **Performance Metrics:** Thoroughly evaluated model performance using precision, recall, and F1-score across a balanced dataset of real and fabricated news articles.
`;

export const projectsData = [
  {
    title: "GenMark – Multi-Modal AI Content Generation",
    description: "Final Year Project. Serverless AI inference platform on AWS verified with Cypress end-to-end automation and Postman API contract testing.",
    images: [
      "/projects/genmark/media__1782301041222.png",
      "/projects/genmark/media__1782301049086.png",
      "/projects/genmark/media__1782301055994.png",
      "/projects/genmark/media__1782301063284.png",
      "/projects/genmark/media__1782301072169.png"
    ],
    technologies: ["Python", "FastAPI", "React", "AWS", "Docker"],
    category: "Generative AI",
    icon: <Sparkles className="h-5 w-5" />,
    github: "https://github.com/talha-096/GenMark",
    demo: "https://gen-mark-kappa.vercel.app/",
    featured: true,
    markdownDetails: genMarkDetails,
  },
  {
    title: "Full-Stack E-Commerce Platform",
    description: "Complete multi-vendor e-commerce platform manually tested for core checkout flows and verified for Stripe webhook synchronization.",
    image: "/api/placeholder/400/250",
    technologies: ["Next.js", "Laravel", "Supabase", "Stripe", "AWS S3"],
    category: "Full-Stack Development",
    icon: <Code className="h-5 w-5" />,
    github: "https://github.com/talha-096/E-commerce-Website",
    demo: "#",
    featured: true,
    markdownDetails: ecommerceDetails,
  },
  {
    title: "NLP Mental Health Classification System",
    description: "Early indicator model (TF-IDF + Logistic Regression) achieving ~84% F1-score with SMOTE class-imbalance correction and regression verification.",
    image: "/api/placeholder/400/250",
    technologies: ["Python", "scikit-learn", "NLP"],
    category: "Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    github: "https://github.com/talha-096/NLP-Mental-Health-Classification-System",
    demo: "#",
    featured: true,
    markdownDetails: nlpDetails,
  },
  {
    title: "Fake News Detection System",
    description: "Machine learning classifier for detecting fake news. Deployed as a Streamlit web application providing real-time classification and visualizations.",
    image: "/api/placeholder/400/250",
    technologies: ["Python", "NLP", "Streamlit"],
    category: "Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    github: "https://github.com/talha-096/Fake-News-Detector",
    demo: "#",
    featured: false,
    markdownDetails: fakeNewsDetails,
  }
];

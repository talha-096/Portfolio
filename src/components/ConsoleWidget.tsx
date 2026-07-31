import { useEffect, useRef, useState } from "react";
import { Send, Play, Terminal, Cpu, Database, CheckCircle2 } from "lucide-react";

export const ConsoleWidget = () => {
  const [activeTab, setActiveTab] = useState<"telemetry" | "playground" | "rag">("telemetry");
  
  // Telemetry Metrics
  const [tps, setTps] = useState(1284);
  const [latency, setLatency] = useState(142);
  const [activeModels, setActiveModels] = useState(7);
  const [requests, setRequests] = useState(3.4);
  const [uptime, setUptime] = useState("142h 38m");
  const [loss, setLoss] = useState(0.0042);
  const [epoch, setEpoch] = useState(142);

  // Terminal Log State
  const [logs, setLogs] = useState<Array<{ ts: string; lvl: string; msg: string }>>([]);

  // AI Playground State
  const [chatHistory, setChatHistory] = useState<Array<{ role: "bot" | "user"; text: string }>>([
    {
      role: "bot",
      text: "Hello! I'm **Talha's AI & SQA Assistant**. Ask me anything about Talha Ghafoor's test automation, Cypress suites, ML pipelines, or software engineering experience!"
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState("");

  // RAG / Test Inspector State
  const [inspectorMode, setInspectorMode] = useState<"rag" | "cypress">("cypress");
  const [testLog, setTestLog] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize and update Live Terminal Logs
  useEffect(() => {
    const LOG_LINES = [
      { lvl: "ok", msg: 'cypress run <span className="v">--spec genmark.cy.js</span> · 14/14 PASS' },
      { lvl: "inf", msg: 'postman collection <span className="v">fastapi_contracts</span> · 200 OK' },
      { lvl: "req", msg: "POST /v1/infer · 2,048 tokens · GenMark AWS" },
      { lvl: "ok", msg: 'smote balance <span className="v">mental_health_df</span> · recall 83%' },
      { lvl: "inf", msg: "stripe webhook listener · status 200 (order_fulfilled)" },
      { lvl: "ok", msg: "roberta + sentiment + emotion fusion · accuracy 83.8%" },
      { lvl: "inf", msg: 'docker pull <span className="v">talha/genmark-api:v2.1</span>' },
      { lvl: "warn", msg: "class-imbalance detected · trigger SMOTE resample" },
      { lvl: "ok", msg: "aws ecs fargate · lazy load model · sub-150ms" },
      { lvl: "inf", msg: 'shap explainer · text_tokens=["hopeless", "anxious"]' }
    ];

    const labelMap: Record<string, string> = { ok: "OK", warn: "WRN", req: "REQ", inf: "INF" };

    const initialLogs = Array.from({ length: 8 }).map((_, i) => {
      const item = LOG_LINES[i % LOG_LINES.length];
      const now = new Date(Date.now() - (8 - i) * 2000);
      const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      return { ts, lvl: item.lvl, msg: item.msg };
    });
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const item = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
      setLogs((prev) => [...prev.slice(-10), { ts, lvl: item.lvl, msg: item.msg }]);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Live telemetry counters & canvas particle neural network
  useEffect(() => {
    const tick = setInterval(() => {
      setTps((v) => Math.max(900, Math.min(2200, Math.round(v + (Math.random() - 0.5) * 120))));
      setLatency((v) => Math.max(80, Math.min(240, Math.round(v + (Math.random() - 0.5) * 15))));
      setRequests((v) => Math.max(2.1, Math.min(4.9, parseFloat((v + (Math.random() - 0.5) * 0.2).toFixed(1)))));
      setEpoch((v) => v + 1);
      setLoss((v) => Math.max(0.0012, parseFloat((v - 0.00001).toFixed(4))));
    }, 1500);

    return () => clearInterval(tick);
  }, []);

  // Canvas Neural Network Animation
  useEffect(() => {
    if (activeTab !== "telemetry" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 150);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ["#57bdda", "#9f86e0", "#62cdba"];

    for (let i = 0; i < 22; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(87, 189, 218, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // Handle AI Chat Submit
  const handleChatSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || inputPrompt;
    if (!query.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", text: query }]);
    if (!customQuery) setInputPrompt("");

    setTimeout(() => {
      let botResponse = "Talha Ghafoor is a Software Engineer specializing in SQA, Cypress/Postman automation, PyTorch NLP models, and full-stack development with React, FastAPI, AWS, and Docker.";
      const q = query.toLowerCase();

      if (q.includes("genmark") || q.includes("aws")) {
        botResponse = "GenMark is Talha's Final Year Project: a multi-modal AI marketing platform. Talha verified its serverless AWS deployment with automated Cypress E2E tests and Postman API contract testing!";
      } else if (q.includes("education") || q.includes("degree") || q.includes("bs") || q.includes("hitec")) {
        botResponse = "Talha completed his BS in Software Engineering (2022 - 2026) at HITEC University, specializing in SQA, AI/ML, and Web Engineering.";
      } else if (q.includes("email") || q.includes("contact") || q.includes("gmail")) {
        botResponse = "You can contact Talha directly at talhaghafoor84@gmail.com.";
      } else if (q.includes("mental") || q.includes("nlp") || q.includes("shap")) {
        botResponse = "Talha developed a 4-class Mental Health Affective Detection system fusing RoBERTa + Sentiment + Emotion features, achieving 83.83% accuracy and correcting class-imbalance via SMOTE!";
      } else if (q.includes("qa") || q.includes("test") || q.includes("cypress")) {
        botResponse = "Talha excels in Software Quality Assurance — writing automated Cypress frontend suites, Postman backend API contract validation, boundary-value test suites, and regression testing!";
      } else if (q.includes("skills") || q.includes("stack")) {
        botResponse = "Talha's core stack includes Python, Cypress, Postman, FastAPI, React, PyTorch, scikit-learn, Docker, AWS, PostgreSQL, Supabase, and Next.js.";
      }

      setChatHistory((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 600);
  };

  // Run Test Suite Simulation
  const runTestSimulation = () => {
    setIsTesting(true);
    setTestLog(["[1/4] Initializing Cypress E2E Test Suite...", "[2/4] Executing user auth & token validation..."]);

    setTimeout(() => {
      setTestLog((prev) => [...prev, "[3/4] Testing FastAPI /v1/generate API contracts via Postman..."]);
    }, 800);

    setTimeout(() => {
      setTestLog((prev) => [
        ...prev,
        "[4/4] Verified SMOTE class-imbalance fix (Recall ~83%).",
        "✅ TEST SUITE SUCCEEDED — 24/24 PASS (0 failures)"
      ]);
      setIsTesting(false);
    }, 1600);
  };

  return (
    <div className="console">
      <div className="console-head">
        <div className="console-dots">
          <span></span><span></span><span></span>
        </div>
        <div className="console-title">
          talha@qa-ml-prod · <b>~/projects/main</b>
        </div>
        <div className="console-tabs">
          <button
            className={`console-tab-btn ${activeTab === "telemetry" ? "active" : ""}`}
            onClick={() => setActiveTab("telemetry")}
          >
            Telemetry
          </button>
          <button
            className={`console-tab-btn ${activeTab === "playground" ? "active" : ""}`}
            onClick={() => setActiveTab("playground")}
          >
            AI Playground
          </button>
          <button
            className={`console-tab-btn ${activeTab === "rag" ? "active" : ""}`}
            onClick={() => setActiveTab("rag")}
          >
            <span className="hidden sm:inline">RAG &amp; QA Inspector</span>
            <span className="inline sm:hidden">RAG &amp; QA</span>
          </button>
        </div>
        <div className="console-tag">
          <span className="pip"></span>LIVE
        </div>
      </div>

      {/* TAB 1: TELEMETRY */}
      <div className={`console-tab-panel ${activeTab === "telemetry" ? "active" : ""}`}>
        <div className="console-metrics">
          <div className="metric-cell">
            <div className="lbl">CYPRESS TESTS</div>
            <div className="val">
              <span>{tps}</span> <span className="arrow">↑</span>
            </div>
          </div>
          <div className="metric-cell">
            <div className="lbl">API LATENCY P95</div>
            <div className="val">
              <span>{latency}</span>
              <span className="unit">ms</span> <span className="arrow down">↓</span>
            </div>
          </div>
          <div className="metric-cell">
            <div className="lbl">ACTIVE MODELS</div>
            <div className="val">
              <span>0{activeModels}</span>
            </div>
          </div>
          <div className="metric-cell">
            <div className="lbl">F1 ACCURACY</div>
            <div className="val">
              <span>83.8</span>
              <span className="unit">%</span> <span className="arrow">↑</span>
            </div>
          </div>
        </div>

        <div className="console-net">
          <span className="net-label tl">
            <span style={{ color: "var(--cyan)" }}>●</span> model.training &amp;qa_validation
          </span>
          <span className="net-label tr">loss · {loss}</span>
          <canvas ref={canvasRef} />
          <span className="net-label bl">
            ARCH · <span className="arch-num">RoBERTa</span> - <span className="arch-num">SMOTE</span> - <span className="arch-num">FastAPI</span>
          </span>
          <span className="net-label br">epoch {epoch}/∞</span>
        </div>

        <div className="console-log">
          {logs.map((l, i) => (
            <div className="log-row" key={i}>
              <span className="ts">{l.ts}</span>
              <span className={`lvl ${l.lvl}`}>{l.lvl.toUpperCase()}</span>
              <span className="msg" dangerouslySetInnerHTML={{ __html: l.msg }} />
            </div>
          ))}
        </div>
      </div>

      {/* TAB 2: AI PLAYGROUND */}
      <div className={`console-tab-panel ${activeTab === "playground" ? "active" : ""}`}>
        <div className="pg-chat-container">
          <div className="pg-chat-history">
            {chatHistory.map((m, i) => (
              <div key={i} className={`pg-msg ${m.role}`}>
                <div className="pg-avatar">{m.role === "bot" ? "🤖" : "👤"}</div>
                <div
                  className="pg-bubble"
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
                />
              </div>
            ))}
          </div>

          <div className="pg-presets">
            <button
              className="pg-chip-btn"
              onClick={() => handleChatSubmit(undefined, "What AI & SQA projects have you built?")}
            >
              What projects built?
            </button>
            <button
              className="pg-chip-btn"
              onClick={() => handleChatSubmit(undefined, "Explain GenMark AWS QA & Cypress automation")}
            >
              GenMark AWS QA
            </button>
            <button
              className="pg-chip-btn"
              onClick={() => handleChatSubmit(undefined, "What is your NLP Mental Health accuracy?")}
            >
              Mental Health NLP
            </button>
          </div>

          <form className="pg-input-form" onSubmit={(e) => handleChatSubmit(e)}>
            <input
              type="text"
              placeholder="Type a prompt to test Talha's assistant..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
            />
            <button type="submit" className="pg-send-btn">
              Send ➔
            </button>
          </form>
        </div>
      </div>

      {/* TAB 3: RAG & QA INSPECTOR */}
      <div className={`console-tab-panel ${activeTab === "rag" ? "active" : ""}`}>
        <div className="rag-inspector">
          <div className="rag-head-bar flex-col sm:flex-row items-start sm:items-center gap-1">
            <span className="rag-title truncate max-w-full">
              Cypress &amp; Postman Test Runner: <code>talha-096/GenMark</code>
            </span>
            <span className="rag-status shrink-0">SMOTE Balanced · 83.8% F1</span>
          </div>

          <div className="rag-query-box">
            <label>CURRENT TARGET SUITE:</label>
            <div className="rag-query-text">"Cypress frontend user auth &amp; FastAPI backend endpoint contract testing"</div>
          </div>

          <div className="rag-matches">
            <div className="rag-match-item">
              <div className="rag-match-top flex-col sm:flex-row">
                <span className="chunk-id">suite_01 · GenMark Cypress E2E</span>
                <span className="similarity-score">Status: PASS (14/14)</span>
              </div>
              <div className="rag-match-body">"Verified user login, lazy-loading model prompt generation, and AWS S3 brand kit image storage."</div>
            </div>

            <div className="rag-match-item">
              <div className="rag-match-top flex-col sm:flex-row">
                <span className="chunk-id">suite_02 · Mental Health SMOTE Fix</span>
                <span className="similarity-score">Recall: 83.0%</span>
              </div>
              <div className="rag-match-body">"Corrected minority class imbalance using SMOTE; verified precision/recall via iterative regression test runs."</div>
            </div>

            <div className="rag-match-item">
              <div className="rag-match-top flex-col sm:flex-row">
                <span className="chunk-id">suite_03 · Stripe Webhooks E-Commerce</span>
                <span className="similarity-score">Sync: 100% Valid</span>
              </div>
              <div className="rag-match-body">"Tested multi-vendor order placement and validated real-time Stripe checkout webhook triggers in PostgreSQL."</div>
            </div>

            {testLog.map((log, idx) => (
              <div key={idx} className="rag-match-item border-cyan/40 bg-cyan/10">
                <div className="rag-match-body text-cyan font-mono">{log}</div>
              </div>
            ))}
          </div>

          <button className="rag-run-btn" onClick={runTestSimulation} disabled={isTesting}>
            {isTesting ? "⚡ Running Automated Verification..." : "⚡ Execute Automated Cypress & QA Test Suite"}
          </button>
        </div>
      </div>

      <div className="console-foot">
        <span className="seg ok">
          <span className="lbl">●</span>
          <span className="v">healthy</span>
        </span>
        <span className="seg">
          <span className="lbl">region</span>
          <span className="v">aws-us-east-1</span>
        </span>
        <span className="seg">
          <span className="lbl">qa_build</span>
          <span className="v">v2.4.0</span>
        </span>
        <span className="grow"></span>
        <span className="seg">
          <span className="lbl">uptime</span>
          <span className="v uptime">{uptime}</span>
        </span>
      </div>
    </div>
  );
};
export default ConsoleWidget;

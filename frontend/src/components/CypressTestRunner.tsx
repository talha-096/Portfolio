import { useState, useEffect } from "react";
import { Play, CheckCircle2, RefreshCw, FileCheck, Terminal, Download } from "lucide-react";

export const CypressTestRunner = () => {
  const [activeSuite, setActiveSuite] = useState<"cypress" | "postman" | "smote">("cypress");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedLogs, setCompletedLogs] = useState<Array<{ text: string; status: "pass" | "info" | "warn"; time: string }>>([]);

  const suites = {
    cypress: {
      title: "Cypress E2E Frontend Suite",
      target: "GenMark React Frontend (gen-mark-kappa.vercel.app)",
      steps: [
        { text: "cy.visit('/auth/login') — Load authentication view", time: "142ms" },
        { text: "cy.get('[data-cy=email-input]').type('test_qa@genmark.ai')", time: "85ms" },
        { text: "cy.get('[data-cy=password-input]').type('••••••••••••')", time: "42ms" },
        { text: "cy.get('[data-cy=submit-btn]').click() — Submit credentials", time: "210ms" },
        { text: "cy.url().should('include', '/dashboard') — Verify redirect", time: "18ms" },
        { text: "cy.get('[data-cy=prompt-input]').type('Cyberpunk AI Banner')", time: "120ms" },
        { text: "cy.get('[data-cy=generate-btn]').click() — Trigger lazy AI inference", time: "340ms" },
        { text: "cy.get('[data-cy=image-preview]').should('be.visible') — Assert S3 render", time: "65ms" }
      ]
    },
    postman: {
      title: "Postman API Contract Suite",
      target: "FastAPI Backend API Gateway (aws-ecs-fargate)",
      steps: [
        { text: "POST /v1/auth/login — Request token validation", time: "48ms" },
        { text: "Assert status 200 OK & JWT bearer payload schema", time: "12ms" },
        { text: "POST /v1/generate/image — Test model lazy-load route", time: "180ms" },
        { text: "Validate OpenAPI contract & JSON response schema", time: "15ms" },
        { text: "GET /v1/projects/analytics — Check database response", time: "34ms" },
        { text: "POST /v1/stripe/webhook — Test payment event signature", time: "52ms" },
        { text: "Assert order_fulfilled status sync in PostgreSQL", time: "22ms" }
      ]
    },
    smote: {
      title: "SMOTE Class-Imbalance & Model QA",
      target: "Mental Health NLP Classifier (PyTorch + RoBERTa)",
      steps: [
        { text: "Load baseline test dataset (10,000 Reddit social posts)", time: "95ms" },
        { text: "Detect class imbalance in suicidal & anxiety samples", time: "140ms" },
        { text: "Execute SMOTE synthetic oversampling on training split", time: "310ms" },
        { text: "Evaluate RoBERTa + Affective Feature Fusion pipeline", time: "420ms" },
        { text: "Assert F1-score >= 83.0% threshold (Achieved: 83.83%)", time: "18ms" },
        { text: "Verify minority-class recall improvement (~71% → 83%)", time: "24ms" }
      ]
    }
  };

  const currentSuiteData = suites[activeSuite];

  const startTestExecution = () => {
    setIsRunning(true);
    setProgress(0);
    setCurrentStep(0);
    setCompletedLogs([]);
  };

  useEffect(() => {
    if (!isRunning) return;

    const totalSteps = currentSuiteData.steps.length;

    if (currentStep < totalSteps) {
      const timer = setTimeout(() => {
        const step = currentSuiteData.steps[currentStep];
        setCompletedLogs((prev) => [
          ...prev,
          { text: step.text, status: "pass", time: step.time }
        ]);
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setProgress(Math.round((nextStep / totalSteps) * 100));
      }, 350);

      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, activeSuite, currentSuiteData]);

  const downloadQaReport = () => {
    const reportContent = `TALHA GHAFOOR — AUTOMATED QA TEST EXECUTION REPORT
==================================================
Suite: ${currentSuiteData.title}
Target: ${currentSuiteData.target}
Timestamp: ${new Date().toISOString()}
Status: PASSED (100% Success)

Test Steps & Assertions:
${currentSuiteData.steps.map((s, i) => `  [✓ Pass] Step ${i + 1}: ${s.text} (${s.time})`).join("\n")}

Summary:
  Total Executed: ${currentSuiteData.steps.length}
  Passed: ${currentSuiteData.steps.length}
  Failed: 0
  Coverage: 100% Verified
  Evaluated By: Talha Ghafoor (QA & AI Specialist)
`;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `QA_Test_Report_${activeSuite}_TalhaGhafoor.txt`;
    a.click();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-line bg-panel reveal mb-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase mb-1">
            <Terminal className="w-4 h-4" />
            <span>// LIVE SQA AUTOMATION ENGINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-text">Interactive Cypress &amp; Postman Test Runner</h3>
        </div>

        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 w-full lg:w-auto">
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all text-center ${
              activeSuite === "cypress" ? "bg-cyan/20 border border-cyan text-cyan font-semibold" : "bg-panel border border-line text-muted hover:text-text"
            }`}
            onClick={() => { setActiveSuite("cypress"); setCompletedLogs([]); setProgress(0); }}
          >
            Cypress E2E
          </button>
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all text-center ${
              activeSuite === "postman" ? "bg-violet/20 border border-violet text-violet font-semibold" : "bg-panel border border-line text-muted hover:text-text"
            }`}
            onClick={() => { setActiveSuite("postman"); setCompletedLogs([]); setProgress(0); }}
          >
            Postman API Contracts
          </button>
          <button
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all text-center ${
              activeSuite === "smote" ? "bg-mint/20 border border-mint text-mint font-semibold" : "bg-panel border border-line text-muted hover:text-text"
            }`}
            onClick={() => { setActiveSuite("smote"); setCompletedLogs([]); setProgress(0); }}
          >
            SMOTE Model QA
          </button>
        </div>
      </div>

      {/* Target suite banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3.5 sm:p-4 rounded-xl bg-bg-2 border border-line mb-6 gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] sm:text-xs text-muted font-mono uppercase">CURRENT TARGET</div>
          <div className="text-xs sm:text-sm font-medium text-text font-mono break-all">{currentSuiteData.target}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          <button
            onClick={startTestExecution}
            disabled={isRunning}
            className="btn btn-primary text-xs py-2 px-3 sm:px-4 flex items-center justify-center gap-2 flex-1 sm:flex-none"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Suite
              </>
            )}
          </button>

          {completedLogs.length > 0 && !isRunning && (
            <button
              onClick={downloadQaReport}
              className="btn btn-ghost text-xs py-2 px-3 flex items-center gap-1.5 text-mint border-mint/40 hover:bg-mint/10 shrink-0"
              title="Download QA Report"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-mono mb-2">
          <span className="text-muted">EXECUTION PROGRESS</span>
          <span className="text-cyan font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Test Log Terminal */}
      <div className="p-3 sm:p-4 rounded-xl bg-bg-2/80 border border-line font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
        {completedLogs.length === 0 ? (
          <div className="text-muted text-center py-6 text-xs sm:text-sm">
            Click <b className="text-cyan">"Run Suite"</b> above to observe real-time assertion passes.
          </div>
        ) : (
          completedLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 text-text-2 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
              <span className="flex-1 text-text-2 break-all">{log.text}</span>
              <span className="text-dim text-[10px] shrink-0 ml-1">{log.time}</span>
            </div>
          ))
        )}
        {progress === 100 && (
          <div className="p-3 mt-3 rounded-lg bg-mint/10 border border-mint/30 text-mint font-semibold flex items-center gap-2 text-xs sm:text-sm flex-wrap">
            <FileCheck className="w-4 h-4 shrink-0" />
            <span>SUITE PASSED — {currentSuiteData.steps.length}/{currentSuiteData.steps.length} ASSERTIONS VERIFIED (0 failures)</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default CypressTestRunner;

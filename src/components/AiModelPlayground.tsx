import { useState } from "react";
import { Brain, Sparkles, AlertTriangle, CheckCircle, Search, HelpCircle } from "lucide-react";

export const AiModelPlayground = () => {
  const [inputText, setInputText] = useState("Feeling extremely anxious about my upcoming exams and overwhelmed by stress.");
  const [analyzed, setAnalyzed] = useState(true);

  // Simulated SHAP token scores
  const samples = [
    {
      label: "Anxiety Indicator Sample",
      text: "Feeling extremely anxious about my upcoming software engineering exams and overwhelmed by stress.",
      scores: { normal: 12, anxious: 78, depressed: 8, suicidal: 2 },
      shapTokens: [
        { word: "Feeling", score: 0.02, impact: "neutral" },
        { word: "anxious", score: +0.45, impact: "anxious" },
        { word: "upcoming", score: 0.01, impact: "neutral" },
        { word: "exams", score: +0.22, impact: "anxious" },
        { word: "overwhelmed", score: +0.38, impact: "anxious" },
        { word: "stress", score: +0.28, impact: "anxious" }
      ]
    },
    {
      label: "Normal Health Sample",
      text: "I am having an amazing time building automated Cypress test suites and coding in React today!",
      scores: { normal: 94, anxious: 4, depressed: 2, suicidal: 0 },
      shapTokens: [
        { word: "amazing", score: +0.55, impact: "normal" },
        { word: "building", score: +0.12, impact: "normal" },
        { word: "automated", score: +0.08, impact: "normal" },
        { word: "Cypress", score: +0.15, impact: "normal" },
        { word: "coding", score: +0.10, impact: "normal" }
      ]
    },
    {
      label: "Depression Indicator Sample",
      text: "Everything feels completely hopeless and empty, I have lost all motivation to get out of bed.",
      scores: { normal: 4, anxious: 12, depressed: 81, suicidal: 3 },
      shapTokens: [
        { word: "completely", score: 0.05, impact: "neutral" },
        { word: "hopeless", score: +0.62, impact: "depressed" },
        { word: "empty", score: +0.41, impact: "depressed" },
        { word: "lost", score: +0.32, impact: "depressed" },
        { word: "motivation", score: +0.25, impact: "depressed" }
      ]
    }
  ];

  const [activeSample, setActiveSample] = useState(samples[0]);

  const selectSample = (sample: typeof samples[0]) => {
    setActiveSample(sample);
    setInputText(sample.text);
    setAnalyzed(true);
  };

  const getTopClassification = () => {
    const s = activeSample.scores;
    if (s.anxious > 50) return { title: "Anxious Classification", color: "text-amber", badge: "bg-amber/10 border-amber/30 text-amber" };
    if (s.depressed > 50) return { title: "Depressed Classification", color: "text-rose", badge: "bg-rose/10 border-rose/30 text-rose" };
    return { title: "Normal Affective State", color: "text-mint", badge: "bg-mint/10 border-mint/30 text-mint" };
  };

  const topClass = getTopClassification();

  return (
    <div className="p-6 md:p-8 rounded-2xl border border-line bg-panel reveal mb-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-2 text-violet font-mono text-xs uppercase mb-1">
            <Brain className="w-4 h-4" />
            <span>// HYBRID TRANSFORMER + SHAP EXPLAINABILITY</span>
          </div>
          <h3 className="text-2xl font-medium text-text">Mental Health NLP Model &amp; SHAP Playground</h3>
        </div>
        <div className="text-xs text-muted font-mono">
          PyTorch · RoBERTa · 83.83% F1-Score
        </div>
      </div>

      {/* Sample presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {samples.map((s, idx) => (
          <button
            key={idx}
            onClick={() => selectSample(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeSample.label === s.label
                ? "bg-violet/20 border border-violet text-violet font-semibold"
                : "bg-panel border border-line text-muted hover:text-text"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="mb-6">
        <label className="block text-xs font-mono text-muted mb-2 uppercase">Input Text for Affective Evaluation:</label>
        <div className="p-4 rounded-xl bg-bg-2 border border-line text-text-2 text-sm leading-relaxed font-sans">
          "{inputText}"
        </div>
      </div>

      {/* Model Probabilities & SHAP Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classification Probability Gauges */}
        <div className="p-5 rounded-xl bg-bg-2/70 border border-line space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-line">
            <span className="text-xs font-mono text-muted uppercase">Model Probability Outputs</span>
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${topClass.badge}`}>
              {topClass.title}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-mint">🟢 Normal</span>
                <span className="text-text font-bold">{activeSample.scores.normal}%</span>
              </div>
              <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-mint rounded-full transition-all duration-500" style={{ width: `${activeSample.scores.normal}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber">🟡 Anxious</span>
                <span className="text-text font-bold">{activeSample.scores.anxious}%</span>
              </div>
              <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-amber rounded-full transition-all duration-500" style={{ width: `${activeSample.scores.anxious}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose">🔴 Depressed</span>
                <span className="text-text font-bold">{activeSample.scores.depressed}%</span>
              </div>
              <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-rose rounded-full transition-all duration-500" style={{ width: `${activeSample.scores.depressed}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-dim">⚫ Suicidal / Crisis</span>
                <span className="text-text font-bold">{activeSample.scores.suicidal}%</span>
              </div>
              <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-dim rounded-full transition-all duration-500" style={{ width: `${activeSample.scores.suicidal}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* SHAP Feature Token Explainer */}
        <div className="p-5 rounded-xl bg-bg-2/70 border border-line">
          <div className="flex justify-between items-center pb-3 border-b border-line mb-4">
            <span className="text-xs font-mono text-muted uppercase">SHAP Trigger Token Explainer</span>
            <span className="text-[10px] text-cyan font-mono">SHapley Additive exPlanations</span>
          </div>

          <p className="text-xs text-muted mb-4 leading-relaxed">
            SHAP values calculate token-level contribution to explain why RoBERTa classified this text:
          </p>

          <div className="flex flex-wrap gap-2">
            {activeSample.shapTokens.map((t, idx) => {
              let bg = "bg-panel border-line text-muted";
              if (t.impact === "anxious") bg = "bg-amber/20 border-amber/50 text-amber font-semibold";
              if (t.impact === "depressed") bg = "bg-rose/20 border-rose/50 text-rose font-semibold";
              if (t.impact === "normal") bg = "bg-mint/20 border-mint/50 text-mint font-semibold";

              return (
                <span key={idx} className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${bg}`}>
                  <span>{t.word}</span>
                  <span className="opacity-75 text-[10px]">({t.score > 0 ? `+${t.score}` : t.score})</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AiModelPlayground;

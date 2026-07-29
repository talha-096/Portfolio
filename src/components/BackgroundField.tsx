import { useEffect, useState } from "react";

export const BackgroundField = () => {
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? scrolled / max : 0;
      setScrollPct(pct);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollPct})` }}
      />

      {/* Grid & Glow Fields */}
      <div className="bg-grid" />
      <div className="bg-glow" />

      {/* Mouse Tracking Glow */}
      <div
        className="cursor-glow"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.x < 0 ? 0 : 1,
        }}
      />

      {/* Floating Mathematical & AI Equations Field */}
      <div className="bg-math" aria-hidden="true">
        <span className="eq eq-1">∇<i>L</i>(θ) = −∑ <i>y</i> log(<i>ŷ</i>)</span>
        <span className="eq eq-2">σ(<i>z</i>) = 1 / (1 + <i>e</i><sup>−<i>z</i></sup>)</span>
        <span className="eq eq-3">θ<sub>t+1</sub> = θ<sub>t</sub> − η ∇<i>L</i>(θ<sub>t</sub>)</span>
        <span className="eq eq-4">Attention(<i>Q,K,V</i>) = softmax(<i>QK</i><sup>⊤</sup>/√<i>d<sub>k</sub></i>) <i>V</i></span>
        <span className="eq eq-5"><i>H</i>(<i>p,q</i>) = −∑ <i>p</i><sub>i</sub> log <i>q</i><sub>i</sub></span>
        <span className="eq eq-6"><i>p</i>(<i>y</i>∣<i>x</i>) = softmax(<i>Wx</i> + <i>b</i>)</span>
        <span className="eq eq-7">ELBO = 𝔼<sub>q</sub>[log <i>p</i>(<i>x</i>∣<i>z</i>)] − KL(<i>q</i> ‖ <i>p</i>)</span>
        <span className="eq eq-8">ReLU(<i>x</i>) = max(0, <i>x</i>)</span>
        <span className="eq eq-9"><i>L</i> = ½ ‖<i>y</i> − <i>X</i>θ‖²</span>
        <span className="eq eq-10"><i>ŷ</i> = arg max <i>P</i>(<i>y</i>∣<i>x</i>; θ)</span>
        <span className="eq eq-11"><i>F</i><sub>1</sub> = 2·<i>PR</i> / (<i>P</i> + <i>R</i>)</span>
        <span className="eq eq-12">cos(<i>u,v</i>) = <i>u</i>·<i>v</i> / (‖<i>u</i>‖‖<i>v</i>‖)</span>
        <span className="eq eq-13"><i>D</i><sub>KL</sub>(<i>p</i>‖<i>q</i>) = ∑ <i>p</i>(<i>x</i>) log <i>p</i>(<i>x</i>)/<i>q</i>(<i>x</i>)</span>
        <span className="eq eq-14"><i>z</i> = μ + σ ⊙ ε,  ε ∼ 𝒩(0,<i>I</i>)</span>
      </div>
    </>
  );
};
export default BackgroundField;

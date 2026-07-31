import { useEffect, useRef } from "react";

export const OrbitCard = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const nodes = [
    // Inner Ring (r1)
    { name: "Python", ring: 0.55, angle: 0, ringClass: "r1" },
    { name: "Cypress", ring: 0.55, angle: 120, ringClass: "r1" },
    { name: "Postman", ring: 0.55, angle: 240, ringClass: "r1" },

    // Middle Ring (r2)
    { name: "FastAPI", ring: 0.78, angle: 30, ringClass: "r2" },
    { name: "PyTorch", ring: 0.78, angle: 110, ringClass: "r2" },
    { name: "React", ring: 0.78, angle: 190, ringClass: "r2" },
    { name: "Docker", ring: 0.78, angle: 270, ringClass: "r2" },

    // Outer Ring (r3)
    { name: "AWS", ring: 1.0, angle: 15, ringClass: "r3" },
    { name: "Next.js", ring: 1.0, angle: 85, ringClass: "r3" },
    { name: "Supabase", ring: 1.0, angle: 155, ringClass: "r3" },
    { name: "scikit", ring: 1.0, angle: 225, ringClass: "r3" },
    { name: "Tailwind", ring: 1.0, angle: 295, ringClass: "r3" }
  ];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const placeNodes = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const cx = w / 2;
      const cy = h / 2;

      const elements = stage.querySelectorAll<HTMLDivElement>(".orbit-node");
      elements.forEach((el, idx) => {
        const item = nodes[idx];
        if (!item) return;
        const radius = (Math.min(w, h) * item.ring) / 2;
        const rad = (item.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * radius;
        const y = cy + Math.sin(rad) * radius;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
    };

    placeNodes();
    window.addEventListener("resize", placeNodes);
    return () => window.removeEventListener("resize", placeNodes);
  }, []);

  return (
    <div className="orbit-card reveal reveal-delay-2">
      <div className="label-top">
        <span>// CORE_LOOP</span>
        <span style={{ color: "var(--cyan)" }}>● live</span>
      </div>
      <div className="title-mid">Daily Tech Orbit</div>

      <div className="orbit-stage" ref={stageRef}>
        <div className="orbit-ring r3" />
        <div className="orbit-ring r2" />
        <div className="orbit-ring r1" />

        <div className="orbit-core">AI/QA</div>

        {nodes.map((n, i) => (
          <div key={i} className={`orbit-node ${n.ringClass}`}>
            <span>{n.name.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="label-top" style={{ marginTop: "auto" }}>
        <span>tools_in_motion = 12</span>
        <span>verified daily</span>
      </div>
    </div>
  );
};
export default OrbitCard;

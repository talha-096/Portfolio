import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const VisitorTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Keyed on pathname: with an empty dependency array this only ever logged
    // the landing page, so every client-side navigation went unrecorded.
    const controller = new AbortController();

    fetch(`${BACKEND_URL}/api/analytics/visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_visited: pathname || "/",
        referrer: document.referrer || undefined,
      }),
      signal: controller.signal,
    }).catch((err) => {
      if (err?.name !== "AbortError") console.warn("Visitor DB logging notice:", err);
    });

    return () => controller.abort();
  }, [pathname]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <VisitorTracker />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;


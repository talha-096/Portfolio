import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404: no route matches", location.pathname);
  }, [location.pathname]);

  return (
    // The previous markup used `glass-card` and `hero-text` — leftovers from the
    // starter template that are defined nowhere in this project, so the card had
    // no background and the heading no styling. These are the site's own tokens.
    <div className="min-h-screen bg-bg text-text flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center rounded-2xl border border-line bg-panel p-10">
        <div className="font-mono text-xs uppercase tracking-widest text-cyan mb-3">
          Error 404
        </div>
        <h1 className="text-7xl font-medium mb-4">404</h1>
        <p className="text-lg mb-2">This page doesn&apos;t exist or has been moved.</p>
        <p className="text-muted mb-8 break-all font-mono text-sm">{location.pathname}</p>
        <Link to="/" className="btn btn-primary justify-center">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

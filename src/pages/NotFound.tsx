import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-mountain">
      <div className="text-center glass-card p-12 rounded-2xl max-w-md mx-4">
        <h1 className="text-8xl font-bold mb-4 hero-text">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

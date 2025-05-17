
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-brand-600">404</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center">
        Oops! This page couldn't be found
      </p>
      <Button asChild>
        <Link to="/" className="px-6">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;

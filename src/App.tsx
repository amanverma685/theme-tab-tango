
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import MobileFrame from "@/components/MobileFrame";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddResource from "./pages/AddResource";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <ProfileProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <MobileFrame>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add" element={<AddResource />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MobileFrame>
          </BrowserRouter>
        </ProfileProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

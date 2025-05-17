
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
import PaymentHelp from "./pages/PaymentHelp";

// Placeholder pages for demonstration
const SubjectsPage = () => <div className="p-6 pt-20 pb-20 text-center">Subjects Page</div>;
const ChaptersPage = () => <div className="p-6 pt-20 pb-20 text-center">Chapters Page</div>;
const QuestionsPage = () => <div className="p-6 pt-20 pb-20 text-center">Questions Page</div>;
const PaymentPage = () => <div className="p-6 pt-20 pb-20 text-center">Payment Page</div>;
const ClassesPage = () => <div className="p-6 pt-20 pb-20 text-center">Classes Page</div>;
const QuickSelectionPage = () => <div className="p-6 pt-20 pb-20 text-center">Quick Selection Page</div>;
const FormatsPage = () => <div className="p-6 pt-20 pb-20 text-center">Formats Page</div>;
const ExpertPapersPage = () => <div className="p-6 pt-20 pb-20 text-center">Expert Papers Page</div>;

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
                
                {/* New routes for the added functionality */}
                <Route path="/subjects" element={<SubjectsPage />} />
                <Route path="/chapters/:subjectId" element={<ChaptersPage />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment-help" element={<PaymentHelp />} />
                <Route path="/classes" element={<ClassesPage />} />
                <Route path="/quick-selection" element={<QuickSelectionPage />} />
                <Route path="/formats" element={<FormatsPage />} />
                <Route path="/expert-papers" element={<ExpertPapersPage />} />
                
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

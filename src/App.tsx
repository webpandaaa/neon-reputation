import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import AllianzPosts from "./pages/AllianzPosts";
import { ChatBot } from "./components/ChatBot";
import SignalIdunaPosts from "./pages/SignalIdunaPosts";
import GeneraliPosts from "./pages/GeneraliPosts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/allianzposts" element={<AllianzPosts />} />
                <Route path="/signalidunaposts" element={<SignalIdunaPosts />} />
                <Route path="/generaliposts" element={<GeneraliPosts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/competitors/:competitor" element={<CompetitorAnalysis />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <ChatBot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

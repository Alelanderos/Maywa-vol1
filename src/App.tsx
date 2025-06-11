
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Simulations from "./pages/Simulations";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/simulations" element={<AppLayout><Simulations /></AppLayout>} />
          <Route path="/virtual lab" element={<AppLayout><div className="p-6">Virutal lab Page (Coming Soon)</div></AppLayout>} />
          <Route path="/products" element={<AppLayout><Products /></AppLayout>} />
          <Route path="/products/:id" element={<AppLayout><ProductView /></AppLayout>} />
          <Route path="/documents" element={<AppLayout><div className="p-6">Documents Page (Coming Soon)</div></AppLayout>} />
          <Route path="/tasks" element={<AppLayout><div className="p-6">Tasks Page (Coming Soon)</div></AppLayout>} />
          <Route path="/haccp" element={<AppLayout><div className="p-6">HACCP Protocol Page (Coming Soon)</div></AppLayout>} />
          <Route path="/quality" element={<AppLayout><div className="p-6">Quality Plan Page (Coming Soon)</div></AppLayout>} />
          <Route path="/nom-051" element={<AppLayout><div className="p-6">NOM-051 Page (Coming Soon)</div></AppLayout>} />
          <Route path="/cofepris" element={<AppLayout><div className="p-6">COFEPRIS Page (Coming Soon)</div></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

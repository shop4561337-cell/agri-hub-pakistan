import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Crops from "@/pages/Crops";
import Weather from "@/pages/Weather";
import Chat from "@/pages/Chat";
import Fertilizers from "@/pages/Fertilizers";
import Pests from "@/pages/Pests";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { farmerId } = useAuth();
  if (!farmerId) return <Redirect to="/login" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/crops">
        <ProtectedRoute component={Crops} />
      </Route>
      <Route path="/weather">
        <ProtectedRoute component={Weather} />
      </Route>
      <Route path="/chat">
        <ProtectedRoute component={Chat} />
      </Route>
      <Route path="/fertilizers" component={Fertilizers} />
      <Route path="/pests" component={Pests} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;

/** Quarry Specimen global shell: a light paper foundation supports a dark canvas editorial storefront. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/HomeChapters";
import About from "./pages/About";
import DeepDive from "./pages/DeepDive";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const routeEase = [0.23, 1, 0.32, 1] as const;

// ROUTE SCROLL RESTORATION — NORMAL VAILE PAGE CHANGES BEGIN AT THE TOP;
// HASH LINKS KEEP THEIR INTENTIONAL LOCAL TARGETS, INCLUDING #enquiry.
function RouteScrollReset() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();
  const reducedMotion = useReducedMotion();
  const transitionDuration = reducedMotion ? 0 : 0.2;

  return (
    <AnimatePresence initial={false} mode="wait">
      {/* FIELD-DOSSIER ROUTE MOTION — A BRIEF PAPER-TO-CANVAS LIFT, NEVER A FULL-SCREEN TRANSITION. */}
      <motion.div
        key={location}
        className="route-transition"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
        transition={{ duration: transitionDuration, ease: routeEase }}
      >
        <Suspense fallback={<main className="route-loading" aria-live="polite">LOADING RECORD…</main>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/deep-dive" component={DeepDive} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <RouteScrollReset />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

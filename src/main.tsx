import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/main.scss";
import App from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

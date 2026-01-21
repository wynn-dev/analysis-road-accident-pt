/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Presentation } from "./Presentation";
import { Script } from "./Script";
import "./index.css";

const elem = document.getElementById("root")!;

// Simple client-side routing
const path = window.location.pathname;
const getComponent = () => {
  if (path === '/presentation') return <Presentation />;
  if (path === '/script') return <Script />;
  return <App />;
};
const component = getComponent();

const app = (
  <StrictMode>
    {component}
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}

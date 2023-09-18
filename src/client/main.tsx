import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBound";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback="Has error.">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

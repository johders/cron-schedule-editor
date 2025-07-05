import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import toastOptions from "./utils/toastOptions.js";
import App from "./App.jsx";
import "./styles/variables.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-center" toastOptions={toastOptions} />
  </StrictMode>
);

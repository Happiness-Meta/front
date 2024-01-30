import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodePage from "./pages/CodePage/CodePage";
import LoginPage from "./pages/LoginPage/LoginPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/codePage" element={<CodePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

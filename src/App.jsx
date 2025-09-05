import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Health from "./pages/Health";
import NotFound from "./pages/NotFound";
import LeadExportPage from "./pages/LeadExportPage";

function App() {
  return (
    <Router basename="/eny-consulting-frontend">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health" element={<Health />} />
        <Route path="/home" element={<Home />} />
        <Route path="/export" element={<LeadExportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

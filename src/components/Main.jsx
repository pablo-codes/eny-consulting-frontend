import React from "react";
import { useLocation } from "react-router-dom";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Main = ({ children }) => {
  const location = useLocation();
  const isChatPage = location.pathname === "/"; // base page check

  return (
    <div className="chat-container flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      {!isChatPage && <Footer />}
    </div>
  );
};

export default Main;

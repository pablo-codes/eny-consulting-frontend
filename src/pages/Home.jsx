import React from "react";
import Main from "../components/Main";
import ChatInterface from "../components/chat/ChatInterface";

const Home = () => {
  return (
    <Main>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </Main>
  );
};

export default Home;

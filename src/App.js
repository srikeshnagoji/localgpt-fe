import React, { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <h1 className="logo">Alfred.ai</h1>
          <h3>Powered by Airbus S&TI</h3>
        </header>
        <ChatWindow />
      </div>
    </NextUIProvider>
  );
}

export default App;

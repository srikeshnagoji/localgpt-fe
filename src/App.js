import React, { useState } from "react";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import { NextUIProvider } from "@nextui-org/react";
import { motion } from "framer-motion";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <motion.div
          className="box"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <header className="App-header">
            <h1 className="logo">AIRIES</h1>
            <h2 className="sub-title">Ink to Insights: LLM for Airbus</h2>
            <h4>Powered by Airbus S&TI</h4>
          </header>
        </motion.div>

        <ChatWindow />
      </div>
    </NextUIProvider>
  );
}

export default App;

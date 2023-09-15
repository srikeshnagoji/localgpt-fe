import React, { useState } from "react";
import Message from "./Message";
import { fetchResponse } from "../services/ApiService";
import Typewriter from "typewriter-effect";
import axios from "axios";
import "./ChatWindow.css";
import { Button, ButtonGroup, Textarea, Spacer } from "@nextui-org/react";
import { Card, CardBody, Avatar, Skeleton } from "@nextui-org/react";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ScrollShadow } from "@nextui-org/react";

//   background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleUserMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true); // Set loading to true when the request is initiated

    try {
      let bodyFormData = new FormData();
      bodyFormData.append("user_prompt", userInput);
      const response = await axios.post(
        "http://localhost:5110/api/prompt_route", //actual
        // "http://localhost:3130/api/prompt_route", //temp
        bodyFormData
      );
      const newMessage = {
        prompt: userInput,
        answer: response.data.Answer,
        metadata: response.data.Sources,
        // isUser: false,
      };
      setUserInput("");
      setMessages([...messages, newMessage]);
      //   console.log(response.data.Sources);
    } catch (error) {
      console.error("Error sending user prompt:", error);
    } finally {
      setIsLoading(false); // Set loading back to false after the request is complete
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      handleUserMessage();
    }
  };

  return (
    <>
      <div className="ChatContainer">
        {/* <div className="MessagesContainer"> */}
        <ScrollShadow className="snap-y w-[300px] h-[400px] MessagesContainer">
          {messages.length === 0 && (
            <div className=" snap-center typewriter">
              <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.6,
                  delay: 1.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "What is mach?",
                      "Tell me about Airbus.",
                      "what are the materials used in an aircraft?",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 0.01,
                  }}
                />
              </motion.div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              style={{
                padding: "1em",
              }}
            >
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
                <Card key={"card" + index}>
                  <CardBody className="flex-col gap-3 items-center">
                    <CardBody className="flex-col gap-3 items-center">
                      <CardBody className="flex-row gap-3 items-center">
                        <Avatar
                          name="You"
                          size="md"
                          key={"you" + index}
                          className="shrink-0"
                          isBordered
                          color="secondary"
                        />
                        <p>{message.prompt}</p>
                      </CardBody>

                      <CardBody className="flex-row gap-3 items-center">
                        <Avatar
                          name="AIRIES"
                          size="md"
                          key={"AIRIES" + index}
                          className="shrink-0"
                          isBordered
                          color="primary"
                          src="/bot.png"
                        />
                        <p>{message.answer}</p>
                      </CardBody>

                      <Divider />
                    </CardBody>
                    <div className="text-base">Sources:</div>
                    <Accordion isCompact>
                      {message.metadata.map((obj, i) => (
                        <AccordionItem
                          key={index + i}
                          // aria-label="Accordion 1"
                          title={obj[1].substr(0, 30) + "..."}
                          subtitle={<span>{obj[0]}</span>}
                        >
                          {obj[1]}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardBody>
                </Card>
              </motion.div>
              {/* <Spacer x={12} /> */}
            </div>
          ))}
        </ScrollShadow>
        {/* </div> */}
      </div>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.3,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="UserInputContainer sticky top-0 z-50">
          <Textarea
            //   label="Description"
            labelPlacement="outside"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth={true}
            size="lg"
            classNames="w-5/6"
          />
          <Spacer x={5} />
          <Button
            color="primary"
            isLoading={isLoading}
            onClick={handleUserMessage}
            size="lg"
            className={"w-40 shrink-0"}
          >
            {isLoading ? "Processing..." : "Send"}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default ChatWindow;

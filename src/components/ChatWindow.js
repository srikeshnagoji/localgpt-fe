import React, { useState } from "react";
import Message from "./Message";
import { fetchResponse } from "../services/ApiService";
import styled from "styled-components";
import axios from "axios";
import "./ChatWindow.css";
import { Button, ButtonGroup, Textarea, Spacer } from "@nextui-org/react";
import { Card, CardBody, Avatar } from "@nextui-org/react";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";

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
        "http://localhost:5110/api/prompt_route",
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
        <div className="MessagesContainer">
          {messages.map((message, index) => (
            <div
              style={{
                padding: "1em",
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
                      />
                      <p>{message.prompt}</p>
                    </CardBody>

                    <CardBody className="flex-row gap-3 items-center">
                      <Avatar
                        name="Alfred"
                        size="md"
                        key={"Alfred" + index}
                        className="shrink-0"
                      />
                      <p>{message.answer}</p>
                    </CardBody>

                    <Divider />
                  </CardBody>
                  <p>Sources:</p>
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
              {/* <Spacer x={12} /> */}
            </div>
          ))}
        </div>
      </div>
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
          className="w-40 shrink-0"
        >
          {isLoading ? "Processing..." : "Send"}
        </Button>
      </div>
    </>
  );
};

export default ChatWindow;

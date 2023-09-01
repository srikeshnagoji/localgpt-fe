import React from "react";

const Message = ({ message }) => {
  return (
    <div className={`message ${message.isUser ? "user" : "bot"}`}>
      <p className="text">{message.text}</p>
      {message.metadata && (
        <div className="metadata">
          <p>
            Extracted from: {message.metadata.document}, Page:{" "}
            {message.metadata.page}
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;

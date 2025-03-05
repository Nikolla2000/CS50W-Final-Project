import React from "react";
import TextMessageComponent from "./TextMessageComponent";
import productinoGif from "../../assets/productino.gif";

export type TextMessageType = {
  role: 'user' | 'assistant'
  content: string | React.ReactNode;
}

export default function ConversationHistory({ conversationHistory } : { conversationHistory: TextMessageType[] | [] }) {

  if (!conversationHistory.length) {
    return (
      <div>
        <h1 className="productiono-heading">Productino AI</h1>
        <img src={productinoGif} alt="productino ai robot" className="productino-gif"/>
      </div>
    )
  }

  return (
    <div className="chat-wrapper">
      {conversationHistory.map((message, index) => (
        <TextMessageComponent message={message} key={index} />
      ))}
    </div>
  );
}
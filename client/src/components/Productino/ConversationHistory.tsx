import React from "react";
import TextMessageComponent from "./TextMessageComponent";
import productinoGif from "../../assets/productino.gif";
import { TypeAnimation } from "react-type-animation";
import { Container, Row, Col } from "react-bootstrap";

export type TextMessageType = {
  role: 'user' | 'assistant'
  content: string | React.ReactNode;
}

export default function ConversationHistory({ conversationHistory } : { conversationHistory: TextMessageType[] | [] }) {

  if (!conversationHistory.length) {
    return (
      <div>
        {/* <h1 className="productino-heading">Productino AI</h1> */}
        <img src={productinoGif} alt="Productino AI robot" className="productino-gif"/>
        <div className="productino-greeting">
          <TypeAnimation 
            sequence={["Hello fellow traveller 👋 I'm Productino and I'm here to help you boost your productivity, stay focused, and beat procrastination. Whether you're working on a big project or just need a little guidance to stay on track, I can provide tips, create to-do lists, and offer advice to help you reach your goals. Just type in a question or pick one of the prompts below to get started."]}
            speed={80}
          />
        </div>
        <div className="example-prompts">
            <div className="flex-container">
              <button className="btn btn-primary flex-item">How can I stay focused while working on a big project?</button>
              <button className="btn btn-primary flex-item">Give me a to-do list to help me stay productive today.</button>
            </div>
            <div className="flex-container">
              <button className="btn btn-primary flex-item">How can I overcome procrastination when I have a deadline approaching?</button>
            </div>
        </div>
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
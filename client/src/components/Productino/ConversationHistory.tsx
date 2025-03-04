import { useEffect, useRef, useState } from "react";
import { fetchConversation } from "../../services/productinoService";
import TextMessageComponent from "./TextMessageComponent";

export type TextMessageType = {
  role: 'user' | 'assistant'
  content: string
}

export default function ConversationHistory({ conversationHistory } : { conversationHistory: TextMessageType[] | [] }) {

  if (!conversationHistory) {
    return <div>test</div>
  }

  return (
    <div className="chat-wrapper">
      {conversationHistory.map((message, index) => (
        <TextMessageComponent message={message} key={index} />
      ))}
    </div>
  );
}
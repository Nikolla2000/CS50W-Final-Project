import { useEffect, useRef, useState } from "react";
import { fetchConversation } from "../../services/productinoService";
import TextMessageComponent from "./TextMessageComponent";

export type TextMessageType = {
  role: 'user' | 'assistant'
  content: string
}

export default function ConversationHistory() {
  const [conversationHistory, setConversationHistory] = useState<TextMessageType[]>([]);

  useEffect(() => {
    const getConversation = async () => {
        const data = await fetchConversation();
        setConversationHistory(data);
    };

    getConversation();
  }, []);

  // useEffect(() => {
  //   // Scroll to the bottom when conversationHistory is updated
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "instant", block: "end" });
  //   }
  // }, [conversationHistory])

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
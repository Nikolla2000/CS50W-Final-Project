import { useEffect, useState } from "react";
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
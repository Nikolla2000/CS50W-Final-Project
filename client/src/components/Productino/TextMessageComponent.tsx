import { TextMessageType } from "./ConversationHistory";

export default function TextMessageComponent({ message } : { message: TextMessageType}) {
  return (
    <div className={`text-msg-wrapper ${message.role == 'user' ? 'text-msg-user' : 'text-msg-assistant'}`}>
      <p>{message.content}</p>
    </div>
  )
}
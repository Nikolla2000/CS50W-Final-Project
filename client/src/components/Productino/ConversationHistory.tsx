import React, { useContext } from "react";
import TextMessageComponent from "./TextMessageComponent";
import productinoGif from "../../assets/productino.gif";
import { TypeAnimation } from "react-type-animation";
import { promptChatBot } from "../../services/productinoService";
import { useAuth } from "../../providers/AuthProvider";
import { ProductinoContext } from "../../pages/ProductinoPage";

export type TextMessageType = {
  role: 'user' | 'assistant'
  content: string | React.ReactNode;
}


export default function ConversationHistory() {
  const authContext = useAuth();
  const { csrf } = authContext;
  const context = useContext(ProductinoContext);

  if (!context) {
    throw new Error("ConversationHistory must be used within a ProductinoContext.Provider");
  }

  const { conversationHistory, setConversationHistory, removeAiLoader, isAiTyping, setIsAiTyping } = context;
  
  const handleSubmitExamplePrompt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newMessage: TextMessageType = {
      role: "user",
      content: e.currentTarget.innerText
    };
    setIsAiTyping(true);
    setConversationHistory(newMessage);

    const aiResponseLoading: TextMessageType = {
      role: "assistant",
      content: <div className="loader"></div>
    };
    setConversationHistory(aiResponseLoading);

    const data = { message: e.currentTarget.innerText };
    const resData = await promptChatBot(data, csrf);

    const aiResponse: TextMessageType = {
      role: "assistant",
      content: <TypeAnimation 
                        sequence={[resData.message, () => setIsAiTyping(false)]}
                        speed={90}
                        cursor={false}/>
    };
    removeAiLoader();
    setConversationHistory(aiResponse);
  }
  
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
              <button className="btn btn-primary flex-item" onClick={handleSubmitExamplePrompt}>How can I stay focused while working on a big project?</button>
              <button className="btn btn-primary flex-item"  onClick={handleSubmitExamplePrompt}>Give me a to-do list to help me stay productive today.</button>
            </div>
            <div className="flex-container">
              <button className="btn btn-primary flex-item"  onClick={handleSubmitExamplePrompt}>How can I overcome procrastination when I have a deadline approaching?</button>
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
import { createContext, useEffect, useRef, useState } from 'react';
import { fetchConversation } from '../services/productinoService';
import ConversationHistory, { TextMessageType } from '../components/Productino/ConversationHistory';
import "../components/Productino/productino.css";
import PromptForm from '../components/Productino/PromptForm';

export type PromptFormValues = {
  message: string
}

export type ProductinoContextType = {
  conversationHistory: TextMessageType[];
  setConversationHistory: React.Dispatch<React.SetStateAction<TextMessageType[]>>;
  isAiTyping: boolean;
  setIsAiTyping: (isTyping: boolean) => void;
  removeAiLoader: () => void;
};

export const ProductinoContext = createContext<ProductinoContextType | null>(null);

export default function ProductinoPage() {
	const [conversationHistory, setConversationHistory] = useState<TextMessageType[]>([]);
	const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const getConversation = async () => {
			const data = await fetchConversation();
			console.log(data);
			setConversationHistory(data);
		};

		getConversation();
	}, []);

	useEffect(() => {
		// Scroll to bottom
		if (bottomRef.current  && conversationHistory.length > 0) {
			bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
  	}, [conversationHistory])


	const updateConversationHistory = (newMessage: TextMessageType) => {
		setConversationHistory(prev => [...prev, newMessage]);
	};

	const removeAiLoader = () => {
		setConversationHistory(prev => prev.slice(0, -1));
	}

	return (
        <ProductinoContext.Provider
          value={{
            conversationHistory,
            setConversationHistory: updateConversationHistory,
            isAiTyping,
            setIsAiTyping,
            removeAiLoader,
          }}
        >
          <div className="productino-page-wrapper">
            <ConversationHistory />
            <PromptForm />
            <div ref={bottomRef} />
          </div>
        </ProductinoContext.Provider>
      );
}
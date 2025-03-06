import { useEffect, useRef, useState } from 'react';
import { fetchConversation } from '../services/productinoService';
import ConversationHistory, { TextMessageType } from '../components/Productino/ConversationHistory';
import "../components/Productino/productino.css";
import PromptForm from '../components/Productino/PromptForm';

export type PromptFormValues = {
  message: string
}


export default function ProductinoPage() {
	const [conversationHistory, setConversationHistory] = useState<TextMessageType[]>([]);

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


	const bottomRef = useRef(null);

	const updateConversationHistory = (newMessage: TextMessageType) => {
		setConversationHistory(prev => [...prev, newMessage]);
	};

	const removeAiLoader = () => {
		setConversationHistory(prev => prev.slice(0, -1));
	}

	return (
		<div className='productino-page-wrapper'>
			<ConversationHistory conversationHistory={conversationHistory}/>
			<PromptForm conversationHistory={conversationHistory} setConversationHistory={updateConversationHistory} removeAiLoader={removeAiLoader}/>
			<div ref={bottomRef}/>
		</div>
	);
}
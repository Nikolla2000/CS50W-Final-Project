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
			setConversationHistory(data);
		};

		getConversation();
	}, []);

	useEffect(() => {
		// Scroll to bottom
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
  	}, [conversationHistory])


	const bottomRef = useRef(null);

	useEffect(() => {
		const getConversation = async() => {
			await fetchConversation();
		}

		getConversation();
	}, [])


	return (
		<div className='productino-page-wrapper'>
		<ConversationHistory conversationHistory={conversationHistory}/>
		<PromptForm/>
		<div ref={bottomRef}/>
		</div>
	);
}
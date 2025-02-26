import React, { useEffect } from 'react';
import { fetchConversation, promptChatBot } from '../services/productinoService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../axiosConfig';

export type PromptFormValues = {
  message: string
}

const schema = z.object({
  message = z.string().min(1).max(2000)
})

export default function ProductinoPage() {

  useEffect(() => {
    fetchConversation();
  }, [])

  const {  control, handleSubmit, formState: { errors } } = useForm<PromptFormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: PromptFormValues) => {
    promptChatBot(data);
  }

  return (
    <div className='productino-page-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input
          type="text"
          placeholder='Ask
          anything'
          name="message"
          id="message"
          required/> */}
      </form>
    </div>
  );
}
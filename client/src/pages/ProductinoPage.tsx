import React, { useEffect } from 'react';
import { fetchConversation, promptChatBot } from '../services/productinoService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../axiosConfig';
import { TextField } from '@mui/material';

export type PromptFormValues = {
  message: string
}

const schema = z.object({
  message: z.string().min(1).max(2000)
})

export default function ProductinoPage() {

  useEffect(() => {
	const getConversation = async() => {
		await fetchConversation();
	}

	getConversation();
  }, [])

  const {  control, handleSubmit, formState: { errors } } = useForm<PromptFormValues>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: PromptFormValues) => {
    promptChatBot(data);
	await fetchConversation();
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
          <div style={{ marginBottom: '16px' }}>
			<Controller
				name="message"
				control={control}
				defaultValue=""
				render={({ field }) => (
					<TextField
						{...field}
						variant="outlined"
						fullWidth
						sx={{
							borderRadius: '25px',
							'& .MuiOutlinedInput-root': {
								borderRadius: '25px',
							},
						}}
						helperText={errors.message?.message}
					/>
				)}
			/>
          </div>
		  <input type="submit" />
      </form>
    </div>
  );
}
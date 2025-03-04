import React, { useEffect, useRef, useState } from 'react';
import { fetchConversation, promptChatBot } from '../services/productinoService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../axiosConfig';
import { TextField } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import ConversationHistory from '../components/Productino/ConversationHistory';
import "../components/Productino/productino.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export type PromptFormValues = {
  message: string
}

const schema = z.object({
  message: z.string().min(1).max(2000)
})

export default function ProductinoPage() {
  const authContext = useAuth();
  const { csrf } = authContext;

  const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(50);

  const bottomRef = useRef(null);

  useEffect(() => {
	const getConversation = async() => {
		await fetchConversation();
	}

	getConversation();
  }, [])

  const {  control, handleSubmit, formState: { errors } } = useForm<PromptFormValues>({
    resolver: zodResolver(schema)
  })

  const handleInputChange = (e) => {
	if (e.target.value.length > 0) {
		setShowSubmitBtn(true);
	} else {
		setShowSubmitBtn(false);
	}

	const textareaLineHeight = 24; // You can adjust this value as needed
    const previousHeight = e.target.scrollHeight;
    const newHeight = Math.max(50, Math.min(200, previousHeight)); // Set min and max height

    // Reset height to default if input is empty
    if (e.target.value.length === 0) {
      setInputHeight(50); // Reset to the initial height
    } else {
      setInputHeight(newHeight); // Adjust height based on content
    }
  }

  const onSubmit = async (data: PromptFormValues) => {
  await promptChatBot(data, csrf);
	await fetchConversation();
  }

  return (
    <div className='productino-page-wrapper'>
      <ConversationHistory />
      <div className="prompt-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} id='prompt-form'>
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
                  multiline
                  rows={1} // Initial height (rows)
                  maxRows={5} // Maximum number of rows before it stops growing
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                  placeholder='Ask anything'
                  sx={{
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                      boxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)',
                      WebkitBoxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)', // For Safari
                      MozBoxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)', // For Firefox
                    },
                  }}
                  helperText={errors.message?.message}
                  inputProps={{
                    style: {
                      height: `${inputHeight}px`, // Dynamically update height
                    },
                  }}
                />
              )}
            />
            {showSubmitBtn &&
              <button type="submit" id='prompt-submit-btn'>
                <ArrowUpwardIcon style={{ color: '#fff', fontWeight: 'bold' }} />
              </button>
            }
          </div>
		  <p className='productino-warning'>Productino can make mistakes. Check important info.</p>
        </form>
      </div>
	  <div ref={bottomRef}/>
    </div>
  );
}
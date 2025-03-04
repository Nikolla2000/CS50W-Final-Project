import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { promptChatBot } from "../../services/productinoService";
import { useState } from "react";
import { PromptFormValues } from "../../pages/ProductinoPage";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../providers/AuthProvider";
import { TextMessageType } from "./ConversationHistory";
import { TypeAnimation } from 'react-type-animation';

const schema = z.object({
    message: z.string().min(1).max(2000)
  })

  export default function PromptForm({
    conversationHistory,
    setConversationHistory,
    removeAiLoader,
  }: {
    conversationHistory: TextMessageType[];
    setConversationHistory: (newMessage: TextMessageType) => void;
    removeAiLoader: () => void;
  }) {

    const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);
    const [inputHeight, setInputHeight] = useState<number>(50);

    const authContext = useAuth();
    const { csrf } = authContext;

    const {  control, handleSubmit, reset, formState: { errors } } = useForm<PromptFormValues>({
        resolver: zodResolver(schema)
    })

    //Function that shows the submit button only when writing in the input and increasing input rows on longer messages
    const handleInputChange = (e) => {
        if (e.target.value.length > 0) {
            setShowSubmitBtn(true);
        } else {
            setShowSubmitBtn(false);
        }
    
        const textareaLineHeight = 24;
        const previousHeight = e.target.scrollHeight;
        const newHeight = Math.max(50, Math.min(200, previousHeight));
    
        if (e.target.value.length === 0) {
          setInputHeight(50);
        } else {
          setInputHeight(newHeight);
        }
    }

    //Submit the message with Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }
    };
    

    const onSubmit = async (data: PromptFormValues) => {
        const newMessage: TextMessageType = { 
            role: "user",
            content: data.message 
        };
        setConversationHistory(newMessage);

        reset({
            message: "",
        });

        const aiRespponseLoading: TextMessageType = { 
            role: "assistant",
            content: <div className="loader"></div>
        };
        setConversationHistory(aiRespponseLoading);

        const resData = await promptChatBot(data, csrf);
        const aiReposne: TextMessageType = {
            role: "assistant",
            content: <TypeAnimation 
                        sequence={[resData.message]}
                        speed={80}
                        cursor={false}/>
        }
        removeAiLoader();
        setConversationHistory(aiReposne);
        // await fetchConversation();

    }

    return (
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
                    rows={1}
                    maxRows={5}
                    onChange={(e) => {
                        field.onChange(e);
                        handleInputChange(e);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder='Ask anything'
                    sx={{
                        borderRadius: '25px',
                        '& .MuiOutlinedInput-root': {
                        borderRadius: '25px',
                        boxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)',
                        WebkitBoxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)',
                        MozBoxShadow: '0px 0px 13px -3px rgba(0, 0, 0, 0.75)',
                        },
                    }}
                    // helperText={errors.message?.message}
                    inputProps={{
                        style: {
                        height: `${inputHeight}px`,
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
    )
}
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { promptChatBot, fetchConversation } from "../../services/productinoService";
import { useState, useContext } from "react";
import { ProductinoContext } from "../../pages/ProductinoPage";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SquareIcon from "@mui/icons-material/Square";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../providers/AuthProvider";
import { TypeAnimation } from "react-type-animation";
import api from "../../axiosConfig";

const schema = z.object({
  message: z.string().min(1).max(2000),
});

export default function PromptForm() {
  const context = useContext(ProductinoContext);

  if (!context) {
    throw new Error("PromptForm must be used within a ProductinoContext.Provider");
  }

  const { conversationHistory, setConversationHistory, removeAiLoader, isAiTyping, setIsAiTyping } = context;

  const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(50);

  const authContext = useAuth();
  const { csrf } = authContext;

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
      setShowSubmitBtn(true);
    } else {
      setShowSubmitBtn(false);
    }

    const textareaLineHeight = 24;
    const previousHeight = e.target.scrollHeight;
    const newHeight = Math.max(50, Math.min(200, previousHeight));

    setInputHeight(e.target.value.length === 0 ? 50 : newHeight);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data) => {
    if (isAiTyping) return;

    const newMessage = {
      role: "user",
      content: data.message,
    };
    setConversationHistory(newMessage);

    reset({ message: "" });

    const aiResponseLoading = {
      role: "assistant",
      content: <div className="loader"></div>,
    };
    setIsAiTyping(true);
    setConversationHistory(aiResponseLoading);

    const resData = await promptChatBot(data, csrf);
    const aiResponse = {
      role: "assistant",
      content: <TypeAnimation sequence={[resData.message, () => setIsAiTyping(false)]} speed={90} cursor={false} />,
    };

    removeAiLoader();
    setConversationHistory(aiResponse);
  };

  const clearChatHistory = async () => {
    try {
      await api.delete("/productino/chat/", {
        headers: { "X-CSRFToken": csrf },
        withCredentials: true,
      });

      const updatedHistory = await fetchConversation();
      setConversationHistory(updatedHistory);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${conversationHistory.length === 0 ? "prompt-form-wrapper-not-fixed" : "prompt-form-wrapper"}`}>
      <form onSubmit={handleSubmit(onSubmit)} id="prompt-form">
        <div style={{ marginBottom: "16px" }} className="input-submit-wrapper">
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
                placeholder="Ask anything"
                sx={{
                  borderRadius: "25px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    boxShadow: "0px 0px 13px -3px rgba(0, 0, 0, 0.75)",
                  },
                }}
                inputProps={{
                  style: {
                    height: `${inputHeight}px`,
                  },
                }}
              />
            )}
          />
          {showSubmitBtn && (
            <button type="submit" id="prompt-submit-btn">
              {isAiTyping ? <SquareIcon style={{ color: "#fff", fontSize: "14px", padding: "5px" }} /> : <ArrowUpwardIcon style={{ color: "#fff" }} />}
            </button>
          )}
        </div>
        <p className="productino-warning">Productino can make mistakes. Check important info.</p>
      </form>

      {/* <button onClick={clearChatHistory} className="clear-chat-button">
        Clear Chat History
      </button> */}
    </div>
  );
}

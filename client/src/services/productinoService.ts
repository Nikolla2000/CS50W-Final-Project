import api from "../axiosConfig";
import { PromptFormValues } from "../pages/ProductinoPage";

export const fetchConversation = async () => {
    try {
        const res = await api.get("/productino/chat");
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}


export const promptChatBot = async (data: PromptFormValues) => {
    try {
        const res = await api.post("/productino/chat", data);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
}
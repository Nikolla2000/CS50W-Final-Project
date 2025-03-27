import api from "../axiosConfig";
import { TaskData } from "../components/Tasks/AddTaskForm";

export const fetchAddNewTask = async (data: TaskData, csrfToken:  string | null) => {
    try {
        const res = await api.post("/api/tasks/", data, {
            headers: {
                "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
        })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
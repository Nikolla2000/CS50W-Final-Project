import api from "../axiosConfig";
import { TaskData } from "../components/Tasks/AddTaskForm";
import { EditTaskFormValues } from "../components/Tasks/EditModal";

export const fetchTasks = async() => {
    try {
        const currentDate = new Date().toISOString().split("T")[0];
        const res = await api.get(`/api/tasks/?date=${currentDate}`, {
            withCredentials: true,
        });
        return res.data.tasks;
    } catch (err) {
        console.log(err);
    }
}


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


export const fetchDeleteTask = async (taskId: string, csrfToken: string | null) => {
    try {
        const res = await api.delete(`/api/tasks/${taskId}/`, 
        {
            headers: {
                "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}


export const fetchEditTask = async (data: EditTaskFormValues, taskId: string, csrfToken: string | null) => {
    try {
        const res = await api.put(`/api/tasks/${taskId}/`, {
            description: data.description, 
        },
        {
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
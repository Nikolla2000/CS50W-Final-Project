import { useEffect, useState } from "react";
import AddTaskForm, { TaskData } from "../components/Tasks/AddTaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import { fetchTasks } from "../services/taskService";

export default function TasksPage() {
    const [tasks, setTasks] = useState<TaskData[] | []>([]);

    const getTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div>
        <div className="tasks-list">
            {tasks.map((task, index) => (
                <TaskCard task={task} key={index}/>
            ))}
        </div>
        <AddTaskForm onTaskAdd={getTasks}/>
        </div>
    );
}
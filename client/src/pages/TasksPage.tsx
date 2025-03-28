import { useEffect, useState } from "react";
import AddTaskForm, { TaskData } from "../components/Tasks/AddTaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import { fetchTasks } from "../services/taskService";
import { Box } from "@mui/system";
import "../components/Tasks/tasks.css";

export default function TasksPage() {
    const [tasks, setTasks] = useState<TaskData[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className="tasks-page-wrapper">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <div className="loader"></div>
                </Box>
            ) : (
            <div className="tasks-list">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <TaskCard task={task} key={index}/>
                    ))

                ) : (
                    <p style={{ textAlign: "center", color: "#777", fontSize: "1.2rem" }}>
                    No tasks for this day.
                  </p>  
                )}
            </div>

            )}
            <AddTaskForm onTaskAdd={getTasks}/>
        </div>
    );
}
import { useEffect, useState } from "react";
import AddTaskForm, { TaskData } from "../components/Tasks/AddTaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import { fetchTasks } from "../services/taskService";
import { Box, Typography } from "@mui/material";
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
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Box className="tasks-page-wrapper" display="flex" gap={4} justifyContent="center">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <div className="loader"></div>
                </Box>
            ) : (
                <Box className="tasks-container">
                    <Typography variant="h4" className="tasks-heading" sx={{ marginBottom: "20px", fontSize: "1.7rem",}}>
                        📝 Today's Tasks
                    </Typography>

                    {tasks.length > 0 ? (
                        tasks.map((task, index) => <TaskCard task={task} key={index} />)
                    ) : (
                        <Typography className="no-tasks-message">
                            No tasks for today.
                        </Typography>
                    )}
                </Box>
            )}

            <Box className="add-task-form-container">
                <AddTaskForm onTaskAdd={getTasks} />
            </Box>
        </Box>
    );
}

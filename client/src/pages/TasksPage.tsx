import { useEffect, useState } from "react";
import AddTaskForm, { TaskData } from "../components/Tasks/AddTaskForm";
import TaskCard from "../components/Tasks/TaskCard";
import { fetchTasks } from "../services/taskService";
import { Box, Typography } from "@mui/material";
import "../components/Tasks/tasks.css";
import EditModal from "../components/Tasks/EditModal";

export default function TasksPage() {
    const [tasks, setTasks] = useState<TaskData[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

    const handleOpen = (task: TaskData) => {
        setSelectedTask(task);
        setOpen(true);
      };

    const handleUpdateTask = (updatedTask: TaskData) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

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
                        tasks.map((task) => <TaskCard task={task} key={task.id} onTaskDelete={getTasks} openEditModal={() => handleOpen(task)}/>)
                    ) : (
                        <Typography className="no-tasks-message" sx={{textAlign: 'left', fontSize: '1.2em' }}>
                            No tasks for today.
                        </Typography>
                    )}
                    <EditModal open={open} handleClose={handleClose} onUpdate={handleUpdateTask} task={selectedTask}/>
                </Box>
            )}

            <Box className="add-task-form-container">
                <AddTaskForm onTaskAdd={getTasks} />
            </Box>
        </Box>
    );
}

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

    const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [entranceAnimation, setEntranceAnimation] = useState<boolean>(true);

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
        if (tasks.length > 0) {
            const areAllTasksCompleted = tasks.every((task) => task.is_completed === true);
            setAllTasksCompleted(areAllTasksCompleted);
        } else {
            setAllTasksCompleted(false);
        }
    }, [tasks]);
    

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
                        tasks.map((task, i) => <TaskCard 
                                                task={task} 
                                                key={task.id} 
                                                onTaskDelete={getTasks} openEditModal={() => handleOpen(task)}
                                                isFirstLoad={isFirstLoad}
                                                isNewestTask={i === tasks.length - 1}
                                                setEntranceAnimation={setEntranceAnimation}
                                                entranceAnimation={entranceAnimation}/>)
                    ) : (
                        <Typography className="no-tasks-message" sx={{textAlign: 'left', fontSize: '1.2em' }}>
                            No tasks for today.
                        </Typography>
                    )}

                    {allTasksCompleted && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "20px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #4caf50, #81c784)",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                marginTop: "20px",
                                animation: "fadeIn 0.8s ease-in-out",
                                maxWidth: "400px"
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    letterSpacing: "1px",
                                }}
                            >
                                🎉 Well Done! 🎉
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#f1f1f1",
                                    textAlign: "center",
                                    marginTop: "5px",
                                    fontStyle: "italic",
                                }}
                            >
                                You've completed all your tasks for today! 🚀
                            </Typography>
                        </Box>
                    )}
                    <EditModal
                        open={open}
                        handleClose={handleClose}
                        onUpdate={handleUpdateTask}
                        task={selectedTask}
                    />
                </Box>
            )}

            <Box className="add-task-form-container">
                <AddTaskForm 
                    onTaskAdd={getTasks} 
                    setIsFirstLoad={setIsFirstLoad} 
                    setEntranceAnimation={setEntranceAnimation}/>
            </Box>
        </Box>
    );
}

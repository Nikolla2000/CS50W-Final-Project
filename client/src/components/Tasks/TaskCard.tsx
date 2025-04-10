import { TaskData } from "./AddTaskForm";
import { useState } from "react";
import { CheckCircle, Pencil, Trash } from "lucide-react";
import { fetchCompleteTask, fetchDeleteTask } from "../../services/taskService";
import { useAuth } from "../../providers/AuthProvider";
import 'animate.css';

export default function TaskCard({ task, onTaskDelete, openEditModal, onClick, isFirstLoad, isNewestTask }: { task: TaskData, onTaskDelete: () => void, openEditModal: () => void, onClick?: () => void, isFirstLoad: boolean, isNewestTask: boolean }) {
    const [completed, setCompleted] = useState(task.is_completed || false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const authContext = useAuth();
    const csrf = authContext?.csrf ?? null;

    const handleComplete = async () => {
        try {
            await fetchCompleteTask(task.id!, csrf);
            setCompleted(true);
            onTaskDelete();
        } catch (err) {
            console.log("Error completing task", err);
        }
    };

    const handleDeleteTask = async () => {
        if (!task.id) return;
    
        setIsDeleted(true);
    
        setTimeout(async () => {
            try {
                await fetchDeleteTask(task.id!, csrf);
                onTaskDelete();
            } catch (err) {
                console.log(err);
            }
        }, 500);
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={`task-card ${task.is_completed || completed ? "completed" : ""} ${isDeleted ? "animate__animated animate__backOutLeft": ""} ${!onClick  && !isFirstLoad && isNewestTask  ? "animate__animated animate__backInLeft" : ""}`} 
            onClick={handleCardClick}
            style={{ cursor: onClick ? "pointer" : "default" }}>
                
            <p className="task-text">{task.description}{task.id}</p>
            <div className="task-actions">
                {!completed && (
                    <>
                        <button className="task-btn edit-btn" onClick={openEditModal}>
                            <Pencil size={16}/>
                        </button>
                        <button className="task-btn complete-btn" onClick={handleComplete}>
                            <CheckCircle size={16} />
                        </button>
                    </>      
                )}
                <button className="task-btn delete-btn">
                    <Trash size={16} onClick={handleDeleteTask}/>
                </button>
            </div>
        </div>
    );
}

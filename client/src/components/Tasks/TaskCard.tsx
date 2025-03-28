import { TaskData } from "./AddTaskForm";
import { useState } from "react";
import { CheckCircle, Pencil, Trash } from "lucide-react";

export default function TaskCard({ task }: { task: TaskData }) {
    const [completed, setCompleted] = useState(task.is_completed || false);

    const handleComplete = () => {
        setCompleted(!completed);
        // Here you can also trigger an API call to update the task status
    };

    return (
        <div className={`task-card ${completed ? "completed" : ""}`}>
            <p className="task-text">{task.description}</p>
            <div className="task-actions">
                <button className="task-btn edit-btn">
                    <Pencil size={16} />
                </button>
                <button className="task-btn complete-btn" onClick={handleComplete}>
                    <CheckCircle size={16} />
                </button>
                <button className="task-btn delete-btn">
                    <Trash size={16} />
                </button>
            </div>
        </div>
    );
}

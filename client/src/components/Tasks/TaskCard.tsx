import { TaskData } from "./AddTaskForm";

export default function TaskCard({ task }: { task: TaskData }) {
    return (
        <div className="task-card-wrapper">
            <p>{task.description}</p>
        </div>
    )
}
import { GoalsData } from "./AddGoalForm";

export default function GoalCard({ goal } : { goal: GoalsData }) {
    return  (
        <div className="goal-card-wrapper">
            <p className="description">{goal.description}</p>
            <p className="deadline">{goal.deadline}</p>
        </div>
    )
}
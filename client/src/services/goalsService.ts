import api from "../axiosConfig";
import { GoalsData } from "../components/Goals/AddGoalForm";

export const fetchGoals = async () => {
    try {
        const res = await api.get("/api/goals/", {
            withCredentials: true,
        });
        return res.data.goals;
    } catch (err) {
        console.log(err);
    }
}

export const fetchAddNewGoal = async (data: GoalsData, csrfToken: string | null) => {
    try {
        const res = await api.post("/api/goals/", data, {
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

export const completeGoal = async (goalId: string) => {
    try {
        const res = await api.patch(`/api/goals/${goalId}/complete/`, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
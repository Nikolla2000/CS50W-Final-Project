import "../components/Goals/goals.css";
import { useEffect, useState } from "react";
import { GoalsData } from "../components/Goals/AddGoalForm";
import { fetchGoals } from "../services/goalsService";
import GoalCard from "../components/Goals/GoalCard";
import AddNewButton from "../components/AddNewButton/AddNewButton";
import CompleteModal from "../components/Goals/CompleteModal";
import { Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalsData[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<GoalsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("in-progress");

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalsData | null>(null);
  
  const handleOpen = (goal: GoalsData) => {
    setSelectedGoal(goal);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleGoalCompleted = (completedGoalId: string) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => 
        goal.id === completedGoalId 
          ? { ...goal, is_completed: true } 
          : goal
      )
    );
  };

  useEffect(() => {
    const getAllGoals = async () => {
      try {
        const data = await fetchGoals();
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch goals", error);
      } finally {
        setLoading(false);
      }
    };

    getAllGoals();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredGoals(goals);
    } else if (filter === "in-progress") {
      setFilteredGoals(goals.filter(goal => !goal.is_completed && new Date(goal.deadline) >= new Date()));
    } else if (filter === "completed") {
      setFilteredGoals(goals.filter(goal => goal.is_completed));
    } else if (filter === "failed") {
      setFilteredGoals(goals.filter(goal => !goal.is_completed && new Date(goal.deadline) < new Date()));
    }
  }, [filter, goals]);

  return (
    <div className="goals-page-wrapper">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl 
          sx={{
            minWidth: 200,
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#007bff",
            },
          }}
          size="small"
        >
          <InputLabel>Filter Goals</InputLabel>
          <Select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            label="Filter Goals"
          >
            <MenuItem value="all">🌍 All</MenuItem>
            <MenuItem value="in-progress">⚡ In Progress</MenuItem>
            <MenuItem value="completed">✅ Completed</MenuItem>
            <MenuItem value="failed">❌ Failed</MenuItem>
          </Select>
        </FormControl>

        <AddNewButton link="/addgoal">+ New Goal</AddNewButton>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <div className="loader"></div>
        </Box>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal, index) => (
              <GoalCard goal={goal} key={index} handleOpenModal={() => handleOpen(goal)} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#777", fontSize: "1.2rem" }}>
              No goals found in this category.
            </p>
          )}
        </div>
      )}

      <CompleteModal 
        open={open} 
        handleClose={handleClose} 
        goal={selectedGoal} 
        onGoalCompleted={handleGoalCompleted} 
      />
    </div>
  );
}
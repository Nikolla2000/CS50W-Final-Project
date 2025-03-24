import "../components/Goals/goals.css";
import { useEffect, useState } from 'react';
import { GoalsData } from '../components/Goals/AddGoalForm';
import { fetchGoals } from '../services/goalsService';
import GoalCard from '../components/Goals/GoalCard';
import AddNewButton from '../components/AddNewButton/AddNewButton';
import CompleteModal from "../components/Goals/CompleteModal";
import { Box, CircularProgress } from "@mui/material";

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalsData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //Modal state
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalsData | null>(null);
  const handleOpen = (goal: GoalsData) => {
    setSelectedGoal(goal);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
    }

    getAllGoals();
  }, []);


  return (
    <div>
      <AddNewButton link='/addgoal'>New Goal</AddNewButton>

      {!loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <div className="loader"></div>
        </Box>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <GoalCard goal={goal} key={index} handleOpenModal={() => handleOpen(goal)} />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#777', fontSize: '1.2rem' }}>
              No goals found. Start by adding a new goal!
            </p>
          )}
        </div>
      )}

      <CompleteModal open={open} handleClose={handleClose} goal={selectedGoal} />
    </div>
  );
}
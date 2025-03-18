import { Link } from 'react-router-dom';
import "../components/Goals/goals.css";
import { useEffect, useState } from 'react';
import { GoalsData } from '../components/Goals/AddGoalForm';
import { fetchGoals } from '../services/goalsService';
import GoalCard from '../components/Goals/GoalCard';
import AddNewButton from '../components/AddNewButton/AddNewButton';

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalsData[] | []>([]);

  useEffect( () => { 
    const getAllGoals = async () => {
      const data = await fetchGoals();
      console.log(data);
      setGoals(data);
    }

    getAllGoals();
  }, [])

  if (!goals.length) {
    return (
    <div>Loading...</div>
    )
  }

  return (
    <div>
      {/* <button>
        <Link to={'/addgoal'}>+ New Goal</Link>
      </button> */}
      <AddNewButton link='/addgoal'>New Goal</AddNewButton>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {goals.map((goal, index) => (
          <GoalCard goal={goal} key={index} />
        ))}
      </div>
    </div>
  );
}
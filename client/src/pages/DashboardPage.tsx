import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TaskCard from '../components/Tasks/TaskCard';
import { TaskData } from '../components/Tasks/AddTaskForm';
import { fetchTasks } from '../services/taskService';
import { GoalsData } from '../components/Goals/AddGoalForm';
import { fetchGoals } from '../services/goalsService';
import GoalCard from '../components/Goals/GoalCard';
import { useNavigate } from 'react-router';

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskData[] | []>([]);
  const [goals, setGoals] = useState<GoalsData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
    getAllGoals();
  }, [])

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

const getAllGoals = async () => {
  try {
    const data = await fetchGoals();
    setGoals(data);
    // setgoals(data);
  } catch (error) {
    console.error("Failed to fetch goals", error);
  } finally {
    // setLoading(false);
  }
};

const handleOpen = (goal: GoalsData) => {
  return;
}

  return (
    <Box className='dashboard-page-wrapper' p={3} minHeight={"100vh"}>
      {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <div className="loader"></div>
          </Box>
      ) : (
        <Box className="tasks-goals-container" display="flex" gap={4} justifyContent="center">
          
          <Box className="tasks-container">
              <Typography variant="h4" className="tasks-heading" sx={{ marginBottom: "20px", fontSize: "1.7rem",}}>
                  📝 Today's Tasks
              </Typography>

              {tasks.length > 0 ? (
                    tasks.map((task) => <TaskCard task={task} key={task.id} onTaskDelete={getTasks} openEditModal={() => handleOpen(task)} onClick={() => navigate("/tasks")}/>)
                ) : (
                    <Typography className="no-tasks-message" sx={{textAlign: 'left', fontSize: '1.2em' }}>
                        No tasks for today.
                    </Typography>
                )}
          </Box>

          <Box className="goals-container">
              <Typography variant="h4" className="" sx={{ marginBottom: "20px", fontSize: "1.7rem",}}>
                  Goals
              </Typography>
              {goals.length > 0 ? (
            goals.map((goal, index) => (
              <GoalCard goal={goal} key={index} handleOpenModal={() => handleOpen(goal)} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#777", fontSize: "1.2rem" }}>
              No goals found in this category.
            </p>
          )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

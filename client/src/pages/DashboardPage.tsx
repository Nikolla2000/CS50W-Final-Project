import { Typography, Button, Paper, Chip, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TaskCard from '../components/Tasks/TaskCard';
import { TaskData } from '../components/Tasks/AddTaskForm';
import { fetchTasks } from '../services/taskService';
import { GoalsData } from '../components/Goals/AddGoalForm';
import { fetchGoals } from '../services/goalsService';
import GoalCard from '../components/Goals/GoalCard';
import { useNavigate } from 'react-router';
import { Add, Timer, ChevronRight, TrendingUp, CheckCircle, CalendarToday } from '@mui/icons-material';
import { BlueCenteredButton, LightBlueButton, LightBlueCenteredButton } from '../components/Button/Button';
import { FuturisticTechHeading, GradientHeading, ModernhHeading } from '../components/Headings/Headings';

export default function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskData[] | []>([]);
  const [goals, setGoals] = useState<GoalsData[]>([]);
  const [stats, setStats] = useState({
    completedToday: 0,
    focusSessions: 3,
    streak: 5
  });

  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
    getAllGoals();
    // Simulate fetching stats
    setTimeout(() => setLoading(false), 1000);
  }, [])

  const getTasks = async () => {
    try {
        const data = await fetchTasks();
        setTasks(data.filter((task: TaskData) => task.is_completed == false));
    } catch (err) {
        console.log(err);
    }
  };

  const getAllGoals = async () => {
    try {
      const data = await fetchGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to fetch goals", error);
    }
  };

  const handleOpen = (goal: GoalsData) => {
    return;
  }

  const startFocusSession = () => {
    navigate('/focus-timer');
  }

  return (
    <Box className='dashboard-page-wrapper' p={3} minHeight={"100vh"} sx={{ backgroundColor: '#f5f7fa' }}>
      {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
              <div className="loader"></div>
          </Box>
      ) : (
        <Box className="dashboard-container" maxWidth="xl" mx="auto">
          {/* Header with stats */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            {/* <Typography variant="h4" fontWeight="bold" color="primary">
              FocusFlow Dashboard
            </Typography> */}
            <FuturisticTechHeading page="dashboard">
              Dashboard
            </FuturisticTechHeading>
            {/* <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Timer />}
              onClick={startFocusSession}
              sx={{ borderRadius: '20px', px: 3, py: 1 }}
            >
              Start Focus Session
            </Button> */}
            <BlueCenteredButton>
              <Timer />Start Focus Session
            </BlueCenteredButton>
          </Box>

          {/* Stats Cards */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} mb={4}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: 'white',
              flex: 1,
              minWidth: 0 // prevents overflow
            }}>
              <Box display="flex" alignItems="center">
                <CheckCircle color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Tasks Completed</Typography>
                  <Typography variant="h4" fontWeight="bold">{stats.completedToday}</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: 'white',
              flex: 1,
              minWidth: 0
            }}>
              <Box display="flex" alignItems="center">
                <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Focus Sessions</Typography>
                  <Typography variant="h4" fontWeight="bold">{stats.focusSessions}</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: 3, 
              backgroundColor: 'white',
              flex: 1,
              minWidth: 0
            }}>
              <Box display="flex" alignItems="center">
                <CalendarToday color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Current Streak</Typography>
                  <Typography variant="h4" fontWeight="bold">{stats.streak} days</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Main Content */}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {/* Tasks Column */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0
            }}>
              <Paper elevation={0} sx={{ 
                p: 3, 
                borderRadius: 3, 
                backgroundColor: 'white', 
                height: '100%'
              }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
                    <Chip label="Today" color="primary" size="small" sx={{ mr: 2 }} />
                    Your Tasks
                  </Typography>
                  <Button 
                    endIcon={<ChevronRight />} 
                    onClick={() => navigate('/tasks')}
                    size="small"
                  >
                    See All
                  </Button>
                </Box>

                {tasks.length > 0 ? (
                  <Box>
                    {tasks.slice(0, 4).map((task) => (
                      <TaskCard 
                        task={task} 
                        key={task.id} 
                        onTaskDelete={getTasks} 
                        onClick={() => navigate(`/tasks?task_id=${task.id}`)}
                      />
                    ))}
                    {tasks.length > 4 && (
                      <Box textAlign="center" mt={2}>
                        <Button 
                          variant="text" 
                          endIcon={<ChevronRight />}
                          onClick={() => navigate('/tasks')}
                        >
                          View {tasks.length - 4} more tasks
                        </Button>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      No tasks for today. Enjoy your day!
                    </Typography>
                    <Box onClick={() => navigate("/tasks")}>
                      <LightBlueCenteredButton>
                        <Add/> Add Task
                      </LightBlueCenteredButton>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>

            {/* Goals Column */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0
            }}>
              <Paper elevation={0} sx={{ 
                p: 3, 
                borderRadius: 3, 
                backgroundColor: 'white', 
                height: '100%'
              }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h5" fontWeight="bold">
                    Your Goals
                  </Typography>
                  <Button 
                    endIcon={<ChevronRight />} 
                    onClick={() => navigate('/goals')}
                    size="small"
                  >
                    See All
                  </Button>
                </Box>

                {goals.length > 0 ? (
                  <Box>
                    {goals.slice(0, 3).map((goal, index) => (
                      <GoalCard 
                        goal={goal} 
                        key={index} 
                        handleOpenModal={() => handleOpen(goal)} 
                      />
                    ))}
                    {goals.length > 3 && (
                      <Box textAlign="center" mt={2}>
                        <Button 
                          variant="text" 
                          endIcon={<ChevronRight />}
                          onClick={() => navigate('/goals')}
                        >
                          View {goals.length - 3} more goals
                        </Button>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="text.secondary" mb={2}>
                      No goals yet. Start by setting one!
                    </Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<Add />}
                      onClick={() => navigate('/goals/add')}
                    >
                      Add Goal
                    </Button>
                  </Box>
                )}
              </Paper>

              {/* Quick Focus Section */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                borderRadius: 3, 
                backgroundColor: 'white', 
                mt: 4 
              }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Quick Focus Session
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Jump into a focused work session with your current task
                </Typography>
                <Box display="flex" gap={2}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary"
                    onClick={startFocusSession}
                    sx={{ py: 1.5 }}
                  >
                    25 min
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    color="primary"
                    onClick={startFocusSession}
                    sx={{ py: 1.5 }}
                  >
                    50 min
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
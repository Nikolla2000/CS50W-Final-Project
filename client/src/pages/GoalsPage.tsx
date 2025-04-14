import { useEffect, useState } from "react";
import { GoalsData } from "../components/Goals/AddGoalForm";
import { fetchGoals } from "../services/goalsService";
import GoalCard from "../components/Goals/GoalCard";
import CompleteModal from "../components/Goals/CompleteModal";
import { 
  Box, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Typography,
  Button,
  Skeleton,
  useTheme
} from "@mui/material";
import { Add, FilterAlt } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { FuturisticTechHeading } from "../components/Headings/Headings";
import { useNavigate } from "react-router-dom";

export default function GoalsPage() {
  const theme = useTheme();
  const [goals, setGoals] = useState<GoalsData[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<GoalsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("in-progress");
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalsData | null>(null);
  const navigate = useNavigate();
  
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
    <Box sx={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: { xs: '1rem', md: '2rem' },
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <FuturisticTechHeading page="goals">
          My Goals
        </FuturisticTechHeading>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          width: { xs: '100%', sm: 'auto' },
          flexDirection: { xs: 'column-reverse', sm: 'row' }
        }}>
          <FormControl 
            sx={{
              minWidth: 200,
              borderRadius: "12px",
              background: theme.palette.background.paper,
              boxShadow: theme.shadows[1],
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            size="small"
          >
            <InputLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterAlt fontSize="small" /> Filter
            </InputLabel>
            <Select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
              label="Filter"
            >
              <MenuItem value="all">🌍 All Goals</MenuItem>
              <MenuItem value="in-progress">⚡ In Progress</MenuItem>
              <MenuItem value="completed">✅ Completed</MenuItem>
              <MenuItem value="failed">❌ Overdue</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}20`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 24px 0 ${theme.palette.primary.main}40`
              },
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onClick={() => navigate("/addgoal")}
          >
            New Goal
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3,
          mt: 4
        }}>
          {[...Array(6)].map((_, index) => (
            <Skeleton 
              key={index} 
              variant="rounded" 
              height={180} 
              sx={{ 
                borderRadius: '16px',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100'
              }} 
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' },
          gap: 3,
          mt: 4
        }}>
          <AnimatePresence>
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <GoalCard goal={goal} handleOpenModal={() => handleOpen(goal)} />
                </motion.div>
              ))
            ) : (
              <Box sx={{ 
                gridColumn: '1 / -1',
                textAlign: 'center',
                py: 8
              }}>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 2
                }}>
                  No goals found in this category
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.disabled,
                  maxWidth: '500px',
                  margin: '0 auto'
                }}>
                  {filter === 'completed' 
                    ? "You haven't completed any goals yet. Keep going!" 
                    : filter === 'failed'
                      ? "No overdue goals. Great job staying on track!"
                      : "Create your first goal to get started!"}
                </Typography>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      )}

      <CompleteModal 
        open={open} 
        handleClose={handleClose} 
        goal={selectedGoal} 
        onGoalCompleted={handleGoalCompleted} 
      />
    </Box>
  );
}
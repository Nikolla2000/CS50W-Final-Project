import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Stack, 
  Box,
  useTheme
} from '@mui/material';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  CalendarDays,
  Target,
} from 'lucide-react';
import { GoalsData } from './AddGoalForm';
import { formatDistanceToNow } from 'date-fns';

export default function GoalCard({ goal, handleOpenModal }: { goal: GoalsData; handleOpenModal: () => void }) {
  const theme = useTheme();
  const formattedDeadline = formatDistanceToNow(new Date(goal.deadline), { addSuffix: true });
  const currentDate = new Date();
  const isCompleted = goal.is_completed;
  const isFailed = !isCompleted && new Date(goal.deadline) < currentDate;
  const isInProgress = !isCompleted && !isFailed;

  const statusConfig = {
    text: isCompleted ? 'Completed' : isFailed ? 'Overdue' : 'In Progress',
    icon: isCompleted ? <CheckCircle2 size={16} /> : isFailed ? <AlertCircle size={16} /> : <Clock size={16} />,
    color: isCompleted ? 'success' : isFailed ? 'error' : 'warning',
    bgColor: isCompleted ? 'rgba(46, 125, 50, 0.1)' : isFailed ? 'rgba(211, 47, 47, 0.1)' : 'rgba(237, 108, 2, 0.1)'
  };

  return (
    <Card 
      onClick={handleOpenModal}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 2px 4px -1px rgba(0, 0, 0, 0.03),
          inset 0 -2px 4px 0 rgba(255, 255, 255, 0.5),
          inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)
        `,
        borderRadius: '12px',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            inset 0 -2px 4px 0 rgba(255, 255, 255, 0.5),
            inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)
          `,
          background: 'rgba(255, 255, 255, 0.9)'
        },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          background: isCompleted 
            ? theme.palette.success.main 
            : isFailed 
              ? theme.palette.error.main 
              : theme.palette.warning.main,
          transition: 'all 0.3s ease'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  p: 1.5,
                  background: statusConfig.bgColor,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Target 
                  size={20} 
                  color={
                    isCompleted 
                      ? theme.palette.success.main 
                      : isFailed 
                        ? theme.palette.error.main 
                        : theme.palette.warning.main
                  } 
                />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {goal.description}
              </Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{
              ml: 7,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <CalendarDays size={16} color={theme.palette.text.secondary} />
            <Typography variant="body2" color="text.secondary">
              {new Date(goal.deadline).toLocaleDateString()} • {formattedDeadline}
            </Typography>
          </Box>
          
          <Box 
            sx={{
              ml: 7,
              mt: 1
            }}
          >
            <Chip
              label={statusConfig.text}
              icon={statusConfig.icon}
              color={statusConfig.color}
              size="small"
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                pl: 1,
                pr: 1.5,
                py: 0.5,
                '.MuiChip-icon': { 
                  mr: 0.5,
                  ml: 0 
                },
                background: statusConfig.bgColor,
                border: 'none'
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
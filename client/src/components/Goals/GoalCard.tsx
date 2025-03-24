import { Chip } from '@mui/material';
import { GoalsData } from './AddGoalForm';
import { formatDistanceToNow } from 'date-fns';

export default function GoalCard({ goal, handleOpenModal }: { goal: GoalsData; handleOpenModal: () => void }) {
  const formattedDeadline = formatDistanceToNow(new Date(goal.deadline), { addSuffix: true });

  const currentDate = new Date();

  let status = '';
  if (goal.is_completed) {
    status = 'Completed ✅';
  } else if (new Date(goal.deadline) < currentDate) {
    status = 'Failed ❌';
  } else {
    status = 'In Progress..';
  }

  return (
    <div className="goal-card-wrapper" onClick={handleOpenModal}>
      <h5 className="goal-description">{goal.description}</h5>
      <p className="goal-deadline">Until: {new Date(goal.deadline).toLocaleDateString()}</p>
      <p className="goal-formatted-time">({formattedDeadline})</p>
      <div className="goal-completion-details">
        <Chip 
          label={status} 
          color={status === 'Completed ✅' ? 'success' : status === 'In Progress..' ? 'warning' : 'error'}
          sx={{ width: 'fit-content', margin: '10px 0', fontWeight: 'bold' }} 
        />
      </div>
    </div>
  );
}

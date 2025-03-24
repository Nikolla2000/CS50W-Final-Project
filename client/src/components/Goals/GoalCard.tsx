import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { GoalsData } from './AddGoalForm';
import { formatDistanceToNow } from 'date-fns';

export default function GoalCard({ goal, handleOpenModal }: { goal: GoalsData; handleOpenModal: () => void }) {
  const formattedDeadline = formatDistanceToNow(new Date(goal.deadline), { addSuffix: true });

  return (
    // <Card sx={{ maxWidth: 345, margin: '1rem', borderRadius: '12px', boxShadow: 3}} >
    //   <CardContent>
    //     <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
    //       {goal.description}
    //     </Typography>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    //       <Typography variant="body2" color="text.secondary">
    //         Deadline: {formattedDeadline}
    //       </Typography>
    //       {goal.is_completed ? (
    //         <Chip label="Completed" color="success" sx={{ width: 'fit-content' }} />
    //       ) : (
    //         <Chip label="Pending" color="warning" sx={{ width: 'fit-content' }} />
    //       )}
    //     </Box>
    //   </CardContent>
    // </Card>
    <div className="goal-card-wrapper" onClick={handleOpenModal}>
        <h5>
            {goal.description}
        </h5>
        <p>Until : {new Date(goal.deadline).toLocaleDateString()}</p>
        <p>({formattedDeadline})</p>
        <div className='goal-completion-details'></div>
    </div>
  );
}

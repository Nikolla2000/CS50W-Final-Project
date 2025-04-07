import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GreenButton } from '../Button/Button';
import { useAuth } from '../../providers/AuthProvider';
import { fetchAddNewGoal } from '../../services/goalsService';
import { useNavigate } from 'react-router-dom';

export type GoalsData = {
    id?: string;
    description: string;
    deadline: Date;
    is_completed?: boolean;
}

const schema = z.object({
  description: z.string().min(1, 'Goal description is required'),
  deadline: z.string().min(1, 'Completion date is required').refine((val) => new Date(val) > new Date(), {
    message: 'Please select a future date',
  }),
});

export default function AddGoalForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<GoalsData>({
      resolver: zodResolver(schema),
    });

    const authContext = useAuth() ?? { csrf: null, isAuthenticated: false, setIsAuthenticated: () => {} };
    const { csrf } = authContext;

    const navigate = useNavigate();
  
    const onSubmit: SubmitHandler<GoalsData> = async (data: GoalsData) => {
      try {
        const res = await fetchAddNewGoal(data, csrf);

        if(res) {
            navigate("/goals");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="addgoal-page-wrapper">
      <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom className='addGoalTitle'>
          Add New Goal
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} id="addGoalForm">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="I want to"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
  
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Completion Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
              />
            )}
          />
          <GreenButton type='submit' fullWidth>Add goal</GreenButton>
        </form>
      </Box>
      </div>
    );
  }
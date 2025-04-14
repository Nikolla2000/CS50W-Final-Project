import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../providers/AuthProvider';
import { fetchAddNewGoal } from '../../services/goalsService';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { GreenButton } from '../Button/Button';

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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;


const FormContainer = styled(Box)`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled(Typography)`
  color: #2d3748;
  font-weight: 700;
  margin-bottom: 24px !important;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 8px auto 0;
    border-radius: 2px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #a0aec0;
    }
    
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #667eea;
      border-width: 2px;
    }
  }
  
  & .MuiInputLabel-root.Mui-focused {
    color: #667eea;
  }
`;

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
      <div className="addgoal-page-wrapper" style={{ padding: '20px' }}>
        <FormContainer sx={{ maxWidth: 500, margin: '0 auto' }}>
          <Title variant="h4" component="h1">
            Set Your New Goal
          </Title>
          <form onSubmit={handleSubmit(onSubmit)} id="addGoalForm">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="What do you want to achieve?"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  placeholder="Example: Learn React advanced concepts"
                />
              )}
            />
    
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  label="Target Completion Date"
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
            {/* <SubmitButton type='submit'>Create Goal</SubmitButton> */}
            <GreenButton type="submit" fullWidth>Create Goal</GreenButton>
          </form>
        </FormContainer>
      </div>
    );
  }
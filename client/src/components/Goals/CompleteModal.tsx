import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { GoalsData } from './AddGoalForm';
import { completeGoal } from '../../services/goalsService';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'rgba(255, 255, 255, 0.55)',
  backdropFilter: 'blur(10px)',
  border: 'none',
  borderRadius: "15px",
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
  p: 4,
  textAlign: "center",
  color: "#333",
};

export default function CompleteModal({ open, handleClose, goal }: { 
    open: boolean;
    handleClose: () => void;
    goal: GoalsData | null;
  }) {

  const authContext = useAuth();
  const { csrf } = authContext;

  const navigate = useNavigate();

  const handleCompleteGoal = async () => {
    if (!goal) return;

    try {
      await completeGoal(goal.id, csrf);
      handleClose();
      navigate("/goals");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className='close-icon' onClick={handleClose} style={{ position: "absolute", top: 10, right: 10, cursor: "pointer", color: "#fff" }}>
          <CloseIcon fontSize="large" />
        </div>

        <Typography id="modal-modal-title" variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          🎯 Goal:
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, fontStyle: "italic", opacity: 0.9, fontWeight: "bold" }}>
          {goal?.description}
        </Typography>

        <Typography id="modal-modal-description" sx={{ fontSize: "1.1rem", fontWeight: "500", color: "#333" }}>
          Have you completed this goal?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              px: 5, py: 1.5, fontWeight: "bold", borderRadius: "30px",
              background: "linear-gradient(135deg, #00c853, #64dd17)",
              color: "#fff",
              boxShadow: "0 4px 10px rgba(0, 200, 83, 0.4)",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)", background: "#00e676" }
            }}
            onClick={handleCompleteGoal}
          >
            ✅ Yes
          </Button>

          <Button
            variant="contained"
            sx={{
              px: 5, py: 1.5, fontWeight: "bold", borderRadius: "30px",
              background: "linear-gradient(135deg, #d50000, #ff1744)",
              color: "#fff",
              boxShadow: "0 4px 10px rgba(213, 0, 0, 0.4)",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)", background: "#ff5252" }
            }}
            onClick={handleClose}
          >
            ❌ Not yet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

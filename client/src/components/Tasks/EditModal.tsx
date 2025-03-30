import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Typography, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../providers/AuthProvider";
import { TaskData } from "./AddTaskForm";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "rgba(255, 255, 255, 0.55)",
  backdropFilter: "blur(10px)",
  border: "none",
  borderRadius: "15px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
  p: 4,
  textAlign: "center",
  color: "#333",
};

const schema = z.object({
  description: z.string().min(1, "Task description is required").max(200, "Max 200 characters allowed"),
});

type EditTaskFormValues = {
  description: string;
};

export default function EditModal({ open, handleClose, task, onUpdate }: { 
  open: boolean;
  handleClose: () => void;
  task: TaskData | null;
  onUpdate: (updatedTask: TaskData) => void;
}) {
  const authContext = useAuth();
  const csrf = authContext?.csrf ?? null;

  const { control, handleSubmit, formState: { errors }, reset } = useForm<EditTaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: task?.description || "" },
  });

  useEffect(() => {
    reset({ description: task?.description || "" });
  }, [task, reset]);

  const onSubmit = async (data: EditTaskFormValues) => {
    if (!task?.id) return;

    try {
      const updatedTask = { ...task, description: data.description };
      onUpdate(updatedTask);
      handleClose();
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-task-modal">
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "#333" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <Typography id="edit-task-modal" variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Edit Task
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Edit task description"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ backgroundColor: "white" }}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                px: 4, py: 1.5, fontWeight: "bold",
                borderRadius: "30px", background: "#007bff",
                color: "#fff", "&:hover": { background: "#0056b3" }
              }}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                px: 4, py: 1.5, fontWeight: "bold",
                borderRadius: "30px", color: "#d50000",
                borderColor: "#d50000", "&:hover": { background: "#ffebee" }
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

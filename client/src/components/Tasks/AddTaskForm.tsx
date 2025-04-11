import { TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GreenButton } from "../Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../providers/AuthProvider";
import { fetchAddNewTask } from "../../services/taskService";

export type TaskData = {
    id?: string;
    description: string;
    date?: Date;
    is_completed?: boolean;
}

const schema = z.object({
    description: z.string().min(1, 'This field is required').max(200, 'Task description can\'t be longer than 200 characters')
})

interface AddTaskFormProps {
    onTaskAdd: () => void;
    setIsFirstLoad: (bool: boolean) => void;
    setEntranceAnimation: (value: boolean) => void;
}

export default function AddTaskForm({
    onTaskAdd,
    setIsFirstLoad,
    setEntranceAnimation
}: AddTaskFormProps) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<TaskData>({
        resolver: zodResolver(schema),
        defaultValues: {
            description: "",
        },
    })

    const authContext = useAuth() ?? { csrf: null, isAuthenticated: false, setIsAuthenticated: () => {} };
    const { csrf } = authContext;

    const onSubmit: SubmitHandler<TaskData> = async (data: TaskData) => {
        try {
            await fetchAddNewTask(data, csrf);
            reset();
            onTaskAdd();
            setIsFirstLoad(false);
            setEntranceAnimation(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="add-task-form-wrapper">
            <Typography variant="h4" className="add-task-heading" sx={{ fontSize: "1.7rem", fontWeight: "", marginBottom: "20px" }}>
                ➕ Add a New Task
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Today i need to"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                            },
                            "& .MuiInputBase-input": {
                                backgroundColor: "white",
                            }
                        }}
                        />
                    )}>

                </Controller>
                <GreenButton type='submit' fullWidth>Add Task</GreenButton>
            </form>
        </div>
    )
}
import { TextField } from "@mui/material";
import { Controller, appendErrors, useForm } from "react-hook-form";
import { GreenButton } from "../Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../providers/AuthProvider";

export type TaskData = {
    id: number;
    description: string;
    date: Date;
    is_completed: boolean;
}

const schema = z.object({
    description: z.string().min(1, 'This field is required').max(200, 'Task description can\'t be longer than 200 characters')
})

export default function AddTaskForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const authContext = useAuth();
    const { csrf } = authContext;

    const onSubmit = async (data: TaskData) => {
        try {
            const res = await fetchAddNewTask(data, csrf);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="add-task-form-wrapper">
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="description"
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Today i need to"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        />
                    )}>

                </Controller>
                <GreenButton type='submit' fullWidth>Add Task</GreenButton>
            </form>
        </div>
    )
}
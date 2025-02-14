import { TextField } from "@mui/material";
import { GreenButton } from "../Button/Button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
    username: string
    password: string
}

const schema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6, { message: "Invalid password" }),
})

export default function LoginForm() {
    
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    // rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        sx={{
                            borderRadius: '25px',
                            backgroundColor: '#f0f0f0',
                            '& .MuiOutlinedInput-root': {
                            borderRadius: '25px',
                            },
                        }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        />
                    )}
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    // rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        sx={{
                            borderRadius: '25px',
                            backgroundColor: '#f0f0f0',
                            '& .MuiOutlinedInput-root': {
                            borderRadius: '25px',
                            },
                        }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        />
                    )}
                />
            </div>

            <GreenButton type="submit" fullWidth={true}>Sign in</GreenButton>
        </form>
    )
}
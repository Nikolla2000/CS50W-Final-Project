import { TextField } from "@mui/material";
import { GreenButton } from "../Button/Button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCSRF, getSession, login } from "../../services/authService";
import { useAuth } from "../../providers/AuthProvider";

type FormValues = {
    username: string
    password: string
}

const schema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6),
})

export default function LoginForm() {
    // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // const [csrf, setCsrf] = useState<string | null>(null);
    const { isAuthenticated, setIsAuthenticated, csrf } = useAuth() || {};
    const navigate = useNavigate();

    // useEffect(() => {
    //     getSessionData();
    // }, []);

    // const getSessionData = async () => {
    //     try {
    //         const sessionData = await getSession();
    //         if (sessionData.isAuthenticated) {
    //             setIsAuthenticated(true);
    //             navigate("/");
    //         } else {
    //             setIsAuthenticated(false);
    //             const csrfToken = await getCSRF();
    //             setCsrf(csrfToken);
    //         }
    //     } catch (err) {
    //         console.error("Error getting session:", err);
    //     }
    // }

    
    const { control, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);


    const onSubmit = async (data: FormValues) => {
        try {
            await login(data, csrf || null);
            setIsAuthenticated?.(true);
            navigate("/");
        } catch (err) {
            setError("password", { type: "manual", message: "Invalid username or password" });
        }
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
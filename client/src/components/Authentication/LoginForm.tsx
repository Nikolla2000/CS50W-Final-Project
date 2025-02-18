import { TextField } from "@mui/material";
import { GreenButton } from "../Button/Button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type FormValues = {
    username: string
    password: string
}

const schema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    password: z.string().min(6),
})

export default function LoginForm() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [csrf, setCsrf] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getSession();
        console.log("aa" + csrf);
    }, []);

    const getCSRF = async () => {
        try {
            const res = await fetch("http://localhost:8000/users/csrf/", {
            credentials: "include",
        })
            let csrfToken = res.headers.get("X-CSRFToken");
            setCsrf(csrfToken);
            console.log(csrfToken);
        } catch (err) {
            console.log(err);
        }
    }

    const getSession = async () => {
        try {
            const res = await fetch("http://localhost:8000/users/session/", {
                credentials: "include",
            })
            const data = await res.json();

            if(!res.ok) {
                throw new Error(`${res.status}: ${data.error}`);
            }
            if(data.isAuthenticated) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                getCSRF();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const whoami = async () => {
        try {
            const res = await fetch("/users/whoami", {
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();

            if(!res.ok) {
                throw new Error(`${res.status}: ${data.error}`);
            }

            console.log(`You are logged in as ${data.username}`);
        } catch (err) {
            console.log(err);
        }
    }
    
    const { control, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        console.log(data);

        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };
    
            if (csrf) {
                headers["X-CSRFToken"] = csrf;
            }
            const res = await fetch("http://localhost:8000/users/login/", {
                method: "POST",
                headers: headers,
                credentials: "include",
                body: JSON.stringify(data)
            })
            const respData = await res.json();

            if(!res.ok) {
                setError("password", { type: "manual", message: respData.message });
                throw new Error(`${res.status}: ${respData.error}`);
            }

            setIsAuthenticated(true);
            navigate("/home");
        } catch (err) {
            console.log(err);
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
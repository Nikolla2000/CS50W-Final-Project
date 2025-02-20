import { zodResolver } from "@hookform/resolvers/zod"
import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { GreenButton } from "../Button/Button"
import { countries } from "../../utils/countries"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type FormValues = {
    username: string
    first_name: string
    email: string
    age: number
    country: string
    password: string
    confirm_password: string
}

const schema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(25, { message: "Username can't be longer than 25 characters" })
        .regex(/^[a-zA-Z0-9._]+$/, { message: "Username can only contain letters, numbers, underscores, and dots" }),

    email: z.string()
        .email({ message: "Invalid email address" }),

    age: z.string()
        .regex(/^[1-9][0-9]*$/, { message: "Please enter a valid age." })
        .min(1, { message: "Please enter a valid age." }),

    first_name: z.string()
    .min(2, { message: "First name must be at least 2 characters long"})
    .max(30, { message: "First name can\'t be longer than 30 characters"})
    .regex(/^[a-zA-Z]+$/, { message: "First name must contain only letters" }),

    country: z.string()
    .min(2, { message: "You must choose a country" })
    .max(50, { message: "Country can't be longer than 50 characters" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),

    confirm_password: z.string()
        .min(6, { message: "Confirm Password must be at least 6 characters long" })
});


export default function RegisterFormNew() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [csrf, setCsrf] = useState<string | null>(null);
    const { control, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate();

    useEffect(() => {
        getSession();
    }, [])

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

    const onSubmit = async (data: FormValues) => {
        if (data.password !== data.confirm_password) {
            setError("confirm_password", { type: "manual", message: "Passwords don't match" });
            return;
        }

        try {
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (csrf) {
                headers["X-CSRFToken"] = csrf;
            }

            const res = await fetch("http://localhost:8000/users/register/", {
                method: "POST",
                headers: headers,
                credentials: "include",
                body: JSON.stringify(data)
            })
            const respData = await res.json();

            console.log(respData.errors)
            if(!res.ok) {
                setError("username", { type: "manual", message: respData.username });
                throw new Error(`${res.status}: ${respData.error}`);
            }

            const loginRes = await fetch("http://localhost:8000/users/login/", {
                method: "POST",
                headers: headers,
                credentials: "include",
                body: JSON.stringify({ username: data.username, password: data.password }),
            })

            const loginRespData = await loginRes.json();

            if (!loginRes.ok) {
                setError("password", { type: "manual", message: loginRespData.message || "Login failed" });
                throw new Error(`${loginRes.status}: ${loginRespData.error}`);
            }

            setIsAuthenticated(true);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
        
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Username Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
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

            {/* First Name Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="first_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="First name"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '25px',
                                backgroundColor: '#f0f0f0',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '25px',
                                },
                            }}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                        />
                    )}
                />
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: '25px',
                                backgroundColor: '#f0f0f0',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '25px',
                                },
                            }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />
            </div>

            {/* Age Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="age"
                    control={control}
                    // defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Age"
                            variant="outlined"
                            type="number"
                            fullWidth
                            slotProps={{
                                htmlInput: {
                                    maxLength: 2,
                                    // min: 0,
                                    // max: 99,
                                    // inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                },
                            }}
                            onInput={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (input.value.length > 2) {
                                    input.value = input.value.slice(0,2)
                                }
                            }}
                            sx={{
                                borderRadius: '25px',
                                backgroundColor: '#f0f0f0',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '25px',
                                },
                            }}
                            error={!!errors.age}
                            helperText={errors.age?.message}
                        />
                    )}
                />
            </div>

            {/* Country Select */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <FormControl fullWidth sx={{ borderRadius: '25px', backgroundColor: '#f0f0f0' }} error={!!errors.country}>
                            <InputLabel>Country</InputLabel>
                            <Select
                                {...field}
                                label="Country"
                                fullWidth
                                sx={{
                                    textAlign: 'left',
                                    borderRadius: '25px',
                                }}
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country} value={country}>{country}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.country?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
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

            {/* Confirm Password Input */}
            <div style={{ marginBottom: '16px' }}>
                <Controller
                    name="confirm_password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Confirm Password"
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
                            error={!!errors.confirm_password}
                            helperText={errors.confirm_password?.message}
                        />
                    )}
                />
            </div>

            {/* Submit Button */}
            <GreenButton type="submit" fullWidth={true}>Register</GreenButton>
        </form>
    );
}

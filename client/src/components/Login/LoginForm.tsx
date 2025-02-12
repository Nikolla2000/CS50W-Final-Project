import { TextField } from "@mui/material";
import { GreenButton } from "../Button/Button";

export default function LoginForm() {
    return (
        <form>
            <div style={{ marginBottom: '16px' }}>
                <TextField
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
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <TextField
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
                />
            </div>

            <GreenButton type="submit" fullWidth={true}>Sign in</GreenButton>
        </form>
    )
}
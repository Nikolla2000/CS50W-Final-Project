import { createContext, useContext, useEffect, useState } from "react"
import { getCSRF, getSession } from "../services/authService";
import { Box } from "@mui/material";
import * as authService from "../services/authService";

interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    csrf: string | null,
    logout: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [csrf, setCsrf] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                setIsAuthenticated(!!(session && session.isAuthenticated));
                const csrfToken = await getCSRF();
                setCsrf(csrfToken);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    const logout = async () => {
        try {
            await authService.logout();
            setIsAuthenticated(false);
            return true;
        } catch (err) {
            console.error("Logout failed:", err);
            return false;
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <div className="loader"></div>
            </Box>
        )
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, csrf, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
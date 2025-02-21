import { createContext, useContext, useEffect, useState } from "react"
import { getSession } from "../services/authService";

interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            setIsAuthenticated(session && session.isAuthenticated);
        }
        checkSession();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
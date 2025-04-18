// import { createContext, useContext, useEffect, useState } from "react"
// import { getCSRF, getSession } from "../services/authService";


// interface AuthContextType {
    //     isAuthenticated: boolean,
    //     setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    //     csrf: string | null
    // }
    
    // const AuthContext = createContext<AuthContextType | undefined>(undefined)
    
    // export const useAuth = () => useContext(AuthContext);
    
    // export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
        //     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        //     const [csrf, setCsrf] = useState<string | null>(null);
        
        //     useEffect(() => {
            //         const checkSession = async () => {
//             const session = await getSession();
//             setIsAuthenticated(session && session.isAuthenticated);

//             const csrfToken = await getCSRF();
//             setCsrf(csrfToken);
//         }
//         checkSession();
//     }, [])

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, csrf}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const useAuth = () => useContext(AuthContext);


export function AuthProvider ({ children } : { children: React.ReactNode })  {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuthenticated(true);
        }
    }, [isAuthenticated]);

    return (
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>
        )
}
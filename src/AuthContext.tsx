import React from "react"
import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { User } from "./types/UserType";

interface DecodedToken extends User {
    exp: number; 
    
  }
interface AuthContextType {
    user: User|null;
    loading: boolean;
    loginUser: (token: string) => void;
    logoutUser: () => void;
    updateUser: (newUser: Partial<User>) => void;
  }
  interface AuthProviderProps {
    children: React.ReactNode;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User|null>(null)
    console.log("🚀 ~ AuthProvider ~ user:", user)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token)

                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded)
                } else {
                    localStorage.removeItem('token')
                }

            } catch {
                localStorage.removeItem('token')
            }
        }

        setLoading(false)
    }, [])

    const loginUser = (token:string) => {
        localStorage.setItem('token', token)
        const decoded = jwtDecode<User>(token)
        setUser(decoded)
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const updateUser = (newUser:Partial<User>) => {
        setUser(prevState => {
            if (!prevState) return prevState
            return {
                ...prevState,
                ...newUser
            }
        })
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider.')
    }

    return context
}
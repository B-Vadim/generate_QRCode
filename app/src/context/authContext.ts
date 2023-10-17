import { createContext } from "react";

export type AuthContextType = {
   token: string | null;
   userId: string | null;
   login: (t?: string, i?: string) => void;
   logout: () => void;
   isAuthenticated: boolean;
};

export const AuthContext = createContext({
   token: null,
   userId: null,
   login: () => {},
   logout: () => {},
   isAuthenticated: false
} as AuthContextType);
import { createContext, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({children}){
    //on load chk if token exists
    const [token,setToken] = useState(localStorage.getItem('token'))

    const saveToken = (newToken) =>{
        setToken(newToken);
        localStorage.setItem('token',newToken)
    }
    const logout=() =>{
        setToken(null);
        localStorage.removeItem('token')
    }
    return(
        <AuthContext.Provider value ={{token,saveToken,logout}}>

            {children}
        </AuthContext.Provider>
    )
}
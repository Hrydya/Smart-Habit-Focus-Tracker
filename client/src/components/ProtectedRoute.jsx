import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children})
{
    const {token} = useContext(AuthContext);   //chking if token in local stroge
    if(!token){
        return <Navigate to="/login" />
    }
    return children;
}
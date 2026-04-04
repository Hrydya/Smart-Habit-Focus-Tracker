import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { AuthProvider } from './context/AuthContext.js'

export default function App(){
   return (
    <AuthProvider>
           <Router>
               <Routes>
                   <Route path='/' element={<Login />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/register" element={<Register />} />
                   <Route path="/dashboard" element={<Dashboard />} />
               </Routes>
           </Router>
    </AuthProvider>
      
   )
}